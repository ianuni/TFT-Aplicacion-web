import { db, storage } from "../firebase"
import { collection, doc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const signUp = async (form) => {
  const uid = doc(collection(db, "users")).id
  let photoURL = null;
  if (form.image) {
    const pictureRef = ref(storage, "profilePictures/" + uid)
    await uploadBytes(pictureRef, form.image);
    photoURL = await getDownloadURL(pictureRef)
  }
  const response = await fetch("http://localhost:5000/coinmo-8a9cd/us-central1/app/coinmo/users", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...form,
      uid: uid,
      photoURL: photoURL
    })
  })
  return response.json()
}

export const deleteInvoice = async (idToken, invoiceId) => {
  fetch("http://localhost:5000/coinmo-8a9cd/us-central1/app/coinmo/invoice/" + invoiceId, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export const addInvoice = async (idToken, invoiceRequest) => {
  const response = await fetch("http://localhost:5000/coinmo-8a9cd/us-central1/app/coinmo/invoice", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
    body: JSON.stringify(invoiceRequest)
  })
  return response.json()
}

export const validateInvoice = async (idToken, invoiceId) => {
  fetch("http://localhost:5000/coinmo-8a9cd/us-central1/app/coinmo/validate/invoice/" + invoiceId, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export const declineInvoice = async (idToken, invoiceId) => {
  fetch("http://localhost:5000/coinmo-8a9cd/us-central1/app/coinmo/decline/invoice/" + invoiceId, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export const deleteNotification = async (idToken, notificationId) => {
  fetch("http://localhost:5000/coinmo-8a9cd/us-central1/app/coinmo/notification/" + notificationId, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export const getUserByName = async (idToken, name, callback) => {
  fetch("http://localhost:5000/coinmo-8a9cd/us-central1/app/coinmo/user/" + name.toLowerCase(), {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${idToken}`
    }
  })
    .then((response) => response.json())
    .then(callback)
}