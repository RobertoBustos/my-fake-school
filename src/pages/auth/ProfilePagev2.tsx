import Layout from "@components/common/Layout";
import ProfileForm from "@components/forms/ProfileForm2";
import { useMemoizedTranslation } from "@hooks/useTranslation";
import CustomButton from "@components/common/CustomButton";
import LogoutButton from "@components/LogoutButton";
import useWindowDimensions from "@hooks/useWindowDimensions";
import "@styles/pages/ProfilePage.css";
import { useRef, useState } from "react";

export const ProfilePage = () => {
  const { t } = useMemoizedTranslation();
  const { isMobile } = useWindowDimensions();
  const formRef = useRef<HTMLFormElement>(null);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = () => {
    formRef.current?.submitForm();
  };

  const headerProps = {
    showBackButton: true,
    showLanguageSelector: true,
  };

  const renderButtons = () => {
    return (
      <div className="buttons">
        <CustomButton
          buttonLabel={t("buttons.user.saveChangesLabel")}
          onClick={handleSubmit}
          className="button"
          isLoading={isLoading}
          loadingLabel={t("buttons.user.saveChangesInProgress")}
          disabled={!isValid}
        />
        <LogoutButton className="button" />
      </div>
    );
  };

  const renderMobileButtons = isMobile ? renderButtons() : undefined;
  const renderDesktopButtons = !isMobile ? renderButtons() : undefined;

  return (
    <Layout
      header={headerProps}
      footer={{ button: renderMobileButtons }}
      pageTabTitle={t("pageTabTitles.profilePage")}
    >
      <ProfileForm
        reference={formRef}
        onIsValidChange={setIsValid}
        onIsLoadingChange={setIsLoading}
      />
      {renderDesktopButtons}
    </Layout>
  );
};
