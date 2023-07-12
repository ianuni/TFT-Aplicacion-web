import React, { useState } from 'react'
import Card from '../../components/Card'
import Form, { FormStep, LongTextInput, ProductsInput, SelectInput, SubmitButton, UserInput } from '../../components/Form'
import { useForm } from '../../hooks/useForm'
import { addInvoice } from '../../utils/database'
import { useAuth } from '../../context/AuthContext'
import { taxRates } from '../../utils/data'
import Dialog from '../../components/Dialog'
import { initialAddInvoiceForm } from '../../utils/initialForms'
import { useNavigate } from "react-router-dom"

function AddInvoice() {
    const [dialog, setDialog] = useState(false)
    const [error, setError] = useState(null)
    const { currentUser } = useAuth()
    const navigate = useNavigate()
    const { errors, handleChange, handleBlur, handleSubmit, updateForm } = useForm(initialAddInvoiceForm, actionOnSubmit)

    async function actionOnSubmit(form) {
        const response = await addInvoice(currentUser.token, { ...form, taxRate: taxRates[form.taxRate] })
        if (response.status === 'success') navigate("/")
        else setError(response.message)
    }

    return (
        <>
            {dialog && <Dialog title="Generate Invoice" body="Are you sure you want to generate the invoice?"
                confirmAction={(e) => {
                    handleSubmit(e)
                    setDialog(false)
                }}
                cancelAction={() => setDialog(false)} />}
            <div className='add-invoice-component'>
                <Card width="30rem" height="35rem">
                    <div className="add-invoice-card-content">
                        <h1>Create New Invoice</h1>
                        <div className='add-invoice-form'>
                            <Form onSubmit={(e) => { e.preventDefault(); setDialog(true) }} errorMessage={error}>
                                <FormStep>
                                    <UserInput placeholder="Search customer" label="Customer" name="customer" onChange={updateForm} error={errors.customer} />
                                    <LongTextInput placeholder="Insert invoice observations" label="Observations" name="observations" onBlur={handleBlur} onChange={handleChange} error={errors.observations} />
                                </FormStep >
                                <FormStep>
                                    <ProductsInput onChange={updateForm} error={errors.concept} />
                                </FormStep>
                                <FormStep>
                                    <SelectInput name="paymentMethod" label="Payment Method" items={["Credit Card", "Debit Card", "Transfer", "Cash", "Check"]} onBlur={handleBlur} onChange={handleChange} error={errors.paymentMethod} />
                                    <SelectInput name="taxRate" label="Tax Rate" items={Object.keys(taxRates)} onBlur={handleBlur} onChange={handleChange} error={errors.taxRate} />
                                    <SubmitButton>Create Invoice</SubmitButton>
                                </FormStep>
                            </Form>
                        </div>
                    </div>

                </Card>
            </div>
        </>
    )
}

export default AddInvoice