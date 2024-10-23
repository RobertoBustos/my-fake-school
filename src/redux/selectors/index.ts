import { createSelector } from "reselect";
import { RootState } from "../store";
import { ModalList } from "../types";

//Top level selectors, every reducer must export at least one top level selector
export const selectRootState = (state: RootState) => state;
export const selectErrorState = (state: RootState) => state.error;
export const selectSubjectState = (state: RootState) => state.subject;
export const selectIndicatorState = (state: RootState) => state.indicators;

//Direct selectors for specific fields without derivation
export const selectSubjectCatalog = (state: RootState) =>
  state.subject.subjectCatalog;

export const selectAppLoaderStatus = (state: RootState) =>
  state.indicators.appLoaderStatus;

export const selectVisibleModals = (state: RootState) =>
  state.indicators.visibleModals;

export const selectSubjectEditionInProgressData = (state: RootState) =>
  state.subject.subjectEditionInProgress;

//Memoized selector for deriving data
export const selectUnregisteredSubjects = createSelector(
  [selectSubjectCatalog],
  (subjects) => {
    return subjects.filter((subject) => !subject.subjectId);
  }
);

export const makeSelectSubjectById = (subjectId: string) => {
  return createSelector([selectSubjectCatalog], (subjects) =>
    subjects.filter((subject) => subject.subjectId === subjectId)
  );
};

export const makeSelectCheckIfModalVisible = (modalName: ModalList) => {
  return createSelector([selectVisibleModals], (visibleModals) =>
    visibleModals.includes(modalName)
  );
};
