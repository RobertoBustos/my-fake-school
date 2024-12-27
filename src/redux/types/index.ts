import type { AppLoaders, FeatureFlagType, ModalWindows, ProfileFormFieldsType, SubjectType, UserDataType } from "@customTypes/index";
import store from "@redux/store";
import { Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";

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
  featureFlags: FeatureFlagType[];
  analytics: string | null
};

export type SubjectState = {
  subjectCatalog: SubjectType[];
  subjectManipulationInProgress: SubjectType;
  activeSubjectLoaders: AppLoaders[]
  visibleModals: ModalWindows[];
};

export type AuthState = {
  userCredential: UserDataType
  isLoggedIn: boolean;
  userManipulationInProgress: ProfileFormFieldsType
  activeAuthLoaders: AppLoaders[]
}
