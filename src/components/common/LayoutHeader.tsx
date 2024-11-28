import LanguageSelector from "@components/LanguageSelector";
import { ArrowLeft01Icon } from "hugeicons-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "@styles/components/common/Layout.css";

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

    return window ? (
      <ArrowLeft01Icon
        style={{
          maxHeight: `${backArrowDimentions.height}rem`, //this is the main value, the min height of the header class must be higher
          width: `${backArrowDimentions.width}rem`, //the width of the arrow is half its height
          marginLeft: `${backArrowDimentions.marginLeft}rem`, // the marginLeft is one third of its width
          color: "black",
        }}
        size={100}
        onClick={() => {
          navigate(-1);
        }}
      />
    ) : null;
  }, [navigate]);

  const memoizedHeader = useMemo(() => {
    return (
      <div className={className}>
        <div className="headerleft">
          {showBackButton ? memoizedBackButton : null}
        </div>
        <div className="headerright">{memoizedLanguageSelector}</div>
      </div>
    );
  }, [className, memoizedBackButton, memoizedLanguageSelector, showBackButton]);

  return memoizedHeader;
};

export default LayoutHeader;
