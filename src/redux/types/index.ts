import type { AppLoaders, FeatureFlagType, ModalWindows, ProfileFormFieldsType, SubjectType, UserDataType } from "@customTypes/index";
import { Action, EnhancedStore, StoreEnhancer, Tuple, UnknownAction } from "@reduxjs/toolkit";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

export type AppStore = EnhancedStore<{
  subject: SubjectState;
  indicators: IndicatorsState;
  auth: AuthState;
}, UnknownAction, Tuple<[StoreEnhancer<{
  dispatch: ThunkDispatch<{
    subject: SubjectState;
    indicators: IndicatorsState;
    auth: AuthState;
  }, undefined, UnknownAction>;
}>, StoreEnhancer]>>;
export type RootState = ReturnType<AppStore["getState"]>;
export type PreloadState = Partial<RootState>;
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
