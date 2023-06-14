import React from 'react'
import Container from '../../components/Container'
import {ReactComponent as Logo} from "../../assets/coinmo.svg"
import Card from '../../components/Card'
import Form, {TextInput, PasswordInput, FormStep, SubmitButton } from '../../components/Form'
import TabMenu, { Tab } from '../../components/TabMenu'

function SignIn() {
  return (
    <Container>
      <div className='auth-component'>
        <div className='auth-title'>
          <Logo/>
          <h1>Coinmo</h1>
        </div>
        <Card width={25} height={31.25}>
          <TabMenu>
            <Tab name="Sign Up" path="/signup"/>
            <Tab name="Sign In" path="/signin"/>
          </TabMenu>
          <div className='auth-form'>
          <Form>
            <FormStep>
              <TextInput label="Email"/>
              <PasswordInput label="Password"/>
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