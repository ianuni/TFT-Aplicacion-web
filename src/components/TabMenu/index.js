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
    const state = (useLocation().pathname.includes(path))

    return(
        
        <div className={state ? "tabmenu-tab-activated" : "tabmenu-tab"} >
              <Link className="tabmenu-tab-name" to={path}>{name}</Link>
              {state && <div className='tabmenu-tab-underscore'></div>}
        </div>
    );
}

export default TabMenu