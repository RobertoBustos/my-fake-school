import toast from "react-hot-toast"

export * from "@utils/authHelpers"
export * from "@utils/eventLogger"
export * from "@utils/mapFirebaseError"
export * from "@utils/serviceUtils"

export const removeKeyFromObject = (object: Object, keyToRemove: string) => {
  return Object.fromEntries(Object.entries(object).filter(([key]) => key !== keyToRemove));
}

export const notify = toast