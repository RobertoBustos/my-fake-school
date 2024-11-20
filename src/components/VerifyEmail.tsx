import { useMemoizedTranslation } from "@hooks/useTranslation";
import { useAppSelector } from "@redux/hooks";
import { selectIsEmailVerified } from "@selectors/index";
import CustomButton from "./common/CustomButton";

export type VerifyEmailPropsType = {
  onclickVerifyEmail: () => void;
};

const VerifyEmail = ({ onclickVerifyEmail }: VerifyEmailPropsType) => {
  const { t } = useMemoizedTranslation();
  const isEmailVerified = useAppSelector(selectIsEmailVerified);

  return isEmailVerified === false ? (
    <CustomButton
      buttonLabel={t("buttons.user.verifyLabel")}
      variant="warning"
      onClick={onclickVerifyEmail}
      className="w-100 mt-4"
    />
  ) : null;
};

export default VerifyEmail;
