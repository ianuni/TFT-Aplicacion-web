import React from 'react'
import { Link, useLocation} from 'react-router-dom'


const TabMenu = ({children}) => {
  return (
    <div className='tabmenu-component'>
        {children}
    </div>
  )
}

export const Tab = ({name, path}) => {
    const state = (path === useLocation().pathname)

    return(
        
        <div className={state ? "tabmenu-tab-activated" : "tabmenu-tab"} >
              <Link className="tabmenu-tab-name" to={path}>{name}</Link>
              {state && <div className='tabmenu-tab-underscore'></div>}
        </div>
    );
}

export default TabMenu