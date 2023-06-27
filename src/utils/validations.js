const regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
const regexNif = /^[0-9]{8,8}[A-Za-z]$/;
const regexPhone = /^[6789]\d{8}$/;
const regexDescription = /^.{0,400}$/;

export const validations = {
    name: (form) =>{
        if(form.name.trim().length === 0){
            return "Name is required";
        } else if (form.name.trim().length > 50) {
            return "Name exceeds 50 characters"
        } else {
            return null;
        }
    },
    nif: (form) =>{
        if(form.nif.trim().length === 0){
            return "NIF is required";
        } else if (!regexNif.test(form.nif.trim())) {
            return "Invalid NIF";
        } else{
            return null;
        }
    },
    phoneNumber: (form) =>{
        if(form.phoneNumber.trim().length === 0){
            return "Phone number is required";
        } else if (!regexPhone.test(form.phoneNumber.trim())) {
            return "Invalid phone number";
        } else{
            return null;
        }
    },
    category: (form) =>{
        if(!form.category){
            return "Category is required";
        } else {
            return null;
        }
    },
    description: (form) =>{
        if (!regexDescription.test(form.description.trim())) {
            return "Description exceeds 400 characters";
        } else{
            return null;
        }
    },
    email: (form) =>{
        if(form.email.trim().length === 0){
            return "Email is required";
        } else if (!regexEmail.test(form.email.trim())) {
            return "Invalid Email";
        } else{
            return null;
        }
    },
    password: (form) =>{
        if(form.password.length === 0){
            return "Password is required";
        } else if (form.password.trim().length < 6) {
            return "Password must be at least 6 characters"
        } else{
            return null;
        }
    },
    confirmationPassword: (form) =>{
        if(form.confirmationPassword.length === 0){
            return "Confirmation is required";
        } else if (form.password !== form.confirmationPassword) {
            return "Passwords do not match";
        } else{
            return null;
        }
    },
    address: (form) =>{
        if(form.address.trim().length === 0){
           return "Address is required";
        }
        else{
            return null;
        }
    },
    apartment: (form) => {return null},
    city: (form) =>{
        if(form.city.trim().length === 0){
            return "City is required";
         }
         else{
             return null;
         }
    },
    postalCode: (form) =>{
        if(form.postalCode.trim().length === 0){
            return "Postal code is required";
         }
         else{
             return null;
         }
    },
    country: (form) =>{
        if(form.country.trim().length === 0){
            return "Country is required";
         }
         else{
             return null;
         }
    },
    image: (form) =>{
        if(form.image.size > 4194304){
            return "The file size exceeds 4 MB."
        }
    },
    customer: (form) => {
        if(form.customer.trim().length === 0){
            return "Customer is required";
         }
         else{
             return null;
         }
    },
  };