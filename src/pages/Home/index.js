import React from 'react'
import { ReactComponent as Invoices } from "../../assets/invoices.svg"
import { ReactComponent as Inbox } from "../../assets/inbox.svg"
import { ReactComponent as Statistics } from "../../assets/statistics.svg"
import { ReactComponent as Profile } from "../../assets/profile.svg"
import Container from "../../components/Container"
import Navigation, { NavItem } from '../../components/Navigation'
import { Outlet } from 'react-router-dom'

function Home() {
  return (
    <Container>
      <Navigation>
        <NavItem tag="Invoices" to="/invoices" icon={<Invoices />} />
        <NavItem tag="Inbox" to="/inbox" icon={<Inbox />} />
        <NavItem tag="Statistics" to="/statistics" icon={<Statistics />} />
        <NavItem tag="Profile" to="/profile/details" icon={<Profile />} />
      </Navigation>
      <main className="home-section">
        <Outlet />
      </main>
    </Container>
  )
}

export default Home