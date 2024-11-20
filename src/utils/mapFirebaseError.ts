import { CustomAuthErrorType } from "@customTypes/authTypes"
import { FirebaseError } from "firebase/app"

export const shapeFirebaseAuthError = (errorCode: string) => {
    return errorCode.replace("/", ".").replaceAll("-", "")
}

export const mapFirebaseError = (error: unknown) => {
    if (error instanceof FirebaseError) {
        return { message: error.code } as CustomAuthErrorType
    }
    if (error instanceof Error) {
        return { message: error.message } as CustomAuthErrorType
    }
    return { message: "Unknown error" } as CustomAuthErrorType
}