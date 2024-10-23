import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { ModalList } from "../redux/types";
import { selectSubjectManipulationInProgressData } from "../redux/selectors";
import { useState } from "react";
import CustomModal from "./common/CustomModal";
import { useTranslation } from "react-i18next";
import {
  cancelSubjectEdition,
  editExistingSubject,
} from "../redux/reducers/subjectReducer";
import { Modal } from "react-bootstrap";

const EditSubjectModal = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const subjectData = useAppSelector(selectSubjectManipulationInProgressData);
  const [newSubjectName, setNewSubjectName] = useState<string>(
    subjectData.subjectName
  );

  const handleConfirmEdition = () => {
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

  const handleCancelEdition = () => {
    setNewSubjectName("");
    dispatch(cancelSubjectEdition());
  };

  return (
    <CustomModal
      modalId={ModalList.EDIT_SUBJECT_MODAL}
      headerText={t("subject.editModal.title")}
      onConfirm={handleConfirmEdition}
      onCancel={handleCancelEdition}
      confirmButtonLabel={t("buttons.subject.confirmEditLabel")}
      cancelButtonLabel={t("buttons.subject.cancelEditLabel")}
    >
      <Modal.Body>
        <h4>{t("subject.editModal.subtitle")}</h4>
        <p>{t("subject.editModal.description")}</p>
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
    </CustomModal>
  );

  /* return (
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
        {headerBodyTitle ? <h4>{headerBodyTitle}</h4> : null}
        {headerBodyText ? <p>{headerBodyText}</p> : null}
        {isSubjectEditModal ? (
          <input
            className=""
            type="text"
            onChange={(e) => {
              e.preventDefault();
              setNewSubjectName(e.target.value);
            }}
            value={newSubjectName}
          />
        ) : null}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onConfirm}>{confirmButtonLabel}</Button>
        <Button onClick={onCancel}>{cancelButtonLabel}</Button>
      </Modal.Footer>
    </Modal>
  ); */
};

export default EditSubjectModal;
