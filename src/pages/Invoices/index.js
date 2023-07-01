import React, { useEffect, useRef, useState } from 'react'
import SearchBar from '../../components/SearchBar'
import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom'
import {useAuth} from "../../context/AuthContext"
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase'
import SortButton from '../../components/SortButton'
import { sortHigherTotal, sortLowestTotal, sortNewest, sortOldest } from '../../utils/sorting'

const sortingSelector = (sorting) => {
  switch(sorting){
    case "oldest":
      return sortOldest
    case "newest":
      return sortNewest
    case "higher":
      return sortHigherTotal
    case "lowest":
      return sortLowestTotal
    default:
      return sortNewest
  }
  
}

function InvoicePage() {
  const navigate = useNavigate();
  const {currentUser} = useAuth()
  const [query, setQuery] = useState("")
  const [sorting, setSorting] = useState()
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const getInvoices = () => {
      const unsub = onSnapshot(collection(db, `users/${currentUser.uid}/invoices`), 
        (snapshot) =>{
          const invoices = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setInvoices(invoices)
        })
      return unsub
    }
    currentUser.uid && getInvoices()
  }, [currentUser.uid])

  return (
    <>
      <div className='invoices-searchbar'>
        <SearchBar text="Search Invoice" onChange={(e) => setQuery(e.target.value)}/>
        <SortButton action={(newSorting) => setSorting(newSorting)}/>
        <Button onClick={() => {navigate("add")}}>Add</Button>
      </div>
      
      <Invoices type="sales">
        { invoices
          // Filter invoices where user is vendor
          .filter(invoice => invoice.vendor.name === currentUser.displayName)
          // Sort invoices by user selection
          .sort(sortingSelector(sorting))
          // Search invoices by name
          .filter( invoice=> invoice.customer.name.toLowerCase().includes(query.toLowerCase()))
          .map((invoice, index) => (
            <Invoice key={index} invoice={invoice}/>
          ))} 
      </Invoices> 
      
      <Invoices type="expenses">
        {invoices
          // Filter invoices where user is customer
          .filter(invoice => invoice.customer.name === currentUser.displayName)
          // Sort by user selection
          .sort(sortingSelector(sorting))
          // Search invoices by name
          .filter( invoice=> invoice.vendor.name.toLowerCase().includes(query.toLowerCase()))
          .map((invoice, index) => (
            <Invoice key={index} invoice={invoice}/>
          ))
        } 
      </Invoices> 
    </>

  )
}

function Invoices({children, type}){
  return (
    <div className='invoices-list-component'>
      <div className="invoices-list-title">
        {type === "sales" ?
          <>
          <h1 style={{color: "var(--color-primary)"}}>{type}</h1>
          <div className="invoices-list-separator" style={{backgroundColor: "var(--color-primary)"}}></div>
          </> : null
        }
        {type === "expenses" ?
          <>
          <h1 style={{color: "var(--color-complementary)"}}>{type}</h1>
          <div className="invoices-list-separator" style={{backgroundColor: "var(--color-complementary)"}}></div>
          </> : null
        }
      </div>
      <div className="invoices-grid">
        {children.length > 0 ? 
          children :
          <p className="invoices-empty-message">Empty</p>}
      </div>
    </div>
  )
}

function Invoice({invoice}){
    const navigate = useNavigate();
    const {currentUser} = useAuth();
    const date = new Date(invoice.timestamp)

    return (
        <div className="invoice" onClick={() => {navigate(`${invoice.id}`)}}>
          {currentUser.displayName === invoice.vendor.name ?
              <>
                <h1>{invoice.customer.name}</h1>
                <span>{invoice.customer.category}</span> 
              </> :
              <>
                <h1>{invoice.vendor.name}</h1>
                <span>{invoice.vendor.category}</span>
              </>
          }
          <div className="invoice-date-information">
              <span>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</span>
              <span>{date.getHours()}:{date.getMinutes()}</span>
          </div>
          <div className="invoice-description">
            <p>{invoice.observations}</p>
          </div>
          <p className={"invoice-state-" + invoice.state}>{invoice.state}</p>
          <hr className="invoice-separator"/>
          <div className="invoice-price">
              <h2>Total:</h2>
              {currentUser.displayName === invoice.vendor.name ?
                <span style={{color: "var(--color-primary)"}}>+{invoice.total.toFixed(2)}€</span> :
                <span style={{color: "var(--color-complementary)"}}>-{invoice.total.toFixed(2)}€</span>
              }
          </div>
        </div>
        
    );
}

export default InvoicePage