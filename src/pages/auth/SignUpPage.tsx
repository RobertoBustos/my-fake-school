import FormFooter from "@components/common/FormFooter";
import Layout from "@components/common/Layout";
import SignUpForm from "@components/forms/SignUpForm";
import { useMemoizedTranslation } from "@hooks/index";

export const SignUpPage = () => {
  const { t } = useMemoizedTranslation();

  const headerProps = { showBackButton: true, showLanguageSelector: true };

  return (
    <Layout pageTabTitle={t("pageTabTitles.signUpPage")} header={headerProps}>
      <SignUpForm />
      <FormFooter
        text={t("forms.user.alreadyHaveAnAccount")}
        linkText={t("forms.user.signIn")}
        linkDestinationPath={"/login"}
      />
    </Layout>
  );
};
