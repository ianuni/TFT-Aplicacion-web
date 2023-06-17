import React from 'react'
import { Link, useLocation } from 'react-router-dom';




const Navigation = ({children}) => {

  return (

      <div className="navigation-component">
        <nav className="navigation-bar">
          <ul className="navigation-list">
            {children}
          </ul>
        </nav>
      </div>  

  )
}

export const NavItem = ({icon, to, tag}) => {
    const state = (to === useLocation().pathname)
    
  return (
    <li className={state ? "navigation-item activated" : "navigation-item"}>
      <Link to={to}>
        {icon}
      </Link>
    </li>
    
  )
}

export default Navigation;