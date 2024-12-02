import { updateProfile } from "@actions/index";
import LogoutButton from "@components/LogoutButton";
import CustomButton from "@components/common/CustomButton";
import Layout from "@components/common/Layout";
import ProfileForm from "@components/forms/ProfileForm";
import { AppLoaders } from "@customTypes/index";
import { useMemoizedTranslation, useWindowDimensions } from "@hooks/index";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  selectAppLoader,
  selectAppLoaderStatusLoading,
  selectIsProfileEdited,
  selectLoggedInUserData,
} from "@selectors/index";
import "@styles/pages/ProfilePage.css";

export const ProfilePage = () => {
  const { t } = useMemoizedTranslation();
  const userInfo = useAppSelector(selectLoggedInUserData);
  const dispatch = useAppDispatch();
  const isAppLoading = useAppSelector(selectAppLoaderStatusLoading);
  const isProfileEdited = useAppSelector(selectIsProfileEdited);
  const isEditing = useAppSelector(selectAppLoader(AppLoaders.UPDATE_PROFILE));
  const { isMobile } = useWindowDimensions();

  const defaultValues = {
    email: userInfo.email || "",
    firstName: userInfo.displayName?.split(",")[1] || "",
    lastName: userInfo.displayName?.split(",")[0] || "",
    newPassword: "",
    confirmNewPassword: "",
    phoneNumber: userInfo.phoneNumber,
    photoURL: userInfo.photoURL,
  };

  const handleSubmit = () => {
    dispatch(updateProfile());
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
          disabled={!isProfileEdited}
          className="button"
          isLoading={isEditing}
          loadingLabel={t("buttons.user.saveChangesInProgress")}
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
      {!isAppLoading ? (
        <>
          <ProfileForm defaultValues={defaultValues} />
          {renderDesktopButtons}
        </>
      ) : null}
    </Layout>
  );
};
