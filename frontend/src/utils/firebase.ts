// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import {getFirestore, setDoc, doc} from 'firebase/firestore';
import { userData } from "@/types/userTypes";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

export const auth = getAuth(app);
export const db = getFirestore(app);

//Data Base Function
export const setDocument = (path: string, data: userData) => {
  return setDoc(doc(db, path), data);
}

/*
email
"sdf@gm.vom"
(cadena)


lastName
"tuh"
(cadena)


name
"ret"
(cadena)


phone
"53456346346"
(cadena)


role
"client"
(cadena)


uid
"uoizFIPVaZbYPuyevRDKDviuMri1"
*/