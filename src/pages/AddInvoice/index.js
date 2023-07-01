import React from 'react'
import Card from '../../components/Card'
import Form, { FormStep, LongTextInput, NumberInput, ProductsInput, SelectInput, SubmitButton, UserInput } from '../../components/Form'
import { useForm } from '../../hooks/useForm'
import { addInvoice } from '../../utils/database'
import { useAuth } from '../../context/AuthContext'
import { auth } from '../../firebase'
import { taxRates } from '../../utils/data'

const initialForm = {
    customer: "",
    observations: "",
    concept: "",
    taxRate: "",
    paymentMethod: ""
  };



function AddInvoice() {
    

    const actionOnSubmit = async (form) =>{
        await addInvoice(currentUser.token, {...form, taxRate: taxRates[form.taxRate]})
    }
    const {errors, handleChange, handleBlur, handleSubmit , updateForm} = useForm(initialForm, actionOnSubmit)
    const {currentUser} = useAuth()

    
    
    return (
        <div className='add-invoice-component'>
            <Card width="30rem" height="35rem">
                <div className="add-invoice-card-content">
                <h1>Create New Invoice</h1>
                <div className='add-invoice-form'>
                <Form onSubmit={handleSubmit}>
                    <FormStep>
                        <UserInput label="Customer" name="customer" onChange={updateForm} error={errors.customer}/>
                        <LongTextInput label="Observations" name="observations" onChange={handleChange}/>
                    </FormStep >
                    <FormStep>
                        <ProductsInput onChange={updateForm}/>
                    </FormStep>
                    <FormStep>
                        <SelectInput name="paymentMethod" label="Payment Method" items={["Credit Card", "Debit Card", "Transfer", "Cash", "Check"]} onChange={handleChange}/>
                        <SelectInput name="taxRate" label="Tax Rate" items={Object.keys(taxRates)} onChange={handleChange}/>
                        <SubmitButton>Create Invoice</SubmitButton>
                    </FormStep>
                </Form>
                </div>
                </div>
                
            </Card>
        </div>
    )
}

export default AddInvoice