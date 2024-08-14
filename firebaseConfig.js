// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSFpIw2Jc4lSvjSxfuJhh5r0EsQommplc",
  authDomain: "flashcard-saas-c06cb.firebaseapp.com",
  projectId: "flashcard-saas-c06cb",
  storageBucket: "flashcard-saas-c06cb.appspot.com",
  messagingSenderId: "359701389423",
  appId: "1:359701389423:web:a5eacd8f0e319aaa45ad9a",
  measurementId: "G-MTBVCW833W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
export default db;