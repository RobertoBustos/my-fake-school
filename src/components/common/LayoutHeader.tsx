import LanguageSelector from "@components/LanguageSelector";
import "@styles/components/common/Layout.css";
import { ArrowLeft01Icon } from "hugeicons-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

export type LayoutHeaderPropsType = {
  showBackButton?: boolean;
  showLanguageSelector?: boolean;
  className?: string;
};

const LayoutHeader = ({
  showBackButton = false,
  showLanguageSelector = false,
  className,
}: LayoutHeaderPropsType) => {
  const navigate = useNavigate();

  const memoizedLanguageSelector = useMemo(() => {
    return <LanguageSelector isVisible={showLanguageSelector} />;
  }, [showLanguageSelector]);

  const memoizedBackButton = useMemo(() => {
    const backArrowDimentions = {
      height: 2,
      width: 0,
      marginLeft: 0,
    };
    backArrowDimentions.width = backArrowDimentions.height / 2;
    backArrowDimentions.marginLeft = -backArrowDimentions.width / 3;

    return window.history.state.idx !== 0 ? (
      <ArrowLeft01Icon
        style={{
          marginLeft: `-1rem`,
        }}
        size={50}
        onClick={() => {
          navigate(-1);
        }}
      />
    ) : null;
  }, [navigate]);

  const memoizedHeader = useMemo(() => {
    return (
      <div className={className}>
        <div>{showBackButton ? memoizedBackButton : null}</div>
        <div>{memoizedLanguageSelector}</div>
      </div>
    );
  }, [className, memoizedBackButton, memoizedLanguageSelector, showBackButton]);

  return memoizedHeader;
};

export default LayoutHeader;
