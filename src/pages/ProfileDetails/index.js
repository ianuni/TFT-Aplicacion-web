import React, {useState, useEffect} from 'react'
import { useAuth } from '../../context/AuthContext'
import Form, { FormStep, LongTextInput, NumberInput, SelectInput, TextInput } from '../../components/Form'
import { getMyUser } from '../../utils/database'
import { categories } from '../../utils/data'

function ProfileDetails() {
  const [user, setUser] = useState()
  const {currentUser} = useAuth()

  useEffect(() => {
    const getUserData = async() =>{
      const response = await getMyUser(currentUser.token)
      if (response.status === "success") setUser(response.message)
    }
    currentUser && getUserData()
  }, [currentUser.token])

  function handleChange(e){
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value 
    }))
  }

   return (
    <div className="profile-details-page">
      { user &&
      <>
      <div className="invoice-user-image">
        <img src={currentUser.photoURL} alt="vendor logo" />
      </div>
      <div className="profile-details-user-info">
        <Form>
          <FormStep>
            <TextInput onChange={handleChange} value={user.name} name="name" label="Name"/>
            <TextInput onChange={handleChange} value={user.nif} name="nif" label="NIF"/>
            <SelectInput onChange={handleChange} value={user.category} name="category"items={categories}label="Category"/>
            <LongTextInput onChange={handleChange} value={user.description} name="description" label="Description"/>
          </FormStep>
          <FormStep>
            <TextInput onChange={handleChange} value={user.email} name="email" label="Email"/>
            <NumberInput onChange={handleChange} value={user.phoneNumber} name="phoneNumber" label="Phone Number"/>
          </FormStep>
          <FormStep>
            <TextInput onChange={handleChange} value={user.address} name="address" label="Address"/>
            <TextInput onChange={handleChange} value={user.apartment} name="apartment" label="Apartment"/>
            <TextInput onChange={handleChange} value={user.city} name="city" label="City"/>
            <TextInput onChange={handleChange} value={user.postalCode} name="postalCode" label="Postal Code"/>
            <TextInput onChange={handleChange} value={user.country} name="country" label="Country"/>
          </FormStep>
        </Form>
      
      </div>
      </>}
    </div>
  )
}

export default ProfileDetails