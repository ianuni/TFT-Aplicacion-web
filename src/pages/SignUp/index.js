import React from 'react'
import Container from '../../components/Container'
import {ReactComponent as Logo} from "../../assets/coinmo.svg"
import "./styles.css"
import Card from '../../components/Card'
import Form, { FormStep } from '../../components/Form'
import { SelectInput, TextInput, LongTextInput, ImageInput } from '../../components/FormInputs'


function SignUp() {
  return (
    <Container>
      <div className='signup-container'>
        <div className='signup-title'>
          <Logo/>
          <h1>Coinmo</h1>
        </div>
        <Card width={25} height={31.25}>
          <div className='signup-tabmenu'>
            <div className='signup-tabbutton active'>
              <h1>Sign Up</h1>
              <div className='signup-underscore'></div>
            </div>
            <div className='signup-tabbutton'>
              <h1>Sign In</h1>
              <div className='signup-underscore'></div>
            </div>
          </div>
          <div className='signup-form'>
          <Form>
            <FormStep name="Info">
              <TextInput label="Nombre"/>
              <TextInput label="NIF"/>
              <SelectInput label="Category" items={[]}/>
              <ImageInput label="Photo"/>
              <LongTextInput label="Description"/>
            </FormStep>
            <FormStep name="Info">
              <TextInput label="Nombre"/>
              <TextInput label="NIF"/>
              <SelectInput label="Category" items={[]}/>
              <ImageInput label="Photo"/>
              <LongTextInput label="Description"/>
            </FormStep>
          </Form>
          </div>
        </Card>
      </div>
    </Container>
  )
}

export default SignUp