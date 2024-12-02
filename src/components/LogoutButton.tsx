import { clearUserUpdateData, logOut } from "@actions/index";
import CustomButton from "@components/common/CustomButton";
import { AppLoaders } from "@customTypes/index";
import { useMemoizedTranslation } from "@hooks/index";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectAppLoader, selectIsProfileEdited } from "@selectors/index";
import { CSSProperties } from "react";

export type LogoutButtonPropsType = {
  className?: string;
  style?: CSSProperties;
};

const LogoutButton = ({
  className = "w-100",
  style,
}: LogoutButtonPropsType) => {
  const dispatch = useAppDispatch();
  const { t } = useMemoizedTranslation();
  const isProfileEdited = useAppSelector(selectIsProfileEdited);
  const isLoggingOut = useAppSelector(selectAppLoader(AppLoaders.LOG_OUT));

  const handleLogOut = () => {
    if (isProfileEdited) {
      dispatch(clearUserUpdateData());
    }
    dispatch(logOut());
  };

  return (
    <CustomButton
      buttonLabel={t("buttons.user.logOutLabel")}
      onClick={handleLogOut}
      variant="danger"
      className={className}
      isLoading={isLoggingOut}
      loadingLabel={t("buttons.user.logOutLabelInProgress")}
      style={style}
    />
  );
};

export default LogoutButton;
