import { ReactNode } from "react";
import { Button, Modal } from "react-bootstrap";

export type CustomModalPropsType = {
  headerText: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmButtonLabel: string;
  cancelButtonLabel: string;
  isVisible: boolean;
  children?: ReactNode;
};

const CustomModal = ({
  headerText,
  onConfirm,
  onCancel,
  confirmButtonLabel,
  cancelButtonLabel,
  children,
  isVisible,
}: CustomModalPropsType) => {
  return (
    <Modal
      show={isVisible}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {headerText}
        </Modal.Title>
      </Modal.Header>
      {children}
      <Modal.Footer>
        <Button onClick={onConfirm}>{confirmButtonLabel}</Button>
        <Button onClick={onCancel}>{cancelButtonLabel}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
