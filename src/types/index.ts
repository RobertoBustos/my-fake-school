import { HTMLInputTypeAttribute } from "react";

export * from "./subjectTypes"
export * from "./enums"
export * from "./authTypes"

export type FeatureFlagType = {
    name: string;
    value: boolean | number | string
}

export type SupportedLanguageType = {
    code: string
    nativeName: string,
}

export type CustomInputType = HTMLInputTypeAttribute