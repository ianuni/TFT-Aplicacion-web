import React from 'react'

function Button({children, onClick, type, hidden, color}) {
  return (
    <button type={type} className={'button button-' + color} onClick={onClick} style={{visibility: hidden ? "hidden" : "visible"}}>{children}</button>
  )
}

export default Button