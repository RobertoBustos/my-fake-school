import SignUpForm from "@components/forms/SignUpForm";
import { signUp } from "@actions/index";
import { useAppDispatch } from "@redux/hooks";
import { useMemoizedTranslation } from "@hooks/useTranslation";
import Layout2 from "@components/common/Layout2";
import FormFooter from "@components/common/FormFooter";
import FormContainer from "@components/common/FormContainer";

export const SignUpPage = () => {
  const { t } = useMemoizedTranslation();
  const dispatch = useAppDispatch();

  const handleSubmit = (
    email: string,
    password: string,
    passwordConfirm: string
  ) => {
    dispatch(
      signUp({
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
      })
    );
  };

  const headerProps = { showBackButton: true, showLanguageSelector: true };

  return (
    <Layout2 pageTabTitle={t("pageTabTitles.signUpPage")} header={headerProps}>
      <FormContainer formTitle={t("formTitles.signUp")}>
        <SignUpForm onSubmit={handleSubmit} />
      </FormContainer>
      <FormFooter
        text={t("forms.login.alreadyHaveAnAccount")}
        linkText={t("forms.login.signIn")}
        linkDestinationPath={"/login"}
      />
    </Layout2>
  );
};
