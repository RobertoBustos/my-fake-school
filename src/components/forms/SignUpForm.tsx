import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { signUp } from "@actions/index";
import CustomButton from "@components/common/CustomButton";
import { useMemoizedTranslation } from "@hooks/useTranslation";
import { selectAppLoader } from "@selectors/index";
import {
  AppLoaders,
  FormFields,
  UserUpdatePayloadType,
} from "@customTypes/index";
import FormContainer from "@components/common/FormContainer";
import FormInput from "@components/common/FormInput";
import {
  emailNotExistingValidations,
  passwordValidations,
} from "./formValidations";

const LoginForm = () => {
  const { t } = useMemoizedTranslation();
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isValidating, isSubmitting, isDirty },
    control,
    getValues,
  } = useForm<UserUpdatePayloadType>({
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const isLogginIn = useAppSelector(selectAppLoader(AppLoaders.LOG_IN));

  const onSubmit = (data: UserUpdatePayloadType) => {
    dispatch(
      signUp({
        email: data.email || "",
        password: data.password || "",
        passwordConfirm: data.confirmPassword || "",
      })
    );
  };

  const confirmPasswordValidations = {
    required: {
      value: true,
      message: t("errors.forms.passwordConfirmationRequired"),
    },
    validate: {
      passwordMatch: (fieldValue: string) => {
        return (
          fieldValue === getValues(FormFields.PASSWORD) ||
          t("errors.auth.passwordsNotMatch")
        );
      },
    },
  };

  return (
    <FormContainer formTitle={t("formTitles.signUp")}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormInput
          type="email"
          register={register}
          fieldName={FormFields.EMAIL}
          errorMessage={errors.email?.message}
          validations={emailNotExistingValidations}
        />
        <FormInput
          type="password"
          register={register}
          fieldName={FormFields.PASSWORD}
          errorMessage={errors.password?.message}
          validations={passwordValidations}
        />
        <FormInput
          type="password"
          register={register}
          fieldName={FormFields.CONFIRM_PASSWORD}
          errorMessage={errors.confirmPassword?.message}
          validations={confirmPasswordValidations}
        />
        <CustomButton
          buttonLabel={t("buttons.signIn.confirmLabel")}
          type="button"
          className="w-100 mt-4"
          isLoading={isLogginIn}
          loadingLabel={t("buttons.user.logInLabelInProgress")}
          disabled={isValidating || !isValid || isSubmitting || !isDirty}
        />
        <DevTool control={control} />
      </form>
    </FormContainer>
  );
};

export default LoginForm;
