import { UpdateServicePayloadType } from "@customTypes/authTypes";
import store from "@redux/store";
import { v4 as uuidv4 } from "uuid";
export * from "./eventLogger"
export * from "./mapFirebaseError"

export const generateRandomUid = (): string => {
  return uuidv4();
};

export const fakeDelayPromise = async (promise: Promise<any>) => {
  return new Promise((resolve) => {
    setTimeout(resolve, 500);
  }).then(() => promise);
}

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

export const removeKeyFromObject = (object: Object, keyToRemove: string) => {
  return Object.fromEntries(Object.entries(object).filter(([key]) => key !== keyToRemove));
}