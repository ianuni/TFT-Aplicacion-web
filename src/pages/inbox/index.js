import React, {useState, useEffect} from 'react'
import { useAuth } from '../../context/AuthContext'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase'
import { declineInvoice, validateInvoice, deleteNotification } from '../../utils/database'

function Inbox() {
    const {currentUser} = useAuth()
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        const getNotifications = () => {
          const unsub = onSnapshot(collection(db, `users/${currentUser.uid}/notifications`), 
            (snapshot) =>{
              const notifications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
              setNotifications(notifications)
            })
          return unsub
        }
        currentUser.uid && getNotifications()
      }, [currentUser.uid])
    
    return (
        <div className="inbox-page">
            {notifications.map(notification => (
                <InvoiceNotification key={notification.id} notification={notification}/>
            ))}

        </div>
  )
}

function InvoiceNotification({notification}){
    const {currentUser} = useAuth()
    const date = new Date(notification.timestamp)

    const validate = async (invoiceId, notificationId) => {
        await validateInvoice(currentUser.token, invoiceId)
        await deleteNotification(currentUser.token, notificationId)
    }

    const decline = async (invoiceId, notificationId) => {
        await declineInvoice(currentUser.token, invoiceId)
        await deleteNotification(currentUser.token, notificationId)
    }

    const deleteFromInbox = async (notificationId) => {
        await deleteNotification(currentUser.token, notificationId)
    }
    return(
        <div className="inbox-notification-notification">
            <img src={notification.sender.photoURL} alt="sender image"/> 
            <div className="inbox-notification-content">
                <h2 className="inbox-notification-title">{notification.title}</h2>
                <p className="inbox-notification-message">{notification.message}</p>
                <div className="inbox-notification-timestamp">
                    <span className="inbox-notification-date">{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</span>
                    <span className="inbox-notification-time">{date.getHours()}:{date.getMinutes()}</span>
            </div>

                {notification.type === "invoice" ?
                <div className="inbox-notification-button-box">
                    <button className="inbox-notification-validate-button" onClick={() => validate(notification.content, notification.id)}>Validate</button>
                    <button className="inbox-notification-decline-button" onClick={() => decline(notification.content, notification.id)}>Decline</button> 
                </div> :
                    <button className="inbox-notification-decline-button" onClick={() => deleteFromInbox(notification.id)}>Delete</button>
                }

            </div>
        </div>
    )
}

export default Inbox