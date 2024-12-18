import { Form } from "react-bootstrap";

export type CustomSwitchButtonPropsType = {
  label: string;
  onClick: () => void;
};

const CustomSwitchButton = ({
  label,
  onClick,
}: CustomSwitchButtonPropsType) => {
  return (
    <Form.Check
      type="switch"
      id="custom-switch"
      label={label}
      onClick={onClick}
    />
  );
};

export default CustomSwitchButton;
