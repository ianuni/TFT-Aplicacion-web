import React from 'react'
import Card from '../../components/Card'
import { auth } from '../../firebase'
import{signOut} from "firebase/auth"
import{Outlet} from "react-router-dom"
import TabMenu, {Tab} from '../../components/TabMenu'
function Profile() {
  return (
    <div className="profile-page">
        <Card width="35rem" height="100%">
            <TabMenu>
                <Tab name="Details" path="details"/>
                <span className="profile-page-signout" onClick={() => {signOut(auth)}}>Sign Out</span>
            </TabMenu>
            <div className="profile-page-section">
              <Outlet/>
            </div>
        </Card>
    </div>
  )
}

export default Profile