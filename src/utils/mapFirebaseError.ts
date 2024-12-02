import { CustomAuthErrorType } from "@customTypes/index"
import { FirebaseError } from "firebase/app"

export const shapeFirebaseAuthError = (errorCode: string) => {
    return errorCode.replace("/", ".").replaceAll("-", "")
}

export const mapFirebaseError = (error: any) => {
    if (error instanceof FirebaseError) {
        return { message: error.code } as CustomAuthErrorType
    }
    if (error instanceof Error) {
        return { message: error.message } as CustomAuthErrorType
    }
    if ("message" in error) {
        return { message: error.message } as CustomAuthErrorType
    }
    return { message: "Unknown error" } as CustomAuthErrorType
}