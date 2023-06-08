import React from 'react'

function Card({children, width, height}) {
  return (
    <div className="card" style={{width: width + "rem", height:height+ "rem"}}>
        {children}
    </div>
  )
}

export default Card