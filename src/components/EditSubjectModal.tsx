import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  editExistingSubject,
  cancelSubjectEdition,
} from "../redux/reducers/subjectReducer";
import { ModalList } from "../redux/types";
import {
  makeSelectCheckIfModalVisible,
  selectSubjectEditionInProgressData,
} from "../redux/selectors";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export type EditSubjectModalProps = {
  modalId: ModalList;
  headerText: string;
  headerBodyTitle: string;
  headerBodyText: string;
};

const EditSubjectModal = ({
  headerText,
  headerBodyTitle,
  headerBodyText,
}: EditSubjectModalProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const isVisible = useAppSelector(
    makeSelectCheckIfModalVisible(ModalList.EDIT_SUBJECT_MODAL)
  );
  const subjectData = useAppSelector(selectSubjectEditionInProgressData);
  const [newSubjectName, setNewSubjectName] = useState<string>(
    subjectData.subjectName
  );

  const handleClose = () => {
    setNewSubjectName("");
    dispatch(cancelSubjectEdition());
  };

  const handleSubmit = () => {
    setNewSubjectName("");
    dispatch(
      editExistingSubject({
        subjectId: subjectData.subjectId,
        newData: {
          subjectName: newSubjectName,
          isDeleted: subjectData.isDeleted,
        },
      })
    );
  };

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
      <Modal.Body>
        <h4>{headerBodyTitle}</h4>
        <p>{headerBodyText}</p>
        <input
          className=""
          type="text"
          onChange={(e) => {
            e.preventDefault();
            setNewSubjectName(e.target.value);
          }}
          value={newSubjectName}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}>
          {t("buttons.subject.confirmEditLabel")}
        </Button>
        <Button onClick={handleClose}>
          {t("buttons.subject.cancelEditLabel")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditSubjectModal;
