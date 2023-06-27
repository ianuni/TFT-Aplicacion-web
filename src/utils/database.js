import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {db, auth, storage} from "../firebase"
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const usersPublicRef = collection(db, "usersPublic");


export const signUp = async (form) => {
    /*const formData = new FormData(); // Crea una nueva instancia de FormData
    formData.append('file', form.image); // Agrega el archivo al objeto FormData
  
    fetch("http://localhost:5000/coinmo-8a9cd/us-central1/app/upload", {
      method: 'POST',
      body: formData
    }).then(response => response.json())
    .then(data => {
      console.log('Respuesta:', data);
    })*/

    /*fetch("http://localhost:5000/coinmo-8a9cd/us-central1/app/coinmo/user/add", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
          })
          .then(response => response.json())
          .then(data => {
            console.log('Respuesta:', data);
          })
          .catch(error => {
            console.error('Error:', error);
          });*/
    const error = null;
    const credentials = await createUserWithEmailAndPassword(auth, form.email, form.password);
    const uid = credentials.user.uid;
    let photoURL= null;
    const q = query(usersPublicRef, where("name", "==", form.name));
    if(form.image){
        const pictureRef = ref(storage, "profilePictures/" + uid)
        await uploadBytes(pictureRef, form.image);
        photoURL = await getDownloadURL(pictureRef)
    }
    
    await setDoc(doc(db, "users", uid), {
        name: form.name,
        nif: form.nif,
        category: form.category,
        phoneNumber: form.phoneNumber,
        email: form.email,
        description: form.description,
        address: {
                street: form.address,
                apartment: form.apartment,
                postalCode: form.postalCode,
                city: form.city,
                country: form.country
        },
        photoURL: photoURL 
    });
    const usersQuery = await getDocs(q);
    const number = "#" + usersQuery.size.toString().padStart(4, '0');
    await setDoc(doc(db, "usersPublic", uid), {
        name: form.name,
        code: number,
        category: form.category,
        description: form.description,
        photoURL: photoURL   
    });
    await updateProfile(credentials.user, {
        displayName: form.name,
        photoURL: photoURL
    })
    return error;
    
}