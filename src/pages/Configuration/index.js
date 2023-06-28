import React from 'react'
import Card from '../../components/Card'
import { auth } from '../../firebase'
import{signOut} from "firebase/auth"
import{Outlet} from "react-router-dom"

function Configuration() {
  return (
    <div className="profile-page">
        <Card width="60rem" height="calc(100% - 2rem)">
            <div className="profile-grid">
                <div className='profile-navigation'>
                    <ul>
                        <li>Account</li>
                        <li>Preferences</li>
                        <li onClick={() => signOut(auth)}>Sign Out</li>
                    </ul>
                </div>
                <div className='profile-content'>
                    <Outlet/>
                </div>
            </div>
        </Card>
    </div>
  )
}

export default Configuration