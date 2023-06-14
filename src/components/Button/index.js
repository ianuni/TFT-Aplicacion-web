import React from 'react'

function Button({children, onClick, type, hidden}) {
  return (
    <button type={type} className="button" onClick={onClick} style={{visibility: hidden ? "hidden" : "visible"}}>{children}</button>
  )
}

export default Button