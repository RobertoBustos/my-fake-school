import { useNavigate } from "react-router-dom";
import "../../css/components/LayoutHeader.css";
import LoadingSpinner from "../LoadingSpinner";
import { ArrowLeft01Icon } from "hugeicons-react";
import AlertStack from "../AlertStack";
import LanguageSelector from "../LanguageSelector";
import { useMemo } from "react";

export type LayoutHeaderPropsType = {
  showBackButton?: boolean;
  showLoadingIndicator?: boolean;
  showLanguageSelector?: boolean;
};

const LayoutHeader = ({
  showBackButton,
  showLoadingIndicator,
  showLanguageSelector,
}: LayoutHeaderPropsType) => {
  const navigate = useNavigate();

  const renderLanguageSelector = useMemo(() => {
    return (
      <div className="languageSelectorContainer">
        <LanguageSelector />
      </div>
    );
  }, []);

  const renderBackButton = useMemo(() => {
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

  const renderLoadingSpinner = useMemo(() => {
    return <LoadingSpinner />;
  }, []);

  return (
    <div className="LayoutHeaderContainer">
      <div className="layoutHeaderControlsContainer">
        {showBackButton ? renderBackButton : null}
        {showLoadingIndicator ? renderLoadingSpinner : null}
        {showLanguageSelector ? renderLanguageSelector : null}
      </div>
      <AlertStack />
    </div>
  );
};

export default LayoutHeader;
