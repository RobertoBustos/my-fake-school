import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { logIn } from "@actions/index";
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
import { emailValidations, passwordValidations } from "./formValidations";

const LoginForm = () => {
  const { t } = useMemoizedTranslation();
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isValidating, isSubmitting },
  } = useForm<UserUpdatePayloadType>({
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const isLogginIn = useAppSelector(selectAppLoader(AppLoaders.LOG_IN));

  const onSubmit = (data: UserUpdatePayloadType) => {
    dispatch(
      logIn({
        email: data.email || "",
        password: data.password || "",
      })
    );
  };

  return (
    <FormContainer formTitle={t("formTitles.signIn")}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormInput
          type="email"
          register={register}
          fieldName={FormFields.EMAIL}
          errorMessage={errors.email?.message}
          validations={emailValidations}
        />
        <FormInput
          type="password"
          register={register}
          fieldName={FormFields.PASSWORD}
          errorMessage={errors.password?.message}
          validations={passwordValidations}
        />
        <CustomButton
          buttonLabel={t("buttons.signIn.confirmLabel")}
          type="submit"
          className="w-100 mt-4"
          isLoading={isLogginIn || isValidating}
          loadingLabel={t("buttons.user.logInLabelInProgress")}
          disabled={isValidating || isSubmitting || !isValid}
        />
      </form>
    </FormContainer>
  );
};

export default LoginForm;
