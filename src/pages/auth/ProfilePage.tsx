import Layout2 from "@components/common/Layout2";
import ProfileForm from "@components/forms/ProfileForm";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { updateProfile } from "@actions/index";
import {
  selectAppLoader,
  selectAppLoaderStatusLoading,
  selectIsProfileEdited,
  selectLoggedInUserData,
} from "@selectors/index";
import { useMemoizedTranslation } from "@hooks/useTranslation";
import CustomButton from "@components/common/CustomButton";
import { AppLoaders } from "@customTypes/enums";
import LogoutButton from "@components/LogoutButton";

export const ProfilePage = () => {
  const { t } = useMemoizedTranslation();
  const userInfo = useAppSelector(selectLoggedInUserData);
  const dispatch = useAppDispatch();
  const isAppLoading = useAppSelector(selectAppLoaderStatusLoading);
  const isProfileEdited = useAppSelector(selectIsProfileEdited);
  const isEditing = useAppSelector(selectAppLoader(AppLoaders.UPDATE_PROFILE));

  const defaultValues = {
    email: userInfo.email || "",
    password: "",
    firstName: userInfo.displayName?.split(",")[1] || "",
    lastName: userInfo.displayName?.split(",")[0] || "",
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

  return (
    <Layout2 header={headerProps} pageTabTitle={t("pageTabTitles.profilePage")}>
      {!isAppLoading ? (
        <>
          <ProfileForm defaultValues={defaultValues} />
          <div className="w-100 mt-3">
            <CustomButton
              buttonLabel={t("buttons.user.saveChangesLabel")}
              onClick={handleSubmit}
              disabled={!isProfileEdited}
              className="w-50"
              isLoading={isEditing}
              loadingLabel={t("buttons.user.saveChangesInProgress")}
            />
            <LogoutButton className="w-50" />
          </div>
        </>
      ) : null}
    </Layout2>
  );
};
