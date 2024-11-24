
import { v4 as uuidv4 } from "uuid";
export * from "./eventLogger"
export * from "./mapFirebaseError"
export * from "./authHelpers"

export const generateRandomUid = (): string => {
  return uuidv4();
};

export const fakeDelayPromise = async (promise: Promise<any>) => {
  return new Promise((resolve) => {
    setTimeout(resolve, 500);
  }).then(() => promise);
}

export const removeKeyFromObject = (object: Object, keyToRemove: string) => {
  return Object.fromEntries(Object.entries(object).filter(([key]) => key !== keyToRemove));
}