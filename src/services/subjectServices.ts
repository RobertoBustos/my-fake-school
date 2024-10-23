import {
  addDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  AddSubjectServicePayloadType,
  SubjectCatalogType,
  SubjectType,
  EditSubjectPayloadType,
  DeleteSubjectPayloadType,
} from "../constants/subjectTypes";
import { subjectCollection } from "../config/firestore";

export async function getSubjectCatalog(): Promise<SubjectCatalogType | Error> {
  let serviceResponse: SubjectCatalogType | Error;
  try {
    const subjectQuery = query(
      subjectCollection,
      where("isDeleted", "==", false)
    );
    const querySnapshot = await getDocs(subjectQuery);
    serviceResponse = querySnapshot.docs.map((doc) => {
      return {
        subjectId: doc.id,
        subjectName: doc.data().subjectName,
        isDeleted: doc.data().isDeleted,
      };
    });
    return serviceResponse;
  } catch (error) {
    return Error("Something went wrong");
  }
}

export async function addSubject(
  payload: AddSubjectServicePayloadType
): Promise<SubjectType | Error> {
  try {
    const newDoc = await addDoc(subjectCollection, payload);
    const mappedSubject: SubjectType = {
      ...payload,
      subjectId: newDoc.id,
    };
    return mappedSubject;
  } catch (error) {
    return Error("Something went wrong");
  }
}

export async function updateSubject(
  payload: EditSubjectPayloadType
): Promise<boolean | Error> {
  try {
    const docToEdit = doc(subjectCollection, `/${payload.subjectId}`);
    await updateDoc(docToEdit, payload.newData);
    return true;
  } catch (error) {
    return Error("Something went wrong");
  }
}

export async function deleteSubject(
  payload: DeleteSubjectPayloadType
): Promise<boolean | Error> {
  try {
    const docToEdit = doc(subjectCollection, `/${payload.subjectId}`);
    await updateDoc(docToEdit, payload.newData);
    return true;
  } catch (error) {
    return Error("Something went wrong");
  }
}

/* export async function deleteSubject(
  payload: DeleteSubjectServicePayloadType
): Promise<boolean | Error> {
  try {
    const docToDelete = doc(subjectCollection, `/${payload.subjectId}`);
    await deleteDoc(docToDelete);
    return true;
  } catch (error) {
    return Error("Something went wrong");
  }
} */
