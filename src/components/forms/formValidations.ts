import i18n from "@config/i18next";
import { EMAIL_REGEX, MAX_PROFILE_PICTURE_FILE_SIZE, PHONE_REGEX, VALID_IMAGE_FILE_TYPES } from "@constants/index";
import { FieldValues, RegisterOptions } from "react-hook-form";

const emailValidations: RegisterOptions<FieldValues> = {
    required: {
        value: true,
        message: i18n.t("errors.forms.isRequired", { field: i18n.t("forms.user.email") }),
    },
    pattern: {
        value: EMAIL_REGEX,
        message: i18n.t("errors.forms.invalidEmailFormat"),
    },

};

const emailNotExistingValidations: RegisterOptions<FieldValues> = {
    required: {
        value: true,
        message: i18n.t("errors.forms.isRequired", { field: i18n.t("forms.user.email") }),
    },
    pattern: {
        value: EMAIL_REGEX,
        message: i18n.t("errors.forms.invalidEmailFormat"),
    },
};

const nameValidations: RegisterOptions<FieldValues> = {
    required: {
        value: true,
        message: i18n.t("errors.forms.isRequired", { field: i18n.t("forms.user.firstName") }),
    },
    minLength: {
        value: 5,
        message: i18n.t("errors.forms.minLength", { field: i18n.t("forms.user.firstName"), characters: 5 })
    },
};

const passwordValidations: RegisterOptions<FieldValues> = {
    required: {
        value: true,
        message: i18n.t("errors.forms.isRequired", { field: i18n.t("forms.user.password") }),
    },
    minLength: {
        value: 6,
        message: i18n.t("errors.forms.minLength", { field: i18n.t("forms.user.password"), characters: 6 })
    }
};

const newPasswordValidations: RegisterOptions<FieldValues> = {
    minLength: {
        value: 6,
        message: i18n.t("errors.forms.minLength", { field: i18n.t("forms.user.newPassword"), characters: 6 })
    }
};

const confirmNewPasswordValidations: RegisterOptions<FieldValues> = {
    required: {
        value: true,
        message: i18n.t("errors.forms.confirmationRequired")
    }
}

const confirmPasswordValidations = (value: string | null) => {
    return {
        required: {
            value: true,
            message: i18n.t("errors.forms.confirmationRequired"),
        },
        validate: {
            passwordMatch: (fieldValue: string) => {
                return (
                    fieldValue === value ||
                    i18n.t("errors.auth.passwordsNotMatch")
                );
            },
        },
    };
}

const phoneNumberValidations: RegisterOptions<FieldValues> = {
    pattern: {
        value: PHONE_REGEX,
        message: i18n.t("errors.forms.invailidPhoneFormat"),
    },
};

const ageValidations: RegisterOptions<FieldValues> = {
    valueAsNumber: true,
    required: {
        value: true,
        message: i18n.t("errors.forms.isRequired", { field: i18n.t("forms.user.age") })
    },
    min: {
        value: 10,
        message: i18n.t("errors.forms.ageRange", { minAge: 10, maxAge: 99 })
    },
    max: {
        value: 99,
        message: i18n.t("errors.forms.ageRange", { minAge: 10, maxAge: 99 })
    }
}

const dobValidations: RegisterOptions<FieldValues> = {
    valueAsDate: true,
    required: {
        value: true,
        message: i18n.t("errors.forms.isRequired", { field: i18n.t("forms.user.dateOfBirth") })
    },
}

const profilePictureValidtion = (file: File) => {
    if (!VALID_IMAGE_FILE_TYPES.includes(file.type)) {
        return { result: false, message: i18n.t("errors.forms.fileFormatNotSupported") }
    }
    if ((file.size / 1024) > MAX_PROFILE_PICTURE_FILE_SIZE) {
        return { result: false, message: i18n.t("errors.forms.fileSizeExceeded", { maxSize: "5MB" }) }
    }
    return { result: true }
}

export { emailValidations, emailNotExistingValidations, nameValidations, confirmPasswordValidations, passwordValidations, newPasswordValidations, phoneNumberValidations, ageValidations, dobValidations, confirmNewPasswordValidations, profilePictureValidtion }