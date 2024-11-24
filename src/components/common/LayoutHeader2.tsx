import LanguageSelector from "@components/LanguageSelector";
import { ArrowLeft01Icon } from "hugeicons-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

export type LayoutHeader2PropsType = {
  showBackButton?: boolean;
  showLanguageSelector?: boolean;
};

const LayoutHeader2 = ({
  showBackButton = false,
  showLanguageSelector = false,
}: LayoutHeader2PropsType) => {
  const navigate = useNavigate();

  const memoizedLanguageSelector = useMemo(() => {
    return <LanguageSelector isVisible={showLanguageSelector} />;
  }, [showLanguageSelector]);

  const memoizedBackButton = useMemo(() => {
    return window.history.state.idx > 0 ? (
      <ArrowLeft01Icon
        className="d-hidden"
        size={50}
        onClick={() => {
          navigate(-1);
        }}
      />
    ) : null;
  }, [navigate]);

  const memoizedHeader = useMemo(() => {
    return (
      <div
        className="d-flex flex-row align-items-center justify-content-between w-100 px-2"
        style={{
          minHeight: "10vh",
          backgroundColor: "lightgray",
        }}
      >
        <div className="" style={{ minWidth: "15%" }}>
          {showBackButton ? memoizedBackButton : null}
        </div>
        <div className="" style={{ minWidth: "15%" }}>
          {memoizedLanguageSelector}
        </div>
      </div>
    );
  }, [memoizedBackButton, memoizedLanguageSelector, showBackButton]);

  return memoizedHeader;
};

export default LayoutHeader2;
