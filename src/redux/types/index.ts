import { ThunkAction } from "redux-thunk";
import { Action } from "@reduxjs/toolkit";
import type { SubjectType, AlertPropsType, AppLoaders, ModalListType, FeatureFlagType, UserDataType, ProfileFormFieldsType } from "@customTypes/index";
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
  visibleModals: ModalListType[];
  alerts: AlertPropsType[];
  featureFlags: FeatureFlagType[],
  appLoaders: AppLoaders[]
};

export type SubjectState = {
  subjectCatalog: SubjectType[];
  subjectManipulationInProgress: SubjectType;
};

export type AuthState = {
  userCredential: UserDataType
  isLoggedIn: boolean;
  userManipulationInProgress: ProfileFormFieldsType
}
