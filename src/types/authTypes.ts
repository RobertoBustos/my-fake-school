export type SignUpPayloadType = {
    email: string;
    password: string;
    passwordConfirm: string;
}

export type SignUpServicePayloadType = Omit<SignUpPayloadType, "passwordConfirm">

export type SignInServicePayloadType = Omit<SignUpPayloadType, "passwordConfirm">

export type CustomAuthError = {
    code: string;
    message: string;
}

export type UserInfoType = {
    userId: string;
    email: string;
    isEmailVerified: boolean;
}