import { UpdateServicePayloadType } from "@customTypes/authTypes";
import store from "@redux/store";

export const parseUpdateUserProfilePayload = () => {
    const state = store.getState();
    if (Object.keys(state.auth.userManipulationInProgress).length === 0) {
        return null;
    }
    let payload: UpdateServicePayloadType = { profile: {} }
    if (state.auth.userManipulationInProgress.displayName) {
        payload.profile.displayName = state.auth.userManipulationInProgress.displayName
    }
    if (state.auth.userManipulationInProgress.photoURL) {
        payload.profile.photoURL = state.auth.userManipulationInProgress.photoURL
    }
    if (state.auth.userManipulationInProgress.phoneNumber) {
        payload.phoneNumber = state.auth.userManipulationInProgress.phoneNumber
    }
    if (state.auth.userManipulationInProgress.password) {
        payload.password = state.auth.userManipulationInProgress.password
    }
    return payload
}

export const isProfilePictureChanged = () => {
    const state = store.getState();
    return state.auth.userManipulationInProgress.photoURL && state.auth.userManipulationInProgress.photoURL !== "" ? state.auth.userManipulationInProgress.photoURL : undefined
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