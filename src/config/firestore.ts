// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
} from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIk7hl58jdzI2inrn3fCXkewsdhoNfgWo",
  authDomain: "my-fake-school.firebaseapp.com",
  projectId: "my-fake-school",
  storageBucket: "my-fake-school.appspot.com",
  messagingSenderId: "867750236804",
  appId: "1:867750236804:web:f9408e6c02d2406f68a8d1",
  measurementId: "G-WZ2BV20SG5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const subjectCollection = collection(db, "subjects");

export { subjectCollection };
