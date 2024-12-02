import { signUp } from "@actions/index";
import CustomButton from "@components/common/CustomButton";
import FormContainer from "@components/common/FormContainer";
import FormInput from "@components/common/FormInput";
import {
  confirmPasswordValidations,
  emailNotExistingValidations,
  passwordValidations,
} from "@components/forms/formValidations";
import {
  AppLoaders,
  FormFields,
  UserUpdatePayloadType,
} from "@customTypes/index";
import { useMemoizedTranslation } from "@hooks/index";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectAppLoader } from "@selectors/index";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const { t } = useMemoizedTranslation();
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isDirty },
    getValues,
  } = useForm<UserUpdatePayloadType>({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const isSigningUp = useAppSelector(selectAppLoader(AppLoaders.SIGN_UP));

  const onSubmit = async (data: UserUpdatePayloadType) => {
    dispatch(
      signUp({
        email: data.email || "",
        password: data.password || "",
        passwordConfirm: data.confirmPassword || "",
      })
    );
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
          validations={confirmPasswordValidations(
            getValues(FormFields.PASSWORD) || ""
          )}
        />
        <CustomButton
          buttonLabel={t("buttons.signUp.confirmLabel")}
          type="submit"
          className="w-100 mt-4"
          isLoading={isSigningUp}
          loadingLabel={t("buttons.user.signUpLabelInProgress")}
          disabled={!isValid || !isDirty}
        />
      </form>
    </FormContainer>
  );
};

export default LoginForm;
