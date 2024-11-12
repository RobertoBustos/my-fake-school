export * from "./subjectTypes"
export * from "./enums"
export * from "./authTypes"

export type AlertPropsType = {
    alertId: string;
    message: string;
    type?: "danger" | "success" | "warning";
    dismisable?: boolean;
};

export type FeatureFlagType = {
    name: string;
    value: boolean | number | string
}

export type SupportedLanguageType = {
    code: string
    nativeName: string,
}