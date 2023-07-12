import React, { useEffect, useState } from 'react'
import Button from '../Button'
import { ReactComponent as Step } from "../../assets/circle-unselected.svg"
import { ReactComponent as SelectedStep } from "../../assets/circle-selected.svg"
import { initialProductForm } from '../../utils/initialForms'
import { useForm } from '../../hooks/useForm'
import { getUserByName } from '../../utils/database'

const Form = ({ children, onSubmit, errorMessage }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [stepsState, setStepsState] = useState([])

  useEffect(() => {
    let steps = 0;
    let childrenLength = children.length;
    let stepsState = [1];
    if (childrenLength) {
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
    if (currentStep < totalSteps - 1) {
      let stepsState = Array.from({ length: totalSteps }, () => (0));
      stepsState[currentStep + 1] = 1;
      setCurrentStep(prevStep => prevStep + 1);
      setStepsState(stepsState);
    }

  }

  const prevStep = (e) => {
    e.preventDefault();
    if (currentStep > 0) {
      let stepsState = Array.from({ length: totalSteps }, () => (0));
      stepsState[currentStep - 1] = 1;
      setCurrentStep(prevStep => prevStep - 1);
      setStepsState(stepsState);
    }

  }

  return (
    <form className="form-component" onSubmit={onSubmit}>
      {errorMessage &&
        <div className="form-error">
          <span>{errorMessage}</span>
        </div>
      }

      {totalSteps ?
        <NavigationBox prevStep={prevStep} nextStep={nextStep} stepsState={stepsState} />
        : null
      }

      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child, { index: index, state: stepsState[index] });
      })}

    </form>
  )
}

export const FormStep = ({ children, index, state }) => {
  return (
    <fieldset id={"step" + index} style={{ display: state ? "block" : "none" }}>
      <div className='formstep-content'>
        {children}
      </div>
    </fieldset>
  )
}


const NavigationBox = ({ prevStep, nextStep, stepsState }) => {
  return (
    <div className='formstep-buttonbox'>
      <Button onClick={prevStep} hidden={stepsState[0]}>&#60;</Button>
      {stepsState.map((state, index) => <div key={index}> {state ? <SelectedStep /> : <Step />}</div>)}
      <Button onClick={nextStep} hidden={stepsState[stepsState.length - 1]}>&#62;</Button>
    </div>
  )
}

export const SubmitButton = ({ children }) => {
  return (
    <Button type="submit">{children}</Button>
  )
}

export const TextInput = ({ label, name, placeholder, onBlur, onChange, error, value }) => {
  return (
    <div className="form-input">
      <div className="form-input-box">
        {label && <label>{label}</label>}
        <input value={value} onBlur={onBlur} onChange={onChange} type="text" name={name} placeholder={placeholder} />
        {error && <small>{error}</small>}
      </div>

    </div>
  )
}

export const PasswordInput = ({ label, name, placeholder, onBlur, onChange, error, value }) => {
  return (
    <div className="form-input">
      <div className="form-input-box">
        {label && <label>{label}</label>}
        <input value={value} onBlur={onBlur} onChange={onChange} type="password" name={name} placeholder={placeholder} />
        {error && <small>{error}</small>}
      </div>

    </div>
  )
}

export const NumberInput = ({ label, name, placeholder, onBlur, onChange, error, value }) => {
  return (
    <div className="form-input">
      <div className="form-input-box">
        {label && <label>{label}</label>}
        <input value={value} onBlur={onBlur} onChange={onChange} type="number" name={name} placeholder={placeholder} />
        {error && <small>{error}</small>}
      </div>

    </div>
  )
}

export const SelectInput = ({ label, name, placeholder, onBlur, onChange, error, items, value }) => {
  return (
    <div className="form-input">
      <div className="form-input-box">
        {label && <label>{label}</label>}
        <select value={value} onBlur={onBlur} onChange={onChange} name={name} placeholder={placeholder}>
          <option></option>
          {items.map(item => <option key={item} value={item}>{item}</option>)}
        </select>
        {error && <small>{error}</small>}
      </div>

    </div>
  )
}

export const LongTextInput = ({ label, name, placeholder, onBlur, onChange, error, maxLength, value }) => {
  return (
    <div className="form-input">
      <div className="form-input-box">
        {label && <label>{label}</label>}
        <textarea value={value} name={name} maxLength={maxLength} onBlur={onBlur} onChange={onChange} type="text" placeholder={placeholder} />
        {error && <small>{error}</small>}
      </div>

    </div>
  )
}

export const ImageInput = ({ label, name, error, onChange, onBlur, value }) => {
  const [fileName, setFileName] = useState("No selected");

  const updateImage = (e) => {
    if (e.target.files[0]) setFileName(e.target.files[0].name);
    onChange(e);
  }

  return (
    <div className="form-input">
      <div className="form-input-box">
        {label && <label>{label}</label>}
        <input value={value} id="image-input" type="file" name={name} accept="image/*" onChange={updateImage} onBlur={onBlur} />
        <Button onClick={(e) => { e.preventDefault(); document.querySelector("#image-input").click() }}>Select</Button>
        <span style={{ color: "var(--color-darkGray)", fontSize: ".8rem", margin: "0 .5rem" }}>{fileName}</span>
        {error && <small>{error}</small>}
      </div>
    </div>
  )
}

export const UserInput = ({ label, name, placeholder, onBlur, onChange, error }) => {
  const [results, setResults] = useState(null);
  const [selection, setSelection] = useState(null);

  async function updateSearch(e) {
    e.preventDefault();
    const searchParameter = e.target.value;
    const response = await getUserByName(searchParameter)
    console.log(response)
    if(response.status === "error") setResults(null)
    else setResults(response.slice(0, 3))
  }

  function handleClick(selection) {
    onChange({ [name]: selection.id });
    setSelection(selection);
    setResults(null);

  }

  return (
    <div className="form-input">
      <div className="form-input-box">
        {label && <label>{label}</label>}
        <input onBlur={onBlur} onChange={updateSearch} type="text" name={name} placeholder={placeholder} />
        {results &&
          <ul className='form-search-input-list'>
            {results.map((result, index) => (
              <div className='form-search-input-item' key={index} onClick={() => handleClick(result)}>
                <img src={result.photoURL} alt="Imagen de perfil" />
                <h1>{result.name}</h1>
                <span>{result.code}</span>
              </div>

            ))}
          </ul>
        }
        {selection &&
          <div className='form-search-input-item'>
            <img src={selection.photoURL} alt="Imagen de perfil" />
            <h1>{selection.name}</h1>
            <span>{selection.code}</span>
          </div>
        }
        {error && <small>{error}</small>}
      </div>

    </div>
  )
}

export const ProductsInput = ({ onChange, error }) => {
  const { form, errors, handleChange, handleBlur, handleSubmit, updateForm } = useForm(initialProductForm, handleAdd)
  const [products, setProducts] = useState();

  function handleAdd(form) {
    setProducts((prevProducts) => {
      const updatedProducts = {
        ...prevProducts,
        [form.productName]: {
          amount: form.productAmount,
          price: form.productPrice,
          sale: form.productSale
        }
      }
      onChange({ concept: updatedProducts });
      return updatedProducts
    })
    updateForm(initialProductForm);
  }

  function handleDelete(key) {
    setProducts((prevObjects) => {
      const updatedProducts = { ...prevObjects }
      delete updatedProducts[key]
      onChange({ concept: updatedProducts });
      return updatedProducts
    })


  }

  return (
    <div className='form-products-input'>
      <label>Concept</label>
      <TextInput value={form.productName} name="productName" label="Product" placeholder="Name" onChange={handleChange} onBlur={handleBlur} error={errors.productName} />
      <NumberInput value={form.productAmount} name="productAmount" placeholder="Amount(0.00)" onChange={handleChange} onBlur={handleBlur} error={errors.productAmount} />
      <NumberInput value={form.productPrice} name="productPrice" placeholder="Price(0.00)" onChange={handleChange} onBlur={handleBlur} error={errors.productPrice} />
      <NumberInput value={form.productSale} name="productSale" placeholder="Discount(%)" onChange={handleChange} onBlur={handleBlur} error={errors.productSale} />
      <Button onClick={handleSubmit}>Add</Button>
      {error && <small>{error}</small>}
      <div className="form-products-input-list">
        {products &&
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Amount</th>
                <th>Unitary Price</th>
                <th>Sale</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(products).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value.amount}</td>
                  <td>{value.price}</td>
                  <td>{value.sale}</td>
                  <td><Button type="button" color="secondary" onClick={() => handleDelete(key)}>Delete</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        }

      </div>

    </div>
  )
}

export default Form;