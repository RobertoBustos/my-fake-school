import Layout2 from "@components/common/Layout2";
import ProfileForm from "@components/forms/ProfileForm";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { updateProfile } from "@actions/index";
import {
  selectAppLoaderStatusLoading,
  selectLoggedInUserData,
} from "@redux/selectors";
import { useMemoizedTranslation } from "@hooks/useTranslation";
import CustomButton from "@components/common/CustomButton";

export const ProfilePage = () => {
  const { t } = useMemoizedTranslation();
  const userInfo = useAppSelector(selectLoggedInUserData);
  const dispatch = useAppDispatch();
  const isAppLoading = useAppSelector(selectAppLoaderStatusLoading);

  const defaultValues = {
    password: "",
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
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
          />
        </>
      ) : null}
    </Layout2>
  );
};
