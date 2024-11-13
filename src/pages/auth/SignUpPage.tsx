import SignUpForm from "@components/forms/SignUpForm";
import { signUp } from "@actions/index";
import { useAppDispatch } from "@redux/hooks";
import { useMemoizedTranslation } from "@hooks/useTranslation";
import Layout2 from "@components/common/Layout2";
import AuthFormDisclaimer from "@components/common/AuthFormDisclaimer";
import AuthFormContainer from "@components/common/AuthFormContainer";

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
    <Layout2 pageTabTitle="My Fake School - Sign Up" header={headerProps}>
      <AuthFormContainer formTitle={t("pageTitles.signUp")}>
        <SignUpForm onSubmit={handleSubmit} />
      </AuthFormContainer>
      <AuthFormDisclaimer
        text={t("forms.login.alreadyHaveAnAccount")}
        linkText={t("forms.login.signIn")}
        linkDestinationPath={"/login"}
      />
    </Layout2>
  );
};
