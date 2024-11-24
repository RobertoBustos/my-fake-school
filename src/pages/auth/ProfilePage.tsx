import Layout2 from "@components/common/Layout2";
import ProfileForm from "@components/forms/ProfileForm";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { updateProfile } from "@actions/index";
import {
  selectAppLoaderStatusLoading,
  selectIsProfileEdited,
  selectLoggedInUserData,
} from "@selectors/index";
import { useMemoizedTranslation } from "@hooks/useTranslation";
import CustomButton from "@components/common/CustomButton";

export const ProfilePage = () => {
  const { t } = useMemoizedTranslation();
  const userInfo = useAppSelector(selectLoggedInUserData);
  const dispatch = useAppDispatch();
  const isAppLoading = useAppSelector(selectAppLoaderStatusLoading);
  const isProfileEdited = useAppSelector(selectIsProfileEdited);

  const defaultValues = {
    password: "",
    firstName: userInfo.displayName?.split(",")[1],
    lastName: userInfo.displayName?.split(",")[0],
    phoneNumber: userInfo.phoneNumber,
  };

  const handleSubmit = () => {
    dispatch(updateProfile());
  };

  const headerProps = {
    showBackButton: true,
    showLanguageSelector: true,
  };

  const footerProps = {
    buttonLabel: t("buttons.user.confirmEditLabel"),
    handleClick: handleSubmit,
    buttonDisabled: !isProfileEdited,
  };

  return (
    <Layout2
      header={headerProps}
      footer={footerProps}
      pageTabTitle={t("pageTabTitles.profilePage")}
    >
      {!isAppLoading ? (
        <>
          <ProfileForm defaultValues={defaultValues} />
          <CustomButton
            buttonLabel={t("buttons.user.confirmEditLabel")}
            onClick={handleSubmit}
            className="w-100 mt-3"
            disabled={!isProfileEdited}
          />
        </>
      ) : null}
    </Layout2>
  );
};
