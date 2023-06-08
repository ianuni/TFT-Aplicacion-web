import React, {useState} from "react"
import Button from "../Button"

export const TextInput = ({label, name, placeholder, onBlur, onChange, error}) => {
    return (
      <div className="form-input">
        {label && <label>{label}</label>}
        <input onBlur={onBlur} onChange={onChange} type="text" name={name} placeholder={placeholder}/>
        {error && <small>{error}</small>}
      </div>
    )
  }

export const PasswordInput = ({label, name, placeholder, onBlur, onChange, error}) => {
    return (
      <div className="form-input">
        {label && <label>{label}</label>}
        <input onBlur={onBlur} onChange={onChange} type="password" name={name} placeholder={placeholder}/>
        {error && <small>{error}</small>}
      </div>
    )
}

export const SelectInput = ({label, name, placeholder, onBlur, onChange, error, items}) => {
    return (
      <div className="form-input">
        {label && <label>{label}</label>}
        <select onBlur={onBlur} onChange={onChange} name={name} placeholder={placeholder}>
          <option></option>
          {items.map(item => <option key={item} value={item}>{item}</option>)}      
        </select>
        {error && <small>{error}</small>}
      </div>
    )
}

export const LongTextInput = ({label, name, placeholder, onBlur, onChange, error, maxLength}) => {
    return (
        <div className="form-input">
          {label && <label>{label}</label>}
          <textarea name={name} maxLength={maxLength} onBlur={onBlur} onChange={onChange} type="text" placeholder={placeholder}/>
          {error && <small>{error}</small>}
        </div>
      )
}

export const ImageInput = ({label, name, error, onChange}) => {
    const [fileName, setFileName] = useState("No selected");
  
    const updateImage = (e) => {
      console.log(e.target.type)
      if(e.target.files[0]) setFileName(e.target.files[0].name);
      onChange(e);
    }
  
    return (
      <div className="form-input">
        {label && <label>{label}</label>}
        <input  id="image-input" type="file" name={name}  onChange={updateImage}/>
        <Button onClick={(e) => {e.preventDefault(); document.querySelector("#image-input").click()}}>Select</Button>
        <span style={{color: "var(--color-darkGray)", fontSize: ".8rem", margin: "0 .5rem"}}>{fileName}</span>
        {error && <small>{error}</small>}
      </div>
    )
  }