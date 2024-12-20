import { UpdateServicePayloadType } from "@customTypes/index";
import store from "@redux/store";

export const parseUpdateUserProfilePayload = () => {
    const state = store.getState();
    if (Object.keys(state.auth.userManipulationInProgress).length === 0) {
        return null;
    }
    const payload: UpdateServicePayloadType = {}
    const profile = Object();
    const password = Object()
    if (state.auth.userManipulationInProgress.displayName) {
        profile.displayName = state.auth.userManipulationInProgress.displayName
    }
    if (state.auth.userManipulationInProgress.photoURL) {
        profile!.photoURL = state.auth.userManipulationInProgress.photoURL
    }
    if (state.auth.userManipulationInProgress.newPassword) {
        password.newPassword = state.auth.userManipulationInProgress.newPassword
    }
    if (state.auth.userManipulationInProgress.confirmNewPassword) {
        password!.currentPassword = state.auth.userManipulationInProgress.confirmNewPassword
    }
    if (state.auth.userManipulationInProgress.phoneNumber) {
        payload.phoneNumber = state.auth.userManipulationInProgress.phoneNumber
    }
    if (Object.keys(profile).length > 0) {
        payload.profile = profile;
    }
    if (Object.keys(password).length > 0) {
        payload.password = password;
    }
    return payload
}

export const isProfilePictureChanged = () => {
    const state = store.getState();
    const result = state.auth.userManipulationInProgress.photoURL && state.auth.userManipulationInProgress.photoURL !== "" ? true : false
    return { result, previousValue: state.auth.userCredential.photoURL, newValue: state.auth.userManipulationInProgress.photoURL }
}

export const parseFullName = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) {
        return "";
    }
    if (firstName === "" && lastName === "") {
        return "";
    }
    return `${lastName},${firstName}`;
}