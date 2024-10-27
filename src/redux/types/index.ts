import { ThunkAction } from "redux-thunk";
import { Action } from "@reduxjs/toolkit";
import type { SubjectType, AlertPropsType, VisibleModalListType } from "@customTypes/index";
import store from "@redux/store";

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
// Define a reusable type describing thunk functions
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
export type IndicatorsState = {
  appLoaderStatus: "idle" | "loading" | "failed";
  visibleModals: VisibleModalListType;
  alerts: AlertPropsType[];
};

export type SubjectState = {
  subjectCatalog: SubjectType[];
  subjectManipulationInProgress: SubjectType;
};
