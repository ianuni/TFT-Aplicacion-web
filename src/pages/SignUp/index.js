import React from 'react'
import Container from '../../components/Container'
import {ReactComponent as Logo} from "../../assets/coinmo.svg"
import Card from '../../components/Card'
import Form, { SelectInput, TextInput, LongTextInput, ImageInput, PasswordInput, FormStep, SubmitButton } from '../../components/Form'
import TabMenu, { Tab } from '../../components/TabMenu'
import { signUp } from '../../utils/database'
import { useForm } from '../../hooks/useForm'

const initialForm = {
  name: "",
  nif: "",
  phoneNumber: "",
  category: "",
  description: "",
  email: "",
  password: "",
  confirmationPassword: "",
  address: "",
  apartment: "",
  city: "",
  postalCode: "",
  country: "",
  image: ""
};

function SignUp() {
  const actionOnSubmit = (form) => {
    signUp(form);
  }
  const {errors, handleChange, handleBlur, handleSubmit} = useForm(initialForm, actionOnSubmit)

  return (
    <Container>
      <div className='auth-component'>
        <div className='auth-title'>
          <Logo/>
          <h1>Coinmo</h1>
        </div>
        
        <Card width={25} height={35.25}>
          <TabMenu>
            <Tab name="Sign Up" path="/signup"/>
            <Tab name="Sign In" path="/signin"/>
          </TabMenu>
          <div className='auth-form'>
          <Form onSubmit={(handleSubmit)}>
            <FormStep name="Info">
              <TextInput label="Nombre" name="name" onChange={handleChange} onBlur={handleBlur} error={errors.name}/>
              <TextInput label="NIF" name="nif" onChange={handleChange} onBlur={handleBlur} error={errors.nif}/>
              <TextInput label="Phone Number" name="phoneNumber" onChange={handleChange} onBlur={handleBlur} error={errors.phoneNumber}/>
              <SelectInput label="Category" name="category" items={["commerce", "individual"]} onChange={handleChange} onBlur={handleBlur} error={errors.category}/>
              <ImageInput label="Photo" name="image" onChange={handleChange} onBlur={handleBlur} error={errors.image}/>
              <LongTextInput label="Description" name="description" onChange={handleChange} onBlur={handleBlur} error={errors.description}/>
            </FormStep>
            <FormStep name="Info">
              <TextInput label="Address" name="address" onChange={handleChange} onBlur={handleBlur} error={errors.address}/>
              <TextInput label="Apartment" name="apartment" onChange={handleChange} onBlur={handleBlur} error={errors.apartment}/>
              <TextInput label="City" name="city" onChange={handleChange} onBlur={handleBlur} error={errors.city}/>
              <TextInput label="Postal Code" name="postalCode" onChange={handleChange} onBlur={handleBlur} error={errors.postalCode}/>
              <TextInput label="Country" name="country" onChange={handleChange} onBlur={handleBlur} error={errors.country}/>
            </FormStep>
            <FormStep>
              <TextInput label="Email" name="email" onChange={handleChange} onBlur={handleBlur} error={errors.email}/>
              <PasswordInput label="Password" name="password" onChange={handleChange} onBlur={handleBlur} error={errors.password}/>
              <PasswordInput label="Confirmation" name="confirmationPassword" onChange={handleChange} onBlur={handleBlur} error={errors.confirmationPassword}/>
              <SubmitButton>Sign Up</SubmitButton>
            </FormStep>
          </Form>
          </div>
        </Card>
      </div>
    </Container>
  )
}

export default SignUp