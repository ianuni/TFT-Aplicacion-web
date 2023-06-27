import React, { useState } from 'react'
import {ReactComponent as Sort} from "../../assets/sort.svg"

function SortButton({action}) {
    const [visible, setVisible] = useState(false);

  return (
    <div className="sort-button-component" onClick={() => setVisible(state => !state)}>
        <Sort/>
        {visible ? 
        <div className="sort-button-list">
            <ul>
                <li onClick={() => action("oldest")}>Oldest</li>
                <li onClick={() => action("newest")}>Newest</li>
                <li onClick={() => action("higher")}>Higher Total</li>
                <li onClick={() => action("lowest")}>Lowest Total</li>
            </ul>
        </div>  : null
        }
    </div>
  )
}

export default SortButton