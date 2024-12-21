import FormFooter from "@components/common/FormFooter";
import Layout from "@components/common/Layout";
import LoginForm from "@components/forms/LoginForm";
import { useMemoizedTranslation } from "@hooks/index";

const LoginPage = () => {
  const { t } = useMemoizedTranslation();
  const headerProps = { showBackButton: true, showLanguageSelector: true };

  return (
    <Layout pageTabTitle={t("pageTabTitles.signInPage")} header={headerProps}>
      <LoginForm />
      <FormFooter
        text={t("forms.user.needAnAccount")}
        linkText={t("forms.user.signUp")}
        linkDestinationPath={"/signup"}
      />
    </Layout>
  );
};

export default LoginPage;
