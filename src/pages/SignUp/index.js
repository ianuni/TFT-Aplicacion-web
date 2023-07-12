import React, { useState } from 'react'
import Container from '../../components/Container'
import { ReactComponent as Logo } from "../../assets/coinmo.svg"
import Card from '../../components/Card'
import Form, { SelectInput, TextInput, LongTextInput, ImageInput, PasswordInput, FormStep, SubmitButton, NumberInput } from '../../components/Form'
import TabMenu, { Tab } from '../../components/TabMenu'
import { signUp } from '../../utils/database'
import { useForm } from '../../hooks/useForm'
import { useNavigate } from 'react-router-dom'
import { categories } from '../../utils/data'
import Dialog from '../../components/Dialog'
import { initialSignUpForm } from '../../utils/initialForms'

function SignUp() {
  const [dialog, setDialog] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate();
  const { errors, handleChange, handleBlur, handleSubmit } = useForm(initialSignUpForm, actionOnSubmit)

  async function actionOnSubmit(form) {
    const response = await signUp(form);
    if (response.status === 'success') navigate("/")
    else setError(response.message)
  }

  return (
    <>
      {dialog && <Dialog title="Create user account" body="Are you sure you want to generate a new user account?"
        confirmAction={(e) => {
          handleSubmit(e)
          setDialog(false)
        }}
        cancelAction={() => setDialog(false)} />
      }
      <Container>
        <div className='auth-component'>
          <div className='auth-title'>
            <Logo />
            <h1>Coinmo</h1>
          </div>
          <div className='auth-card-content'>
            <Card width="25rem" height="35.25rem">
              <TabMenu>
                <Tab name="Sign Up" path="/signup" />
                <Tab name="Sign In" path="/signin" />
              </TabMenu>
              <div className='auth-form'>
                <Form onSubmit={(e) => { e.preventDefault(); setDialog(true) }} errorMessage={error}>
                  <FormStep name="Info">
                    <TextInput placeholder="Insert your name" label="Nombre" name="name" onChange={handleChange} onBlur={handleBlur} error={errors.name} />
                    <TextInput placeholder="Insert your NIF" label="NIF" name="nif" onChange={handleChange} onBlur={handleBlur} error={errors.nif} />
                    <NumberInput placeholder="Insert your phone Number" label="Phone Number" name="phoneNumber" onChange={handleChange} onBlur={handleBlur} error={errors.phoneNumber} />
                    <SelectInput placeholder="Insert your category" label="Category" name="category" items={categories} onChange={handleChange} onBlur={handleBlur} error={errors.category} />
                    <ImageInput label="Photo" name="image" onChange={handleChange} onBlur={handleBlur} error={errors.image} />
                    <LongTextInput placeholder="Insert description" label="Description" name="description" onChange={handleChange} onBlur={handleBlur} error={errors.description} />
                  </FormStep>
                  <FormStep name="Info">
                    <TextInput placeholder="Insert your street" label="Street" name="address" onChange={handleChange} onBlur={handleBlur} error={errors.address} />
                    <TextInput placeholder="Insert your apartment" label="Apartment" name="apartment" onChange={handleChange} onBlur={handleBlur} error={errors.apartment} />
                    <TextInput placeholder="Insert your city" label="City" name="city" onChange={handleChange} onBlur={handleBlur} error={errors.city} />
                    <TextInput placeholder="Insert your postal code" label="Postal Code" name="postalCode" onChange={handleChange} onBlur={handleBlur} error={errors.postalCode} />
                    <TextInput placeholder="Insert your country" label="Country" name="country" onChange={handleChange} onBlur={handleBlur} error={errors.country} />
                  </FormStep>
                  <FormStep>
                    <TextInput placeholder="Insert your email" label="Email" name="email" onChange={handleChange} onBlur={handleBlur} error={errors.email} />
                    <PasswordInput placeholder="Insert your password" label="Password" name="password" onChange={handleChange} onBlur={handleBlur} error={errors.password} />
                    <PasswordInput placeholder="Repeat password" label="Confirmation" name="confirmationPassword" onChange={handleChange} onBlur={handleBlur} error={errors.confirmationPassword} />
                    <SubmitButton>Sign Up</SubmitButton>
                  </FormStep>
                </Form>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </>
  )
}

export default SignUp