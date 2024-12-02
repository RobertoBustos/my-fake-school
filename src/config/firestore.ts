import app from "@config/firebase";
import { addDoc, collection, doc, getDocs, getFirestore, query, updateDoc, where } from "firebase/firestore";

const db = getFirestore(app);
const subjectCollection = collection(db, "subjects");
const connection = { addDoc, doc, getDocs, query, updateDoc, where };

export { connection, subjectCollection };
