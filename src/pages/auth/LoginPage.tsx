import LoginForm from "@components/forms/LoginForm";
import { logIn } from "@actions/index";
import { useAppDispatch } from "@redux/hooks";
import { useMemoizedTranslation } from "@hooks/useTranslation";
import Layout from "@components/common/Layout";
import FormFooter from "@components/common/FormFooter";
import FormContainer from "@components/common/FormContainer";

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

  return (
    <Layout pageTabTitle={t("pageTabTitles.signInPage")} header={headerProps}>
      <FormContainer formTitle={t("formTitles.signIn")}>
        <LoginForm onSubmit={handleSubmit} />
      </FormContainer>
      <FormFooter
        text={t("forms.login.needAnAccount")}
        linkText={t("forms.login.signUp")}
        linkDestinationPath={"/signup"}
      />
    </Layout>
  );
};

export default LoginPage;
