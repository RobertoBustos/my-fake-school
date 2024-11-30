import LoginForm from "@components/forms/LoginForm";
import { useMemoizedTranslation } from "@hooks/useTranslation";
import Layout from "@components/common/Layout";
import FormFooter from "@components/common/FormFooter";

const LoginPage = () => {
  const { t } = useMemoizedTranslation();
  const headerProps = { showBackButton: true, showLanguageSelector: true };

  return (
    <Layout
      pageTabTitle={t("pageTabTitles.signInPage")}
      header={headerProps}
      displayAlerts={false}
    >
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
