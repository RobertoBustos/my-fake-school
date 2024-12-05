import { HTMLInputTypeAttribute } from "react";

export * from "./authTypes";
export * from "./enums";
export * from "./subjectTypes";

export type FeatureFlagType = {
    name: string;
    value: boolean | number | string
}

export type SupportedLanguageType = {
    code: string
    nativeName: string,
}

export type CustomInputType = HTMLInputTypeAttribute