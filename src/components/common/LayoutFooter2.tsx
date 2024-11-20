import CustomButton from "@components/common/CustomButton";

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
  return (
    <div
      className="d-flex flex-row align-items-center justify-content-center px-2 w-100"
      style={{
        minHeight: "8vh",
        backgroundColor: "lightgray",
      }}
    >
      {buttonLabel && handleClick ? (
        <CustomButton
          disabled={buttonDisabled}
          className="w-75"
          onClick={handleClick}
          buttonLabel={buttonLabel}
        />
      ) : null}
    </div>
  );
};

export default LayoutFooter2;
