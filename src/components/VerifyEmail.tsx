import { useMemoizedTranslation } from "@hooks/useTranslation";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectAppLoader, selectIsEmailVerified } from "@selectors/index";
import CustomButton from "./common/CustomButton";
import { sendVerificationEmail } from "@actions/index";
import { AppLoaders } from "@customTypes/enums";

const VerifyEmail = () => {
  const dispatch = useAppDispatch();
  const { t } = useMemoizedTranslation();
  const isEmailVerified = useAppSelector(selectIsEmailVerified);
  const isLoading = useAppSelector(
    selectAppLoader(AppLoaders.SEND_EMAIL_VERIFICATION)
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
