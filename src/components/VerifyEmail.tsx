import { useMemoizedTranslation } from "@hooks/useTranslation";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectIsEmailVerified } from "@selectors/index";
import CustomButton from "./common/CustomButton";
import { sendVerificationEmail } from "@actions/index";

const VerifyEmail = () => {
  const dispatch = useAppDispatch();
  const { t } = useMemoizedTranslation();
  const isEmailVerified = useAppSelector(selectIsEmailVerified);

  const handleVerifyEmail = () => {
    dispatch(sendVerificationEmail());
  };

  return isEmailVerified === false ? (
    <CustomButton
      buttonLabel={t("buttons.user.verifyLabel")}
      variant="warning"
      onClick={handleVerifyEmail}
      className="w-100 mt-4"
    />
  ) : null;
};

export default VerifyEmail;
