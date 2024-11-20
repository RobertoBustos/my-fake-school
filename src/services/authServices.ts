import { auth, signUp, logIn, logOut, verifyEmalil, updateUserProfile, updateUserPassword } from "@config/auth";
import { eventLogger, events } from "@utils/eventLogger";
import { mapFirebaseError } from "@utils/mapFirebaseError";
import type { SignUpServicePayloadType, SignInServicePayloadType, CustomUserType, CustomAuthErrorType, CustomAuthResponseType, UpdateServicePayloadType } from "@customTypes/index";

export async function signUpService(payload: SignUpServicePayloadType): Promise<CustomUserType | CustomAuthErrorType> {
    try {
        const response = await signUp(payload.email, payload.password)
        eventLogger(events.SIGN_UP, payload)
        return response.user
    } catch (error: unknown) {
        return mapFirebaseError(error);
    }
}

export async function signInService(payload: SignInServicePayloadType): Promise<CustomUserType | CustomAuthErrorType> {
    try {
        const response = await logIn(payload.email, payload.password)
        eventLogger(events.SIGN_IN, payload)
        return response.user
    } catch (error: unknown) {
        return mapFirebaseError(error);
    }
}

export async function logOutService(): Promise<CustomAuthResponseType | CustomAuthErrorType> {
    try {
        await logOut()
        eventLogger(events.LOG_OUT, {})
        return { ok: true }
    } catch (error: unknown) {
        return mapFirebaseError(error);
    }
}

export async function verificationService(): Promise<CustomAuthResponseType | CustomAuthErrorType> {
    if (auth.currentUser === null) {
        return mapFirebaseError(new Error("User not found.")) as CustomAuthErrorType
    }
    try {
        await verifyEmalil(auth.currentUser)
        eventLogger(events.VERIFY_EMAIL, {})
        return { ok: true };
    } catch (error) {
        return mapFirebaseError(error);
    }
}

export async function updateProfileService(payload: UpdateServicePayloadType): Promise<CustomAuthResponseType | CustomAuthErrorType> {
    if (auth.currentUser === null) {
        return mapFirebaseError(new Error("User not found.")) as CustomAuthErrorType
    }
    try {
        if (payload.displayName) {
            await updateUserProfile(auth.currentUser, { displayName: payload.displayName })
            eventLogger(events.UPDATE_PROFILE, {})
        }
        if (payload.password) {
            await updateUserPassword(auth.currentUser, payload.password)
            eventLogger(events.UPDATE_PASSWORD, {})
        }
        return { ok: true }
    } catch (error) {
        return mapFirebaseError(error);
    }
}