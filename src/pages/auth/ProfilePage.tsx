import { updateProfile } from "@actions/index";
import LogoutButton from "@components/LogoutButton";
import CustomButton from "@components/common/CustomButton";
import CustomSwitchButton from "@components/common/CustomSwitchButton";
import Layout from "@components/common/Layout";
import ReduxProfileForm from "@components/forms/ProfileForm";
import HooksProfileForm from "@components/forms/ProfileForm2";
import { AppLoaders } from "@customTypes/index";
import { useMemoizedTranslation, useWindowDimensions } from "@hooks/index";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectAuthAppLoader, selectIsProfileEdited } from "@selectors/index";
import "@styles/pages/ProfilePage.css";
import { useRef, useState } from "react";

export const ProfilePage = () => {
  const { t } = useMemoizedTranslation();
  const dispatch = useAppDispatch();
  const isProfileEdited = useAppSelector(selectIsProfileEdited);
  const isEditing = useAppSelector(
    selectAuthAppLoader(AppLoaders.UPDATE_PROFILE)
  );
  const { isMobile } = useWindowDimensions();
  const [reduxMode, setReduxMode] = useState<boolean>(true);
  const formRef = useRef<HTMLFormElement>(null);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = () => {
    if (reduxMode) {
      return dispatch(updateProfile());
    }
    return formRef.current?.submitForm();
  };

  const headerProps = {
    showBackButton: true,
    showLanguageSelector: true,
  };

  const renderButtons = () => {
    return (
      <div className="buttons">
        {reduxMode ? (
          <CustomButton
            buttonLabel={t("buttons.user.saveChangesLabel")}
            onClick={handleSubmit}
            disabled={!isProfileEdited}
            className="button"
            isLoading={isEditing}
            loadingLabel={t("buttons.user.saveChangesInProgress")}
          />
        ) : (
          <CustomButton
            buttonLabel={t("buttons.user.saveChangesLabel")}
            onClick={handleSubmit}
            className="button"
            isLoading={isLoading}
            loadingLabel={t("buttons.user.saveChangesInProgress")}
            disabled={!isValid}
          />
        )}
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
      <>
        <CustomSwitchButton
          label={reduxMode ? "Redux" : "Hooks"}
          onClick={() => setReduxMode(!reduxMode)}
        />
        {reduxMode ? (
          <ReduxProfileForm />
        ) : (
          <HooksProfileForm
            ref={formRef}
            onIsValidChange={setIsValid}
            onIsLoadingChange={setIsLoading}
          />
        )}
        {renderDesktopButtons}
      </>
    </Layout>
  );
};
