import { FirebaseError } from "firebase/app";
import type { User } from "firebase/auth";

export type SignUpPayloadType = {
    email: string;
    password: string;
    passwordConfirm: string;
}

export type SignUpServicePayloadType = Omit<SignUpPayloadType, "passwordConfirm">

export type SignInServicePayloadType = Omit<SignUpPayloadType, "passwordConfirm">

export type CustomAuthErrorType = FirebaseError

export type CustomUserType = User;

export type UserInfoType = {
    userId: string;
    email: string;
    isEmailVerified: boolean;
}