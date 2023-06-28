import React, { useState } from 'react'
import Container from '../../components/Container'
import {ReactComponent as Logo} from "../../assets/coinmo.svg"
import Card from '../../components/Card'
import Form, {TextInput, PasswordInput, FormStep, SubmitButton } from '../../components/Form'
import TabMenu, { Tab } from '../../components/TabMenu'
import { useForm } from '../../hooks/useForm'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'

const initialForm = {
  email: "",
  password: ""
}

function SignIn() {
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  const actionOnSubmit = async (form) => {
    let error = false;
    try{
      await signInWithEmailAndPassword(auth, form.email, form.password);
    }
    catch (err){
      if (err.code === 'auth/user-not-found') {
        setError('Email not found');
      } else if (err.code === 'auth/wrong-password') {
        setError('Invalid email or password.');
      } else {
        setError('Error occured');
      }
      error = true;
    } 
    if(!error) navigate("/"); 
  }

  const {errors, handleChange, handleBlur, handleSubmit} = useForm(initialForm, actionOnSubmit)

  return (
    <Container>
      <div className='auth-component'>
        <div className='auth-title'>
          <Logo/>
          <h1>Coinmo</h1>
        </div>
        <Card width="25rem" height="35.25rem">
          <TabMenu>
            <Tab name="Sign Up" path="/signup"/>
            <Tab name="Sign In" path="/signin"/>
          </TabMenu>
          <div className='auth-form'>
          <Form onSubmit={(handleSubmit)} errorMessage={error}>
            <FormStep>
              <TextInput label="Email" name="email" onChange={handleChange} onBlur={handleBlur} error={errors.email}/>
              <PasswordInput label="Password" name="password" onChange={handleChange} onBlur={handleBlur} error={errors.password}/>
              <SubmitButton>Sign In</SubmitButton>
            </FormStep>
          </Form>
          </div>
        </Card>
      </div>
    </Container>
  )
}

export default SignIn