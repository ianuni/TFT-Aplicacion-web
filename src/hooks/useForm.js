import { useState } from 'react'
import { validations } from '../utils/validations'

export const useForm= (initialForm, actionOnSubmit) => {
  const[form, setForm] = useState(initialForm);
  const[errors, setErrors] = useState({});

  const handleChange = (e) => {
    if(e.target.type === "file") {
      setForm({
        ...form,
        [e.target.name]: e.target.files[0]
    });
    
    }
    else {
    setForm({
        ...form,
        [e.target.name]: e.target.value
    });
    }
  }

  const handleBlur = (e) => {
    const error = validations[e.target.name](form);
    setErrors({
        ...errors,
        [e.target.name] : error
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    var errors = {};
    for (let input in form){
        let error = validations[input](form);
        if (error) {
            errors = {
                ...errors,
                [input] : error
            }
        }
    }
    if(Object.keys(errors).length === 0){
        actionOnSubmit(form);
    }
    else{
        setErrors(errors);
    }
  }

  const updateForm = (name, value) => {
    setForm({
      ...form,
      [name]: value
  });
  
  }


  return{
    form, 
    errors, 
    handleChange, 
    handleBlur,
    handleSubmit,
    updateForm}
}