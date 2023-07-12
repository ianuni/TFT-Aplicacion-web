import { db, storage } from "../firebase"
import { collection, doc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const APIurl = "https://app-aubgs2rqcq-uc.a.run.app"

export const signUp = async (form) => {
  const uid = doc(collection(db, "users")).id
  let photoURL = null;
  if (form.image) {
    const pictureRef = ref(storage, "profilePictures/" + uid)
    await uploadBytes(pictureRef, form.image);
    photoURL = await getDownloadURL(pictureRef)
  }
  const response = await fetch(APIurl + "/coinmo/users", {
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
  const response = await fetch(APIurl + "/coinmo/invoice/" + invoiceId, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.json()
}

export const addInvoice = async (idToken, invoiceRequest) => {
  const response = await fetch(APIurl + "/coinmo/invoice", {
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
  const response = await fetch(APIurl + "/coinmo/validate/invoice/" + invoiceId, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.json()
}

export const declineInvoice = async (idToken, invoiceId) => {
  const response = await fetch(APIurl + "/coinmo/decline/invoice/" + invoiceId, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.json()
}

export const deleteNotification = async (idToken, notificationId) => {
  const response = await fetch(APIurl + "/coinmo/notification/" + notificationId, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.json()
}

export const getUserByName = async (name) => {
  const response = await fetch(APIurl + "/coinmo/user/" + name.toLowerCase())
  return response.json()
}

export const getMyUser = async (idToken) => {
  const response = await fetch(APIurl + "/coinmo/user", {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.json()
}

export const getInvoice = async (idToken, invoiceId) => {
  const response = await fetch(APIurl + "/coinmo/invoice/" + invoiceId, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.json()
}