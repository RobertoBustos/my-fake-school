import i18n from "i18next";
import { subjectCollection, connection } from "@config/firestore";
import type {
  AddSubjectServicePayloadType,
  SubjectCatalogType,
  SubjectType,
  EditSubjectPayloadType,
  DeleteSubjectPayloadType,
} from "@customTypes/index";

export async function getSubjectCatalog(): Promise<SubjectCatalogType | Error> {
  let serviceResponse: SubjectCatalogType | Error;
  try {
    const subjectQuery = connection.query(
      subjectCollection,
      connection.where("isDeleted", "==", false)
    );
    const querySnapshot = await connection.getDocs(subjectQuery);
    serviceResponse = querySnapshot.docs.map((doc) => {
      return {
        subjectId: doc.id,
        subjectName: doc.data().subjectName,
        isDeleted: doc.data().isDeleted,
      };
    });
    return serviceResponse;
  } catch (error) {
    return Error(i18n.t("errors.unknown"));
  }
}

export async function addSubject(
  payload: AddSubjectServicePayloadType
): Promise<SubjectType | Error> {
  try {
    const newDoc = await connection.addDoc(subjectCollection, payload);
    const mappedSubject: SubjectType = {
      ...payload,
      subjectId: newDoc.id,
    };
    return mappedSubject;
  } catch (error) {
    return Error(i18n.t("errors.unknown"));
  }
}

export async function updateSubject(
  payload: EditSubjectPayloadType
): Promise<boolean | Error> {
  try {
    const docToChange = connection.doc(
      subjectCollection,
      `/${payload.subjectId}`
    );
    await connection.updateDoc(docToChange, payload.newData);
    return true;
  } catch (error) {
    return Error(i18n.t("errors.unknown"));
  }
}

export async function deleteSubject(
  payload: DeleteSubjectPayloadType
): Promise<boolean | Error> {
  try {
    const docToChange = connection.doc(
      subjectCollection,
      `/${payload.subjectId}`
    );
    //logic delete, if real delete is required call the deleteDoc function with the docToDelete parameter
    await connection.updateDoc(docToChange, payload.newData);
    return true;
  } catch (error) {
    return Error(i18n.t("errors.unknown"));
  }
}
