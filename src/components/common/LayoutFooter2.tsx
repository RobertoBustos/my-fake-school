import { Button } from "react-bootstrap";

export type LayoutFooter2PropsType = {
  buttonLabel?: string;
  handleClick?: () => void;
};

const LayoutFooter2 = ({
  buttonLabel,
  handleClick,
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
        <Button disabled={false} className="w-75" onClick={handleClick}>
          {buttonLabel}
        </Button>
      ) : null}
    </div>
  );
};

export default LayoutFooter2;
