import { createSelector } from "reselect";
import { RootState } from "@redux/types/index";
import { ModalListType } from "@customTypes/index";

//Top level selectors, every reducer must export at least one top level selector
export const selectRootState = (state: RootState) => state;
export const selectSubjectState = (state: RootState) => state.subject;
export const selectIndicatorState = (state: RootState) => state.indicators;

//Direct selectors for specific fields without derivation
export const selectSubjectCatalog = (state: RootState) =>
  state.subject.subjectCatalog;

export const selectUnregisteredSubjects = createSelector(
  selectSubjectCatalog,
  (subjects) => subjects.filter((subject) => subject.subjectId === "")
);

export const selectAppLoaderStatusLoading = (state: RootState) =>
  state.indicators.appLoaderStatus === "loading";

export const selectVisibleModals = (state: RootState) =>
  state.indicators.visibleModals;

export const selectAlerts = (state: RootState) => state.indicators.alerts;

export const selectSubjectManipulationInProgressData = (state: RootState) =>
  state.subject.subjectManipulationInProgress;

//Memoized selector for deriving data
export const makeSelectSubjectById = (subjectId: string) => {
  return createSelector([selectSubjectCatalog], (subjects) =>
    subjects.filter((subject) => subject.subjectId === subjectId)
  );
};

export const makeSelectCheckIfModalVisible = (modalName: ModalListType) => {
  return createSelector([selectVisibleModals], (visibleModals) =>
    visibleModals.includes(modalName)
  );
};
