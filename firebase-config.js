// Import the functions you need from the SDKs you need

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
  apiKey: "AIzaSyBycWq3ciJ76ZmY7EThj8j1xya0IAxrOEk",
  authDomain: "ems-lambdadevs.firebaseapp.com",
  projectId: "ems-lambdadevs",
  storageBucket: "ems-lambdadevs.appspot.com",
  messagingSenderId: "558317824029",
  appId: "1:558317824029:web:eef37c6bbe22318589bef4",
  measurementId: "G-VV65YZRD0T"
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