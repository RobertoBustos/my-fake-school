import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useMemoizedTranslation } from "@hooks/useTranslation";
import CustomModal from "@components/common/CustomModal";
import { useAppSelector, useAppDispatch } from "@redux/hooks";
import { ModalListType } from "@customTypes/index";
import { selectSubjectManipulationInProgressData } from "@selectors/index";
import {
  cancelSubjectEdition,
  editExistingSubject,
} from "@reducers/subjectReducer";

export type EditSubjectModalPropsType = {
  modalId: ModalListType;
  isVisible: boolean;
};

const EditSubjectModal = ({
  modalId,
  isVisible,
}: EditSubjectModalPropsType) => {
  const dispatch = useAppDispatch();
  const { t } = useMemoizedTranslation();
  const subjectData = useAppSelector(selectSubjectManipulationInProgressData);
  const [newSubjectName, setNewSubjectName] = useState<string>("");

  useEffect(() => {
    setNewSubjectName(subjectData.subjectName);
  }, [subjectData.subjectName]);

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
      headerText={t("subject.editModal.title")}
      onConfirm={handleConfirmEdition}
      onCancel={handleCancelEdition}
      confirmButtonLabel={t("buttons.subject.confirmEditLabel")}
      cancelButtonLabel={t("buttons.subject.cancelEditLabel")}
      isVisible={isVisible}
    >
      <Modal.Body>
        <h4>{t("subject.editModal.subtitle")}</h4>
        <p>{t("subject.editModal.description")}</p>
        <input
          type="text"
          onChange={(e) => {
            setNewSubjectName(e.target.value);
          }}
          value={newSubjectName}
        />
      </Modal.Body>
    </CustomModal>
  );
};

export default EditSubjectModal;
