import { Button } from "react-bootstrap";

export type CustomButtonPropsType = {
  buttonLabel: string;
  onClick: () => void;
  variant?: string;
  className?: string;
  disabled?: boolean;
};

const CustomButton = ({
  buttonLabel,
  onClick,
  variant = "primary",
  className = "w-100",
  disabled = false,
}: CustomButtonPropsType) => {
  return (
    <Button
      className={className}
      onClick={onClick}
      variant={variant}
      disabled={disabled}
    >
      {buttonLabel}
    </Button>
  );
};

export default CustomButton;
