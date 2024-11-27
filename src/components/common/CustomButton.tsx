import { CSSProperties } from "react";
import { Button, Spinner } from "react-bootstrap";

export type CustomButtonPropsType = {
  buttonLabel: string;
  onClick?: () => void;
  variant?: string;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  loadingLabel?: string;
  type?: "button" | "submit" | "reset";
  style?: CSSProperties;
};

const CustomButton = ({
  buttonLabel,
  onClick,
  variant = "primary",
  className = "w-100",
  disabled = false,
  isLoading = false,
  loadingLabel = "Loading...",
  type = "button",
  style,
}: CustomButtonPropsType) => {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      disabled={disabled || isLoading}
      type={type}
      className={className}
      style={style}
    >
      {isLoading ? (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
          style={{ marginRight: "0.5rem" }}
        />
      ) : null}
      {isLoading ? loadingLabel : buttonLabel}
    </Button>
  );
};

export default CustomButton;
