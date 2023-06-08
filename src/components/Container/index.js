import React from 'react'

function Container({children}) {
  return (
    <div className="background">
        {children}
      <div className="footer"></div>
    </div>
  )
}

export default Container