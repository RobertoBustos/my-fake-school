import {
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  AddSubjectPayloadType,
  DeleteSubjectPayloadType,
  UpdateSubjectPayloadType,
  SubjectCatalogType,
  SubjectType,
} from "../constants/subjectTypes";
import { subjectCollection } from "../config/firestore";

export async function getSubjectCatalog(): Promise<SubjectCatalogType | Error> {
  console.log("im calling getSubjectCatalog service");
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
  payload: AddSubjectPayloadType
): Promise<SubjectType | Error> {
  console.log("im calling addSubject service");
  if (payload.subjectName === "") return Error("Subject name is required");
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

export async function updateSubject(payload: UpdateSubjectPayloadType) {}

export async function deleteSubject(
  payload: DeleteSubjectPayloadType
): Promise<boolean | Error> {
  console.log("im calling deleteSubject service");
  try {
    const docToDelete = doc(subjectCollection, `/${payload.subjectId}`);
    await deleteDoc(docToDelete);
    return true;
  } catch (error) {
    return Error("Something went wrong");
  }
}
