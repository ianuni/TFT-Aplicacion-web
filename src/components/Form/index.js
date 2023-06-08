import React, {useEffect, useState}from 'react'
import Button from '../Button'
import {ReactComponent as Step} from "../../assets/circle-unselected.svg"
import {ReactComponent as SelectedStep} from "../../assets/circle-selected.svg"

const Form = ({children, onSubmit, errorMessage}) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [totalSteps, setTotalSteps] = useState(0);
    const [stepsArray, setStepsArray] = useState([]);
    
    
    
    useEffect(() => {
        let steps = 0;
        let childrenLength = children.length;
        let stepsArray = [];
        if (childrenLength){
            stepsArray.push(<SelectedStep key={0}/>);
            for (let i = 1; i < childrenLength; i++) {
                stepsArray.push(<Step key={i}/>)
            }
            
            steps = childrenLength;
        }
        setTotalSteps(steps);
        setStepsArray(stepsArray);
    }, [children])

    const nextStep = (e) => {
        console.log(currentStep);
        e.preventDefault();
        if(currentStep < totalSteps - 1){
            let steps = Array.from({ length: totalSteps }, (_, index) => (
                <Step key={index}/>
              ));
            steps[currentStep + 1] = <SelectedStep key={currentStep + 1}/>
            setCurrentStep(prevStep => prevStep + 1)
            setStepsArray(steps);
            
        }
        
    }

    const prevStep = (e) => {
        e.preventDefault();
        console.log(currentStep, totalSteps)
        if(currentStep > 0){
            let steps = Array.from({ length: totalSteps }, (_, index) => (
                <Step key={index}/>
              ));
            steps[currentStep - 1] = <SelectedStep key={currentStep - 1}/>
            setCurrentStep(prevStep => prevStep - 1)
            setStepsArray(steps);
        }
        
    }

    return (
      <form className="form-component" onSubmit={onSubmit}>
          { errorMessage &&
          <div className="form-error">
            <span>{errorMessage}</span>
          </div>
          }

        {React.Children.map(children, (child, index) => {
            return React.cloneElement(child, {index});
        })}

          {totalSteps  ? 
            <div className='formstep-buttonbox'>
              <Button onClick={prevStep}>&#60;</Button>
              {stepsArray}
              <Button onClick={nextStep}>&#62;</Button>
            </div>
            : null
          }
      </form>
    )
  }



export const FormStep = ({children, name, index}) => {
    return (
        <fieldset  id={"step" + index} style={{display: "none"}}>
            <div className='formstep-content'>
                {children}
            </div>
        </fieldset>
    )
}


export default Form;