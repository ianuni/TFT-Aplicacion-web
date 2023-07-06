import React from 'react'
import Card from '../Card'
import Button from '../Button'

function Dialog({title, body, confirmAction, cancelAction}) {
  return (
    <div className="dialog-component">
        <Card width="30rem" height="">
            <h1>{title}</h1>
            <p>{body}</p>
            <div className='button-box'>
              <Button onClick={confirmAction} color="primary">Confirm</Button>
              <Button onClick={cancelAction} color="secondary">Cancel</Button>
            </div>
        </Card>
    </div>
  )
}

export default Dialog