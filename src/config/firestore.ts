import { getFirestore,collection, addDoc, doc, getDocs, query, updateDoc, where} from "firebase/firestore"
import app from "@config/firebase"

const db = getFirestore(app);
const subjectCollection = collection(db, "subjects");
const connection = { addDoc, doc, getDocs, query, updateDoc, where };

export { subjectCollection, connection };
