import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { auth } from '../../firebase'
import Card from '../../components/Card'
import { declineInvoice, deleteInvoice, validateInvoice } from '../../utils/database'
import { useAuth } from '../../context/AuthContext'
import {useNavigate} from 'react-router-dom'

function Invoice() {
    const {currentUser} = useAuth()
    const { id } = useParams()
    const [invoice, setInvoice] = useState()
    const [date, setDate] = useState()
    const navigate = useNavigate()

    useEffect( () => {
        const getInvoice = async() => {
            const idToken = await auth.currentUser.getIdToken()
            fetch("http://localhost:5000/coinmo-8a9cd/us-central1/app/coinmo/invoice/" + id, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${idToken}`
                }
            })
            .then((response) => response.json())
            .then(data => {
                setInvoice(data)
                const date = new Date(data.timestamp)
                setDate(date)
            })

        }

        id && getInvoice()
    }, [id])


async function handleValidate (e) {
    e.preventDefault()
    await validateInvoice(currentUser.token, invoice.id);
}

async function handleDecline (e) {
    e.preventDefault()
    await declineInvoice(currentUser.token, invoice.id);
}

function handleDelete(e){
    e.preventDefault();
    deleteInvoice(currentUser.token, id).then(() => navigate('/invoices')) 
}

  return (
    <div className="invoice-page">
        {invoice && date && 
        <Card width="45rem" height="100%">
            <div className='invoice-header'>
                <div className='invoice-user-data'>
                    <h1>From:</h1>
                    <div className="invoice-user-image">
                        <img src={invoice.vendor.photoURL} alt="vendor logo"/>
                    </div>
                    <div>   
                        <h2>{invoice.vendor.name}</h2>
                        <p>{invoice.vendor.address.street}, {invoice.vendor.address.apartment}</p>
                        <p>{invoice.vendor.address.city}, {invoice.vendor.address.postalCode}</p>
                        <p>{invoice.vendor.address.country}</p>
                        <p>{invoice.vendor.contact.email}</p>
                        <p>{invoice.vendor.contact.phoneNumber}</p>
                    </div>
                </div>
                <div className='invoice-user-data'>
                    <h1 >To:</h1>
                    <div className="invoice-user-image">
                        <img src={invoice.customer.photoURL} alt="vendor logo"/>
                    </div>
                    <div>
                        <h2>{invoice.customer.name}</h2>
                        <p>{invoice.customer.address.street}, {invoice.customer.address.apartment}</p>
                        <p>{invoice.customer.address.city}, {invoice.customer.address.postalCode}</p>
                        <p>{invoice.customer.address.country}</p>
                        <p>{invoice.customer.contact.email}</p>
                        <p>{invoice.customer.contact.phoneNumber}</p>
                    </div>
                </div>
            </div>

            <div className='invoice-separator'></div>
            <div className='invoice-details'>
                <div>
                    <h1>Invoice Date:</h1>
                    <p>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()} {date.getHours()}:{date.getMinutes()}</p>
                </div>
                <div>
                    <h1>Invoice Number:</h1>
                    <p>{invoice.invoiceId}</p>
                </div>
                <div>
                    <h1>Payment Method:</h1>
                    <p>{invoice.paymentMethod}</p>
                </div>
            </div>
            
            <div className='invoice-concept'>
                <table>
                    <colgroup>
                        <col style={{width: "20%"}}/>
                        <col style={{width: "20%"}}/>
                        <col style={{width: "20%"}}/>
                        <col style={{width: "20%"}}/>
                        <col style={{width: "20%"}}/>
                    </colgroup>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Amount</th>
                            <th>Unitary Price</th>
                            <th>Sale</th>
                            <th>Final Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(invoice.concept).map(([key, value]) => (
                            <tr key={key}>
                                <td>{key}</td>
                                <td>{value.amount}</td>
                                <td>{value.price}</td>
                                <td>{value.sale}</td>
                                <td>{value.amount * value.price * (1 - value.sale / 100)}</td>
                            </tr>
                        ))}    
                    </tbody>
                </table>
            </div>
            <div className='invoice-total-rows'>
                <table>
                    <colgroup>
                            <col style={{width: "20%"}}/>
                            <col style={{width: "20%"}}/>
                            <col style={{width: "20%"}}/>
                            <col style={{width: "20%"}}/>
                            <col style={{width: "20%"}}/>
                    </colgroup>
                    <tbody>
                        <tr>
                            <td colSpan="3"></td>
                            <th>Subtotal</th>
                            <td>{invoice.taxBase.toFixed(2)}€</td>
                        </tr>
                        <tr>
                            <td colSpan="3"></td>
                            <th>Tax(%)</th>
                            <td>{invoice.taxRate}%</td>
                        </tr>
                        <tr>
                            <td colSpan="3"></td>
                            <th>Total</th>
                            <td>{invoice.total.toFixed(2)}€</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='invoice-button-box'>
                {invoice.state === "pending" && currentUser.uid === invoice.customer.id ?
                <>
                    <button className='invoice-button button-primary' onClick={handleDelete}>Validate</button>
                    <button className='invoice-button button-secondary' onClick={handleDelete}>Decline</button>
                </> : 
                <>
                    <button className='invoice-button button-primary' onClick={() => navigate("/invoices")}>Go Back</button>
                    <button className='invoice-button button-secondary' onClick={handleDelete}>Delete</button>
                </>}
            </div>
            
        </Card>
        }
    </div>
  )
}

export default Invoice