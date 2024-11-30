
export * from "./eventLogger"
export * from "./mapFirebaseError"
export * from "./authHelpers"
export * from "./stringUtils"
export * from "./serviceUtils"

export const removeKeyFromObject = (object: Object, keyToRemove: string) => {
  return Object.fromEntries(Object.entries(object).filter(([key]) => key !== keyToRemove));
}