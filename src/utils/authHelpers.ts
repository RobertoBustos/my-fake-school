import { UpdateServicePayloadType } from "@customTypes/authTypes";
import store from "@redux/store";

export const parseUpdateUserProfilePayload = () => {
    const state = store.getState();
    if (Object.keys(state.auth.userManipulationInProgress).length === 0) {
        return null;
    }
    let payload: UpdateServicePayloadType = {}
    if (state.auth.userManipulationInProgress.displayName) {
        payload.displayName = state.auth.userManipulationInProgress.displayName
    }
    if (state.auth.userManipulationInProgress.phoneNumber) {
        payload.phoneNumber = state.auth.userManipulationInProgress.phoneNumber
    }
    if (state.auth.userManipulationInProgress.password) {
        payload.password = state.auth.userManipulationInProgress.password
    }
    return payload
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