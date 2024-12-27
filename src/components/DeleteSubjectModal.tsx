import { cancelSubjectDelete, deleteSubject } from "@actions/index";
import CustomModal from "@components/common/CustomModal";
import { ModalWindows } from "@customTypes/index";
import { useMemoizedTranslation } from "@hooks/index";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectSubjectManipulationInProgressData } from "@selectors/index";

export type DeleteSubjectModalPropsType = {
  modalId: ModalWindows;
  isVisible: boolean;
};

const DeleteSubjectModal = ({ isVisible }: DeleteSubjectModalPropsType) => {
  const dispatch = useAppDispatch();
  const { t } = useMemoizedTranslation();
  const subjectData = useAppSelector(selectSubjectManipulationInProgressData);

  const handleConfirmDelete = () => {
    dispatch(
      deleteSubject({
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
      headerText={t("subject.deleteModal.title")}
      onConfirm={handleConfirmDelete}
      onCancel={handleCancelDelete}
      confirmButtonLabel={t("buttons.subject.confirmDeleteLabel")}
      cancelButtonLabel={t("buttons.subject.cancelDeleteLabel")}
      isVisible={isVisible}
    />
  );
};

export default DeleteSubjectModal;
