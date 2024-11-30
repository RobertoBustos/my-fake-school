import i18n from "@config/i18next";
import { EMAIL_REGEX, PHONE_REGEX } from "@constants/index";
import { fakeDelayPromise, fakeEmailValidator } from "@utils/index";
import { FieldValues, RegisterOptions } from "react-hook-form";

const emailValidations: RegisterOptions<FieldValues> = {
    required: {
        value: true,
        message: i18n.t("errors.forms.emailRequired"),
    },
    pattern: {
        value: EMAIL_REGEX,
        message: i18n.t("errors.forms.invalidEmailFormat"),
    },

};

const emailNotExistingValidations: RegisterOptions<FieldValues> = {
    required: {
        value: true,
        message: i18n.t("errors.forms.emailRequired"),
    },
    pattern: {
        value: EMAIL_REGEX,
        message: i18n.t("errors.forms.invalidEmailFormat"),
    },
    validate: {
        emailAvailable: async (fieldValue: string) => {
            const alreadyExist = await fakeDelayPromise(
                fakeEmailValidator(fieldValue),
                5000
            );
            return alreadyExist || i18n.t("errors.auth.emailalreadyinuse");
        },
    },
};

const nameValidations: RegisterOptions<FieldValues> = {
    required: {
        value: true,
        message: i18n.t("errors.forms.firstNameRequired"),
    },
};

const passwordValidations: RegisterOptions<FieldValues> = {
    required: {
        value: true,
        message: i18n.t("errors.forms.passwordRequired"),
    },
    minLength: {
        value: 4,
        message: i18n.t("errors.forms.passwordLength", { characters: 4 })
    }
};

const phoneNumberValidations: RegisterOptions<FieldValues> = {
    required: {
        value: true,
        message: i18n.t("errors.forms.phoneRequired"),
    },
    pattern: {
        value: PHONE_REGEX,
        message: i18n.t("errors.forms.invailidPhoneFormat"),
    },
};

const ageValidations: RegisterOptions<FieldValues> = {
    valueAsNumber: true,
    required: {
        value: true,
        message: i18n.t("errors.forms.ageRequired")
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
        message: "Date of birth required."
    }
}

export { emailValidations, emailNotExistingValidations, nameValidations, passwordValidations, phoneNumberValidations, ageValidations, dobValidations }