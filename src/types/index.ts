export * from "./subjectTypes"

export type AlertPropsType = {
    alertId: string;
    message: string;
    type: "danger" | "success" | "warning";
    dismisable: boolean;
};

export enum ModalListType {
    EDIT_SUBJECT_MODAL = "EditSubjectModal",
    DELETE_SUBJECT_MODAL = "DeleteSubjectModal",
    ANOTHER_MODAL = "AnotherModal",
    ONE_MORE_MODAL = "OneMoreModal",
}

export type VisibleModalListType = ModalListType[];

export type FeatureFlagType = {
    name: string;
    value: boolean | number | string
}

export type SupportedLanguageType = {
    code: string
    nativeName: string,
}
export type SupportedLanguagesListType = SupportedLanguageType[]