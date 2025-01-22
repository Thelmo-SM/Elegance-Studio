// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRWcMnQtv5urp7riwbsXY0JrzHM3HFluI",
  authDomain: "elegace-studio.firebaseapp.com",
  projectId: "elegace-studio",
  storageBucket: "elegace-studio.firebasestorage.app",
  messagingSenderId: "687197865464",
  appId: "1:687197865464:web:931057f325f46a4264820d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

export const auth = getAuth(app);
export const db = getFirestore(app);