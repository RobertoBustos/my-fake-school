import { cancelSubjectDelete, deleteExistingSubject } from "@actions/index";
import CustomModal from "@components/common/CustomModal";
import { ModalListType } from "@customTypes/index";
import { useMemoizedTranslation } from "@hooks/index";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectSubjectManipulationInProgressData } from "@selectors/index";

export type DeleteSubjectModalPropsType = {
  modalId: ModalListType;
  isVisible: boolean;
};

const DeleteSubjectModal = ({
  modalId,
  isVisible,
}: DeleteSubjectModalPropsType) => {
  const dispatch = useAppDispatch();
  const { t } = useMemoizedTranslation();
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
