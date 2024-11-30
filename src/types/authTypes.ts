import { FirebaseError } from "firebase/app";
import type { User } from "firebase/auth";
import type { FullMetadata } from "firebase/storage";

export type CustomAuthErrorType = FirebaseError

export type CustomAuthResponseType = {
    ok: boolean
}

export type CustomUserType = User;

export type CustomStorageResponseType = FullMetadata & {
    downloadURL: string
}

export type UserDataType = {
    userId?: string;
    email?: string;
    displayName?: string
    phoneNumber?: string
    isEmailVerified?: boolean;
    photoURL?: string | null
}

export type UserSignUpPayloadType = {
    email: string;
    password: string;
    passwordConfirm: string;
}

export type UserSignInPayloadType = {
    email: string;
    password: string;
}

export type SignUpServicePayloadType = Omit<UserSignUpPayloadType, "passwordConfirm">

export type SignInServicePayloadType = UserSignInPayloadType


export type UserUpdatePayloadType = {
    firstName?: string;
    lastName?: string;
    password?: string
    phoneNumber?: string
    displayName?: string;
    email?: string;
    photoURL?: string | null;
    confirmPassword?: string | null
    age?: number | null,
    dateOfBirth?: Date | null
}

export type UpdateServicePayloadType = {
    profile: {
        displayName?: string
        photoURL?: string
    }
    password?: string
    phoneNumber?: string;
}

export type ProfileFormFieldsType = UserUpdatePayloadType

export type UserProfileNewValue = {
    field: string;
    value: string;
}

export type UserUploadProfilePicturePayloadType = {
    file: File
}
export type UploadProfilePictureServiceType = {
    file: File;
    path: string
}