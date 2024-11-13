import LoginForm from "@components/forms/LoginForm";
import { logIn } from "@actions/index";
import { useAppDispatch } from "@redux/hooks";
import { useMemoizedTranslation } from "@hooks/useTranslation";
import Layout2 from "@components/common/Layout2";
import AuthFormDisclaimer from "@components/common/AuthFormDisclaimer";
import AuthFormContainer from "@components/common/AuthFormContainer";
import type { LayoutFooter2PropsType } from "@components/common/LayoutFooter2";

const LoginPage = () => {
  const { t } = useMemoizedTranslation();
  const dispatch = useAppDispatch();

  const handleSubmit = (email: string, password: string) => {
    dispatch(
      logIn({
        email: email,
        password: password,
      })
    );
  };

  const headerProps = { showBackButton: true, showLanguageSelector: true };
  const footerProps: LayoutFooter2PropsType = {};

  return (
    <Layout2
      pageTabTitle="My Fake School - Log In"
      header={headerProps}
      footer={footerProps}
    >
      <AuthFormContainer formTitle={t("pageTitles.signIn")}>
        <LoginForm onSubmit={handleSubmit} />
      </AuthFormContainer>
      <AuthFormDisclaimer
        text={t("forms.login.needAnAccount")}
        linkText={t("forms.login.signUp")}
        linkDestinationPath={"/signup"}
      />
    </Layout2>
  );
};

export default LoginPage;
