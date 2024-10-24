import type { SubjectType } from "../../constants/subjectTypes";

export enum ModalList {
  EDIT_SUBJECT_MODAL = "EditSubjectModal",
  DELETE_SUBJECT_MODAL = "DeleteSubjectModal",
  ANOTHER_MODAL = "AnotherModal",
  ONE_MORE_MODAL = "OneMoreModal",
}

export type VisibleModalsState = ModalList[];

export type AlertType = {
  alertId: string;
  message: string;
  type: "danger" | "success" | "warning";
  dismisable: boolean;
};

export type IndicatorsState = {
  appLoaderStatus: "idle" | "loading" | "failed";
  visibleModals: VisibleModalsState;
  alerts: AlertType[];
};

export type SubjectState = {
  subjectCatalog: SubjectType[];
  subjectManipulationInProgress: SubjectType;
};
