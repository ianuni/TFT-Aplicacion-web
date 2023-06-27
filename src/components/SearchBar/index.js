import React from 'react'
import {ReactComponent as MagnifyingGlass} from "../../assets/magnifyingGlass.svg"


const SearchBar = ({text, onChange}) => {
  return (
    <div className="searchbar-component">
        <input placeholder={text} onChange={onChange}/>
        <MagnifyingGlass/>
    </div>
  )
}

export default SearchBar