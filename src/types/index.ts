import { HTMLInputTypeAttribute } from "react";

export * from "@customTypes/authTypes";
export * from "@customTypes/enums";
export * from "@customTypes/mapsTypes";
export * from "@customTypes/subjectTypes";

export type FeatureFlagType = {
    name: string;
    value: boolean | number | string
}

export type SupportedLanguageType = {
    code: string
    nativeName: string,
}

export type CustomInputType = HTMLInputTypeAttribute