import { ReactNode } from "react";
import { Button, Modal } from "react-bootstrap";
import { useAppSelector } from "@redux/hooks";
import { ModalList } from "@redux/types/index";
import { makeSelectCheckIfModalVisible } from "@selectors/index";

export type CustomModalPropsType = {
  modalId: ModalList;
  headerText: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmButtonLabel: string;
  cancelButtonLabel: string;
  children?: ReactNode;
};

const CustomModal = ({
  modalId,
  headerText,
  onConfirm,
  onCancel,
  confirmButtonLabel,
  cancelButtonLabel,
  children,
}: CustomModalPropsType) => {
  const isVisible = useAppSelector(makeSelectCheckIfModalVisible(modalId));

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
