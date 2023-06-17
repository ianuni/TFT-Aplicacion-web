import React from 'react'
import SearchBar from '../../components/SearchBar'
import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom'


function Invoices() {
  const navigate = useNavigate();

  return (
    <>
      <div className='invoices-searchbar'>
        <SearchBar text="Search Invoice"/>
        <Button onClick={() => {navigate("/invoices/add")}}>Add</Button>
      </div>
      
    
      <InvoiceList>
        <Invoice/>
        <Invoice/>
        <Invoice/>
        <Invoice/>
        <Invoice/>
        <Invoice/>
        <Invoice/>
        <Invoice/>
        <Invoice/>
        <Invoice/>
        <Invoice/>
        <Invoice/>
        <Invoice/>
        <Invoice/>
        <Invoice/>
      </InvoiceList>
    
    </>

  )
}

const InvoiceList = ({children}) => {
  return (
    <div className="invoice-grid">
        {children}
    </div>
  )
}

const Invoice = ({companyName, companyCategory, date, total}) => {
    return (
        <div className="invoice">
            <h1>{companyName}</h1>
            <span>{companyCategory}</span>
            <div className="invoice-date-information">
                
                <span>00/00/0000</span>
                <span>00:00</span>
            </div>
            <hr className="invoice-separator"/>
            <div className="invoice-price">
                <h2>Total:</h2>
                <span>{total}</span>
            </div>
        </div>
    );
}

export default Invoices