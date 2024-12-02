import { auth, createFileRef, deleteFile, getFileDownloadURL, logIn, logOut, reauthenticateUser, signUp, updateUserPassword, updateUserProfile, uploadFile, verifyEmalil } from "@config/index";
import type { CustomAuthErrorType, CustomAuthResponseType, CustomStorageResponseType, CustomUserType, SignInServicePayloadType, SignUpServicePayloadType, UpdateServicePayloadType, UploadProfilePictureServiceType } from "@customTypes/index";
import { eventLogger, events, fakeEmailValidator, mapFirebaseError } from "@utils/index";
import { FirebaseError } from "firebase/app";

export async function signUpService(payload: SignUpServicePayloadType): Promise<CustomUserType | CustomAuthErrorType> {
    try {
        const emailValidationResponse = await fakeEmailValidator(payload.email);
        if (emailValidationResponse) {
            throw new FirebaseError("auth/email-already-in-use", "")
        }
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
        if (payload.profile) {
            await updateUserProfile(auth.currentUser, { ...payload.profile })
            eventLogger(events.UPDATE_PROFILE, {})
        }
        if (payload.password) {
            await reauthenticateUser(payload.password.currentPassword!)
            await updateUserPassword(auth.currentUser, payload.password.newPassword!)
            eventLogger(events.UPDATE_PASSWORD, {})
        }
        return { ok: true }
    } catch (error) {
        return mapFirebaseError(error);
    }
}

export async function uploadProfilePictureService(payload: UploadProfilePictureServiceType): Promise<CustomStorageResponseType | CustomAuthErrorType> {
    try {
        const fileRef = createFileRef(payload.path)
        const response = await uploadFile(payload.file, fileRef);
        const downloadURL = await getFileDownloadURL(fileRef)
        eventLogger(events.UPLOAD_PROFILE_PICTURE, {})
        return { ...response.metadata, downloadURL }
    } catch (error) {
        return mapFirebaseError(error);
    }
}

export async function deleteProfilePictureUnsavedService(payload: string): Promise<CustomAuthResponseType | CustomAuthErrorType> {
    try {
        const fileRef = createFileRef(payload)
        await deleteFile(fileRef)
        return { ok: true }
    } catch (error) {
        return mapFirebaseError(error);
    }
}

export async function validateCredentials(password: string): Promise<CustomAuthResponseType | CustomAuthErrorType> {
    try {
        await reauthenticateUser(password)
        return { ok: true }
    } catch (error) {
        return mapFirebaseError(error);
    }
}