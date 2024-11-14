import { signUp, logIn, logOut } from "@config/auth";
import { eventLogger, events } from "@utils/eventLogger";
import type { SignUpServicePayloadType, SignInServicePayloadType, CustomUserType, CustomAuthErrorType } from "@customTypes/index";
import { FirebaseError } from "firebase/app";

export async function signUpService(payload: SignUpServicePayloadType): Promise<CustomUserType | CustomAuthErrorType> {
    try {
        const response = await signUp(payload.email, payload.password)
        eventLogger(events.SIGN_UP, payload)
        return response.user
    } catch (error: unknown) {
        if (error instanceof FirebaseError) {
            return { message: error.code } as CustomAuthErrorType
        }
        return { message: "Unknown error" } as CustomAuthErrorType
    }
}

export async function signInService(payload: SignInServicePayloadType): Promise<CustomUserType | CustomAuthErrorType> {
    try {
        const response = await logIn(payload.email, payload.password)
        eventLogger(events.SIGN_IN, payload)
        return response.user
    } catch (error: unknown) {
        if (error instanceof FirebaseError) {
            return { message: error.code } as CustomAuthErrorType
        }
        return { message: "Unknown error" } as CustomAuthErrorType
    }
}

export async function logOutService(): Promise<void | CustomAuthErrorType> {
    try {
        const response = await logOut()
        eventLogger(events.LOG_OUT, {})
        return response
    } catch (error: unknown) {
        if (error instanceof FirebaseError) {
            return { message: error.code } as CustomAuthErrorType
        }
        return { message: "Unknown error" } as CustomAuthErrorType
    }
}