import { RootState } from "@redux/types";

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn

export const selectLoggedInUserData = (state: RootState) => state.auth.userCredential

export const selectIsEmailVerified = (state: RootState) => state.auth.userCredential?.isEmailVerified

export const selectIsProfileEdited = (state: RootState) => {
    return Object.keys(state.auth.userManipulationInProgress).length > 0
}

export const selecProfilePhotoURL = (state: RootState) => {
    return state.auth.userManipulationInProgress.photoURL || state.auth.userCredential.photoURL
} 