// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: String(process.env.REACT_APP_FIREBASE_API_KEY),
  authDomain: "my-fake-school.firebaseapp.com",
  projectId: "my-fake-school",
  storageBucket: String(process.env.REACT_APP_STORAGE_BUCKET),
  messagingSenderId: String(process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID),
  appId: String(process.env.REACT_APP_FIREBASE_APP_ID),
  measurementId: String(process.env.REACT_APP_FIREBASE_MEASUREMENT_ID),
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
