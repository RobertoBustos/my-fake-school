import { FirebaseError } from "firebase/app";
import type { User } from "firebase/auth";

export type CustomAuthErrorType = FirebaseError

export type CustomAuthResponseType = {
    ok: boolean
}

export type CustomUserType = User;

export type UserDataType = {
    userId?: string;
    email?: string;
    displayName?: string
    phoneNumber?: string
    isEmailVerified?: boolean;
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
}

export type UpdateServicePayloadType = {
    displayName?: string
    phoneNumber?: string;
    password?: string
}

export type ProfileFormFieldsType = UserUpdatePayloadType

export type UserProfileNewValue = {
    field: string;
    value: string;
}

export type UpdatePayloadType = {

}