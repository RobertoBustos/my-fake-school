import { RootState } from "@redux/types";
import { createSelector } from "reselect";

export const selectSubjectState = (state: RootState) => state.subject;

export const selectSubjectCatalog = (state: RootState) =>
    state.subject.subjectCatalog;

export const selectUnregisteredSubjects = createSelector(
    selectSubjectCatalog,
    (subjects) => subjects.filter((subject) => subject.subjectId === "")
);

export const selectSubjectManipulationInProgressData = (state: RootState) =>
    state.subject.subjectManipulationInProgress;

//Memoized selector for deriving data
export const makeSelectSubjectById = (subjectId: string) => {
    return createSelector([selectSubjectCatalog], (subjects) =>
        subjects.filter((subject) => subject.subjectId === subjectId)
    );
};