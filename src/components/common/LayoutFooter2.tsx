import CustomButton from "@components/common/CustomButton";
import { useMemo } from "react";

export type LayoutFooter2PropsType = {
  buttonLabel?: string;
  handleClick?: () => void;
  buttonDisabled?: boolean;
};

const LayoutFooter2 = ({
  buttonLabel,
  handleClick,
  buttonDisabled = false,
}: LayoutFooter2PropsType) => {
  const memoizedButton = useMemo(() => {
    return buttonLabel && handleClick ? (
      <CustomButton
        disabled={buttonDisabled}
        className="w-75"
        onClick={handleClick}
        buttonLabel={buttonLabel}
      />
    ) : null;
  }, [buttonDisabled, buttonLabel, handleClick]);

  const memoizedFooter = useMemo(() => {
    return (
      <div
        className="d-flex flex-row align-items-center justify-content-center px-2 w-100"
        style={{
          minHeight: "7vh",
          backgroundColor: "lightgray",
        }}
      >
        {memoizedButton}
      </div>
    );
  }, [memoizedButton]);

  return memoizedFooter;
};

export default LayoutFooter2;
