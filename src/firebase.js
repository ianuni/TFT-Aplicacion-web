import * as firebase from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const app = firebase.initializeApp({
  apiKey: "AIzaSyDPdxgj4O9IJD2rX6uTlB2lKFVxUQe9ykk",
  authDomain: "coinmo-8a9cd.firebaseapp.com",
  projectId: "coinmo-8a9cd",
  storageBucket: "coinmo-8a9cd.appspot.com",
  messagingSenderId: "551885906201",
  appId: "1:551885906201:web:a382f05134ad958339a588"
});

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;