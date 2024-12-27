import { sendVerificationEmail } from "@actions/index";
import CustomButton from "@components/common/CustomButton";
import { AppLoaders } from "@customTypes/index";
import { useMemoizedTranslation } from "@hooks/index";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectAuthAppLoader, selectIsEmailVerified } from "@selectors/index";

const VerifyEmail = () => {
  const dispatch = useAppDispatch();
  const { t } = useMemoizedTranslation();
  const isEmailVerified = useAppSelector(selectIsEmailVerified);
  const isLoading = useAppSelector(
    selectAuthAppLoader(AppLoaders.SEND_EMAIL_VERIFICATION)
  );

  const handleVerifyEmail = () => {
    dispatch(sendVerificationEmail());
  };

  return isEmailVerified === false ? (
    <CustomButton
      buttonLabel={t("buttons.user.verifyLabel")}
      variant="warning"
      onClick={handleVerifyEmail}
      className="w-100 mt-4"
      isLoading={isLoading}
      loadingLabel={t("buttons.user.verifyLabelInProgress")}
    />
  ) : null;
};

export default VerifyEmail;
