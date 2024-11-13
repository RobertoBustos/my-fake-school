import { signUp, logIn, logOut } from "@config/auth";
import { SignUpServicePayloadType, SignInServicePayloadType, CustomAuthError } from "@customTypes/index";
import { eventLogger, events } from "@utils/eventLogger";
import { UserCredential } from "firebase/auth";

export async function signUpService(payload: SignUpServicePayloadType): Promise<UserCredential | CustomAuthError> {
    try {
        const response = await signUp(payload.email, payload.password)
        eventLogger(events.SIGN_UP, payload)
        return response
    } catch (error) {
        return error as CustomAuthError
    }
}

export async function signInService(payload: SignInServicePayloadType): Promise<UserCredential | CustomAuthError> {
    try {
        const response = await logIn(payload.email, payload.password)
        eventLogger(events.SIGN_IN, payload)
        return response
    } catch (error) {
        return error as CustomAuthError
    }
}

export async function logOutService(): Promise<void | CustomAuthError> {
    try {
        const response = await logOut()
        eventLogger(events.LOG_OUT, {})
        return response
    } catch (error) {
        return error as CustomAuthError
    }
}