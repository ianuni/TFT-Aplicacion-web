import React from 'react'
import {ReactComponent as MagnifyingGlass} from "../../assets/magnifyingGlass.svg"


const SearchBar = ({text}) => {
  return (
    <div className="searchbar-component">
        
        <input placeholder={text}/>
        <MagnifyingGlass/>
    </div>
  )
}

export default SearchBar