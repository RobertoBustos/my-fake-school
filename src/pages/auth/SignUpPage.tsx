import SignUpForm from "@components/forms/SignUpForm";
import { useMemoizedTranslation } from "@hooks/useTranslation";
import Layout from "@components/common/Layout";
import FormFooter from "@components/common/FormFooter";

export const SignUpPage = () => {
  const { t } = useMemoizedTranslation();

  const headerProps = { showBackButton: true, showLanguageSelector: true };

  return (
    <Layout
      pageTabTitle={t("pageTabTitles.signUpPage")}
      header={headerProps}
      displayAlerts={false}
    >
      <SignUpForm />
      <FormFooter
        text={t("forms.user.alreadyHaveAnAccount")}
        linkText={t("forms.user.signIn")}
        linkDestinationPath={"/login"}
      />
    </Layout>
  );
};
