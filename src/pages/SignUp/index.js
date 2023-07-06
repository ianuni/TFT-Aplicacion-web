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
          <Card width="25rem" height="35.25rem">
            <TabMenu>
              <Tab name="Sign Up" path="/signup" />
              <Tab name="Sign In" path="/signin" />
            </TabMenu>
            <div className='auth-card-content'>
              <div className='auth-form'>
                <Form onSubmit={(e) => { e.preventDefault(); setDialog(true) }} errorMessage={error}>
                  <FormStep name="Info">
                    <TextInput label="Nombre" name="name" onChange={handleChange} onBlur={handleBlur} error={errors.name} />
                    <TextInput label="NIF" name="nif" onChange={handleChange} onBlur={handleBlur} error={errors.nif} />
                    <NumberInput label="Phone Number" name="phoneNumber" onChange={handleChange} onBlur={handleBlur} error={errors.phoneNumber} />
                    <SelectInput label="Category" name="category" items={categories} onChange={handleChange} onBlur={handleBlur} error={errors.category} />
                    <ImageInput label="Photo" name="image" onChange={handleChange} onBlur={handleBlur} error={errors.image} />
                    <LongTextInput label="Description" name="description" onChange={handleChange} onBlur={handleBlur} error={errors.description} />
                  </FormStep>
                  <FormStep name="Info">
                    <TextInput label="Address" name="address" onChange={handleChange} onBlur={handleBlur} error={errors.address} />
                    <TextInput label="Apartment" name="apartment" onChange={handleChange} onBlur={handleBlur} error={errors.apartment} />
                    <TextInput label="City" name="city" onChange={handleChange} onBlur={handleBlur} error={errors.city} />
                    <TextInput label="Postal Code" name="postalCode" onChange={handleChange} onBlur={handleBlur} error={errors.postalCode} />
                    <TextInput label="Country" name="country" onChange={handleChange} onBlur={handleBlur} error={errors.country} />
                  </FormStep>
                  <FormStep>
                    <TextInput label="Email" name="email" onChange={handleChange} onBlur={handleBlur} error={errors.email} />
                    <PasswordInput label="Password" name="password" onChange={handleChange} onBlur={handleBlur} error={errors.password} />
                    <PasswordInput label="Confirmation" name="confirmationPassword" onChange={handleChange} onBlur={handleBlur} error={errors.confirmationPassword} />
                    <SubmitButton>Sign Up</SubmitButton>
                  </FormStep>
                </Form>
              </div>
            </div>

          </Card>
        </div>
      </Container>
    </>
  )
}

export default SignUp