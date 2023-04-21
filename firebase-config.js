// Import the functions you need from the SDKs you need
import {API_KEY,AUTH_DOMAIN,PROJECT_ID, STORAGE_BUCKET, SENDER_ID, APP_ID, MEASUR_ID} from '@env'
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile,
  signOut
 } from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: `${API_KEY}`,
  authDomain: `${AUTH_DOMAIN}`,
  projectId: `${PROJECT_ID}`,
  storageBucket: `${STORAGE_BUCKET}`,
  messagingSenderId: `${SENDER_ID}`,
  appId: `${APP_ID}`,
  measurementId: `${MEASUR_ID}`
};


// Initialize Firebase
if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export { 
  db, 
  auth, 
  firebase, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile,
  signOut
};