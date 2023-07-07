import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase'
import { declineInvoice, validateInvoice, deleteNotification } from '../../utils/database'
import { useNavigate } from "react-router-dom"
import Dialog from '../../components/Dialog'

function Inbox() {
    const { currentUser} = useAuth()
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        const getNotifications = () => {
            const unsub = onSnapshot(collection(db, `users/${currentUser.uid}/notifications`),
                (snapshot) => {
                    const notifications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setNotifications(notifications)
                })
            return unsub
        }
        currentUser.uid && getNotifications()
    }, [currentUser.uid])

    return (
        <div className="inbox-page">
            {notifications.length > 0 ?
                notifications.map(notification => (
                    <Notification key={notification.id} notification={notification} />
                )) :
                <p className="inbox-empty-message">Your inbox is empty</p>
            }
        </div>
    )
}

function Notification({ notification }) {
    const [validateDialog, setValidateDialog] = useState(false);
    const [declineDialog, setDeclineDialog] = useState(false);
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const date = new Date(notification.timestamp);

    async function handleValidate() {
        await validateInvoice(currentUser.token, notification.content)
        await deleteNotification(currentUser.token, notification.id)
    }

    async function handleDecline() {
        await declineInvoice(currentUser.token, notification.content)
        await deleteNotification(currentUser.token, notification.id)
    }

    async function handleDelete(e) {
        e.stopPropagation();
        await deleteNotification(currentUser.token, notification.id)
    }

    return (
        <>
            {validateDialog && <Dialog title="Validate invoice" body="Are you sure you want to validate this invoice?"
                confirmAction={() => {
                    handleValidate()
                    setValidateDialog(false)
                }}
                cancelAction={() => setValidateDialog(false)} />
            }
            {declineDialog && <Dialog title="Decline invoice" body="Are you sure you want to decline this invoice?"
                confirmAction={() => {
                    handleDecline()
                    setDeclineDialog(false)
                }}
                cancelAction={() => setDeclineDialog(false)} />
            }
            <div className="inbox-notification-component" onClick={() => { navigate(`/invoices/${notification.content}`) }}>
                <div className="inbox-notification-image">
                    <img src={notification.sender.photoURL} />
                </div>
                <div className="inbox-notification-content">
                    <h2 className="inbox-notification-title">{notification.title}</h2>
                    <p className="inbox-notification-message">{notification.message}</p>
                    <div className="inbox-notification-timestamp">
                        <span className="inbox-notification-date">{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</span>
                        <span className="inbox-notification-time">{date.getHours()}:{date.getMinutes()}</span>
                    </div>

                    {notification.type === "invoice" ?
                        <div className="button-box">
                            <button className="inbox-notification-validate-button" onClick={(e) => {
                                e.stopPropagation()
                                setValidateDialog(true)
                            }}>Validate</button>
                            <button className="inbox-notification-decline-button" onClick={(e) => {
                                e.stopPropagation()
                                setDeclineDialog(true)
                            }}>Decline</button>
                        </div> :
                        <button className="inbox-notification-decline-button" onClick={handleDelete}>Delete</button>
                    }
                </div>
            </div>
        </>
    )
}

export default Inbox