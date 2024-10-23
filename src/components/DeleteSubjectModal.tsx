import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ModalList } from "../redux/types";
import CustomModal from "./common/CustomModal";
import {
  cancelSubjectDelete,
  deleteExistingSubject,
} from "../redux/reducers/subjectReducer";
import { selectSubjectManipulationInProgressData } from "../redux/selectors";

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
      modalId={ModalList.DELETE_SUBJECT_MODAL}
      headerText={t("subject.deleteModal.title")}
      onConfirm={handleConfirmDelete}
      onCancel={handleCancelDelete}
      confirmButtonLabel={t("buttons.subject.confirmDeleteLabel")}
      cancelButtonLabel={t("buttons.subject.cancelDeleteLabel")}
    />
  );
};

export default DeleteSubjectModal;
