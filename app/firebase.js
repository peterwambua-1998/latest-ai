// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-app-49d1e.firebaseapp.com",
  projectId: "ai-app-49d1e",
  storageBucket: "ai-app-49d1e.appspot.com",
  messagingSenderId: "933538493731",
  appId: "1:933538493731:web:e6d6120ba6335927590896",
  measurementId: "G-DEHQNEYD27"
};

// Initialize Firebase

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export {app, auth, db}

