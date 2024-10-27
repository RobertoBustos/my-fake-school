import { ArrowLeft01Icon } from "hugeicons-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AlertStack from "@components/AlertStack";
import LanguageSelector from "@components/LanguageSelector";
import LoadingSpinner from "@components/LoadingSpinner";
import { useAppSelector } from "@redux/hooks";
import { selectFeatureFlag } from "@selectors/index";
import "@styles/components/LayoutHeader.css";

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
  const showMultiLanguage = useAppSelector(
    selectFeatureFlag("enableMultiLanguage")
  );

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
        {showMultiLanguage?.value && showLanguageSelector
          ? renderLanguageSelector
          : null}
      </div>
      <AlertStack />
    </div>
  );
};

export default LayoutHeader;
