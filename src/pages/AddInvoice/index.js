import React from 'react'
import Card from '../../components/Card'
import Form, { FormStep, LongTextInput, NumberInput, ProductsInput, SelectInput, SubmitButton, UserInput } from '../../components/Form'
import { useForm } from '../../hooks/useForm'
import { auth } from '../../firebase'
const initialForm = {
    customer: "",
    observations: "",
    concept: "",
    taxRate: "",
    paymentMethod: ""
  };

function AddInvoice() {
    const actionOnSubmit = async (form) =>{
        const currentUser = auth.currentUser
        const idToken =  await currentUser.getIdToken()
        const request = {
            ...form,
            token: idToken,
            vendor: currentUser.uid
        }
        console.log(request)
        fetch("http://localhost:5000/coinmo-8a9cd/us-central1/app/coinmo/invoice/add", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
          })
          .then(response => response.json())
          .then(data => {
            console.log('Respuesta:', data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
    }
    const {errors, handleChange, handleBlur, handleSubmit , updateForm} = useForm(initialForm, actionOnSubmit)

  return (
    <div className='add-invoice-component'>
        <Card width={30} height={35}>
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
                    <NumberInput name="taxRate" label="Tax Rate" onChange={handleChange}/>
                    <SubmitButton>Create Invoice</SubmitButton>
                </FormStep>
            </Form>
            </div>
        </Card>
    </div>
  )
}

export default AddInvoice