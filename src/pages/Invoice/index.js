import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { auth } from '../../firebase'
import Card from '../../components/Card'
import { deleteInvoice } from '../../utils/database'

function Invoice() {
    const { id } = useParams()
    const [invoice, setInvoice] = useState()
    const [date, setDate] = useState()
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

function handleDelete(e){
    e.preventDefault();
    deleteInvoice(id); 
}

  return (
    <div className="invoice-component">
        {invoice && date && 
        <Card width="40rem" height="55rem">
            <div className='invoice-header'>
            <div className='invoice-vendor-data'>
                <img src={invoice.vendor.photoURL} alt="vendor logo"/>
                <div>
                    <h1>{invoice.vendor.name}</h1>
                    <p>{invoice.vendor.address.street}, {invoice.vendor.address.apartment}</p>
                    <p>{invoice.vendor.address.city}, {invoice.vendor.address.postalCode}</p>
                    <p>{invoice.vendor.address.country}</p>
                </div>
            </div>
            <div className='invoice-details'>
                <h1>Invoice Date:</h1>
                <p>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()} {date.getHours()}:{date.getMinutes()}</p>
                <h1>Invoice Number:</h1>
                <p>{invoice.invoiceId}</p>
                <h1>Payment Method:</h1>
                <p>{invoice.paymentMethod}</p>
            </div>
            </div>

            <div className='invoice-separator'></div>
            <div className='invoice-customer-data'>
                <div>
                    <h1>Invoice to:</h1>
                    <h1>{invoice.customer.name}</h1>
                    <p>{invoice.customer.address.street}, {invoice.customer.address.apartment}</p>
                    <p>{invoice.customer.address.city}, {invoice.customer.address.postalCode}</p>
                    <p>{invoice.customer.address.country}</p>
                </div>
            </div>
            <div className='invoice-concept'>
                <table>
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
            <div className='invoice-total'>
                <table>
                    <tbody>
                        <tr>
                            <th>Subtotal</th>
                            <td>{invoice.taxBase}</td>
                        </tr>
                        <tr>
                            <th>Tax(%)</th>
                            <td>{invoice.taxRate}</td>
                        </tr>
                        <tr>
                            <th>Total</th>
                            <td>{invoice.total.toFixed(2)}€</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button className='invoice-delete-button' onClick={handleDelete}>Eliminar</button>
        </Card>
        }
    </div>
  )
}

export default Invoice