import React, {useEffect, useState}from 'react'
import Button from '../Button'
import {ReactComponent as Step} from "../../assets/circle-unselected.svg"
import {ReactComponent as SelectedStep} from "../../assets/circle-selected.svg"

const Form = ({children, onSubmit, errorMessage}) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [totalSteps, setTotalSteps] = useState(0);
    const [stepsState, setStepsState] = useState([])
    
    useEffect(() => {
        let steps = 0;
        let childrenLength = children.length;
        let stepsState = [1];
        if (childrenLength){
            for (let i = 1; i < childrenLength; i++) {
                stepsState.push(0);
            }
            steps = childrenLength;
        }
        setTotalSteps(steps);
        setStepsState(stepsState);
    }, [])

    const nextStep = (e) => {
        e.preventDefault();
        if(currentStep < totalSteps - 1){
            let stepsState = Array.from({ length: totalSteps }, () => (0));
            stepsState[currentStep + 1] = 1;
            setCurrentStep(prevStep => prevStep + 1);
            setStepsState(stepsState);
        }
        
    }

    const prevStep = (e) => {
        e.preventDefault();
        if(currentStep > 0){
            let stepsState = Array.from({ length: totalSteps }, () => (0));
            stepsState[currentStep - 1] = 1;
            setCurrentStep(prevStep => prevStep - 1);
            setStepsState(stepsState);
        }
        
    }

    return (
      <form className="form-component" onSubmit={onSubmit}>
          { errorMessage &&
          <div className="form-error">
            <span>{errorMessage}</span>
          </div>
          }

        {totalSteps  ? 
            <NavigationBox prevStep={prevStep} nextStep={nextStep} stepsState={stepsState} />
            : null
          }

        {React.Children.map(children, (child, index) => {
            return React.cloneElement(child, {index: index, state: stepsState[index]});
        })}
          
      </form>
    )
  }

export const FormStep = ({children, name, index, state}) => {
    return (
        <fieldset  id={"step" + index} style={{display: state ? "block" : "none"}}>
            <div className='formstep-content'>
                {children}
            </div>
        </fieldset>
    )
}

const NavigationBox = ({prevStep, nextStep, stepsState}) => {
    return (
        <div className='formstep-buttonbox'>
              <Button onClick={prevStep} hidden={stepsState[0]}>&#60;</Button>
              {stepsState.map((state, index) => <div key={index}> {state ? <SelectedStep /> : <Step/>}</div>)}
              <Button onClick={nextStep} hidden={stepsState[stepsState.length -1]}>&#62;</Button>
        </div>
    )
}

export const SubmitButton = ({children}) => {
    return (
        <Button type="submit">{children}</Button>
    )
}

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

export const ImageInput = ({label, name, error, onChange, onBlur}) => {
    const [fileName, setFileName] = useState("No selected");
  
    const updateImage = (e) => {
      if(e.target.files[0]) setFileName(e.target.files[0].name);
      onChange(e);
    }
  
    return (
      <div className="form-input">
        {label && <label>{label}</label>}
        <input  id="image-input" type="file" name={name}  accept="image/*" onChange={updateImage} onBlur={onBlur}/>
        <Button onClick={(e) => {e.preventDefault(); document.querySelector("#image-input").click()}}>Select</Button>
        <span style={{color: "var(--color-darkGray)", fontSize: ".8rem", margin: "0 .5rem"}}>{fileName}</span>
        {error && <small>{error}</small>}
      </div>
    )
  }

export default Form;