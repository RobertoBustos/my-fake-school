import { connection, subjectCollection } from "@config/index";
import type {
  AddSubjectServicePayloadType,
  DeleteSubjectPayloadType,
  EditSubjectPayloadType,
  SubjectType,
} from "@customTypes/index";
import { eventLogger, events } from "@utils/index";
import i18n from "i18next";

export async function fetchSubjectsService(): Promise<SubjectType[] | Error> {
  let serviceResponse: SubjectType[] | Error;
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
  } catch {
    return Error(i18n.t("errors.unknown"));
  }
}

export async function addSubjectService(
  payload: AddSubjectServicePayloadType
): Promise<SubjectType | Error> {
  try {
    const newDoc = await connection.addDoc(subjectCollection, payload);
    const mappedSubject: SubjectType = {
      ...payload,
      subjectId: newDoc.id,
    };
    eventLogger(events.ADD_SUBJECT, payload)
    return mappedSubject;
  } catch {
    return Error(i18n.t("errors.unknown"));
  }
}

export async function updateSubjectService(
  payload: EditSubjectPayloadType
): Promise<boolean | Error> {
  try {
    const docToChange = connection.doc(
      subjectCollection,
      `/${payload.subjectId}`
    );
    await connection.updateDoc(docToChange, payload.newData);
    eventLogger(events.UPDATE_SUBJECT, payload)
    return true;
  } catch {
    return Error(i18n.t("errors.unknown"));
  }
}

export async function deleteSubjectService(
  payload: DeleteSubjectPayloadType
): Promise<boolean | Error> {
  try {
    const docToChange = connection.doc(
      subjectCollection,
      `/${payload.subjectId}`
    );
    //logic delete, if real delete is required call the deleteDoc function with the docToDelete parameter
    await connection.updateDoc(docToChange, payload.newData);
    eventLogger(events.DELETE_SUBJECT, payload)
    return true;
  } catch {
    return Error(i18n.t("errors.unknown"));
  }
}
