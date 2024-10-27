import { useTranslation } from "react-i18next";
import CustomModal from "@components/common/CustomModal";
import { ModalListType } from "@customTypes/index";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  cancelSubjectDelete,
  deleteExistingSubject,
} from "@reducers/subjectReducer";
import { selectSubjectManipulationInProgressData } from "@selectors/index";

const DeleteSubjectModal = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const subjectData = useAppSelector(selectSubjectManipulationInProgressData);

  const handleConfirmDelete = () => {
    dispatch(
      deleteExistingSubject({
        subjectId: subjectData.subjectId,
        newData: { subjectName: subjectData.subjectName, isDeleted: true },
      })
    );
  };

  const handleCancelDelete = () => {
    dispatch(cancelSubjectDelete());
  };

  return (
    <CustomModal
      modalId={ModalListType.DELETE_SUBJECT_MODAL}
      headerText={t("subject.deleteModal.title")}
      onConfirm={handleConfirmDelete}
      onCancel={handleCancelDelete}
      confirmButtonLabel={t("buttons.subject.confirmDeleteLabel")}
      cancelButtonLabel={t("buttons.subject.cancelDeleteLabel")}
    />
  );
};

export default DeleteSubjectModal;
