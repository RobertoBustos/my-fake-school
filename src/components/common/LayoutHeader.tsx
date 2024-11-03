import { ArrowLeft01Icon } from "hugeicons-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AlertStack from "@components/AlertStack";
import LanguageSelector from "@components/LanguageSelector";
import LoadingSpinner from "@components/LoadingSpinner";
import "@styles/components/LayoutHeader.css";
import { useAppSelector } from "@redux/hooks";
import { selectAlerts } from "@selectors/index";

export type LayoutHeaderPropsType = {
  showBackButton?: boolean;
  showLoadingIndicator: boolean;
  showLanguageSelector: boolean;
};

const LayoutHeader = ({
  showBackButton,
  showLoadingIndicator,
  showLanguageSelector,
}: LayoutHeaderPropsType) => {
  const navigate = useNavigate();
  const alerts = useAppSelector(selectAlerts);

  const memoizedLanguageSelector = useMemo(() => {
    return (
      <div className="languageSelectorContainer">
        <LanguageSelector isVisible={showLanguageSelector} />
      </div>
    );
  }, [showLanguageSelector]);

  const memoizedBackButton = useMemo(() => {
    return (
      <div className="backButtonContainer">
        <ArrowLeft01Icon
          size={50}
          onClick={() => {
            navigate(-1);
          }}
        />
      </div>
    );
  }, [navigate]);

  const memoizedLoadingSpinner = useMemo(() => {
    return <LoadingSpinner isVisible={showLoadingIndicator} />;
  }, [showLoadingIndicator]);

  const memoizedAlertStack = useMemo(() => {
    return <AlertStack alertList={alerts} />;
  }, [alerts]);

  return (
    <div className="LayoutHeaderContainer">
      <div className="layoutHeaderControlsContainer">
        {showBackButton ? memoizedBackButton : null}
        {memoizedLoadingSpinner}
        {memoizedLanguageSelector}
      </div>
      {memoizedAlertStack}
    </div>
  );
};

export default LayoutHeader;
