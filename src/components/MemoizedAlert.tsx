import { memo } from "react";
import Alert from "react-bootstrap/Alert";

export type MemoizedAlertPropsType = {
  variant: string;
  text: string;
  isVisible: boolean;
  onClose?: () => void;
};

const MemoizedAlert = memo(function MemoizedAlert({
  variant,
  text,
  isVisible,
  onClose,
}: MemoizedAlertPropsType) {
  return isVisible ? (
    <Alert key={variant} variant={variant} dismissible onClose={onClose}>
      {text}
    </Alert>
  ) : null;
});

export default MemoizedAlert;
