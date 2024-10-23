import { useNavigate } from "react-router-dom";
import "../../css/components/LayoutHeader.css";
import MemoizedLoader from "../MemoizedLoader";
import { ArrowLeft01Icon } from "hugeicons-react";
import MemoizedAlert from "../MemoizedAlert";
import LanguageSelector from "../LanguageSelector";

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

  const renderLanguageSelector = () => {
    return (
      <div className="languageSelectorContainer">
        <LanguageSelector />
      </div>
    );
  };

  const renderBackButton = () => {
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
  };

  return (
    <>
      <div className="layoutHeaderControlsContainer">
        {showBackButton ? renderBackButton() : null}
        {showLoadingIndicator ? <MemoizedLoader /> : null}
        {showLanguageSelector ? renderLanguageSelector() : null}
      </div>
      <MemoizedAlert />
    </>
  );
};

export default LayoutHeader;
