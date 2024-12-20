import toast from "react-hot-toast"

export * from "@utils/authHelpers"
export * from "@utils/eventLogger"
export * from "@utils/mapFirebaseError"
export * from "@utils/serviceUtils"

export const removeKeyFromObject = (object: object, keyToRemove: string) => {
  return Object.fromEntries(Object.entries(object).filter(([key]) => key !== keyToRemove));
}

export const notify = toast

export const formatCurrency = (cents: number, currenccy: string): string => {
  const localCurrency = Intl.NumberFormat(currenccy, { style: "currency", currency: currenccy })



  return `$ ${localCurrency.format(cents / 100)} ${currenccy.toUpperCase()}`
}