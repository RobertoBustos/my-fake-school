import AddSubject from "@components/AddSubject";
import SubjectCatalog from "@components/SubjectCatalog";
import CustomText from "@components/common/CustomText";
import Layout from "@components/common/Layout";
import { ModalWindows } from "@customTypes/index";
import { useMemoizedTranslation } from "@hooks/index";
import { useAppSelector } from "@redux/hooks";
import { selectSubjectCatalog, selectSubjectModal } from "@selectors/index";
import "@styles/pages/SubjectsPage.css";
import { fakeDelayPromise } from "@utils/index";
import { Suspense, lazy, useMemo } from "react";

//using lazy loading for components that dont need to be rendered if they are not being used
const EditSubjectModal = lazy(() =>
  fakeDelayPromise(import("@components/EditSubjectModal"))
);
const DeleteSubjectModal = lazy(() =>
  fakeDelayPromise(import("@components/DeleteSubjectModal"))
);

export const SubjectsPage = () => {
  const { t } = useMemoizedTranslation();
  const isDeleteSubjectModalVisible = useAppSelector(
    selectSubjectModal(ModalWindows.DELETE_SUBJECT_MODAL)
  );
  const isEditSubjectModalVisible = useAppSelector(
    selectSubjectModal(ModalWindows.EDIT_SUBJECT_MODAL)
  );
  const subjects = useAppSelector(selectSubjectCatalog);

  const memoizedCatalog = useMemo(() => {
    return <SubjectCatalog subjects={subjects} />;
  }, [subjects]);

  const memoizedTitle = useMemo(() => {
    return <CustomText text={t("subject.catalogPage.title")} />;
  }, [t]);

  const headerProps = {
    showLanguageSelector: true,
    showBackButton: true,
  };

  return (
    <Layout pageTabTitle={t("pageTabTitles.subjectPage")} header={headerProps}>
      {memoizedTitle}
      <AddSubject />
      {memoizedCatalog}
      {isDeleteSubjectModalVisible && (
        <Suspense fallback={<div>L O A D I N G ...</div>}>
          <DeleteSubjectModal
            isVisible={isDeleteSubjectModalVisible}
            modalId={ModalWindows.DELETE_SUBJECT_MODAL}
          />
        </Suspense>
      )}
      {isEditSubjectModalVisible && (
        <Suspense fallback={<div>L O A D I N G ...</div>}>
          <EditSubjectModal
            isVisible={isEditSubjectModalVisible}
            modalId={ModalWindows.EDIT_SUBJECT_MODAL}
          />
        </Suspense>
      )}
    </Layout>
  );
};
