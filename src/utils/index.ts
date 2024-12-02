import toast from "react-hot-toast"

export * from "./eventLogger"
export * from "./mapFirebaseError"
export * from "./authHelpers"
export * from "./serviceUtils"

export const removeKeyFromObject = (object: Object, keyToRemove: string) => {
  return Object.fromEntries(Object.entries(object).filter(([key]) => key !== keyToRemove));
}

export const notify = toast