import { Suspense, lazy, useMemo } from "react";
import Layout2 from "@components/common/Layout2";
import AddSubject from "@components/AddSubject";
import PageTitle from "@components/PageTitle";
import SubjectCatalog from "@components/SubjectCatalog";
import { ModalListType } from "@customTypes/index";
import { useMemoizedTranslation } from "@hooks/useTranslation";
import { useAppSelector } from "@redux/hooks";
import {
  makeSelectCheckIfModalVisible,
  selectSubjectCatalog,
} from "@selectors/index";
import { fakeDelayPromise } from "@utils/index";
import "@styles/pages/SubjectsPage.css";

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
    makeSelectCheckIfModalVisible(ModalListType.DELETE_SUBJECT_MODAL)
  );
  const isEditSubjectModalVisible = useAppSelector(
    makeSelectCheckIfModalVisible(ModalListType.EDIT_SUBJECT_MODAL)
  );
  const subjects = useAppSelector(selectSubjectCatalog);

  const memoizedCatalog = useMemo(() => {
    return <SubjectCatalog subjects={subjects} />;
  }, [subjects]);

  const memoizedTitle = useMemo(() => {
    return <PageTitle titleText={t("subject.catalogPage.title")} />;
  }, [t]);

  const headerProps = {
    showLanguageSelector: true,
    showBackButton: true,
  };

  return (
    <Layout2 pageTabTitle={t("pageTabTitles.subjectPage")} header={headerProps}>
      {memoizedTitle}
      <AddSubject />
      {memoizedCatalog}
      {isDeleteSubjectModalVisible && (
        <Suspense fallback={<div>L O A D I N G ...</div>}>
          <DeleteSubjectModal
            isVisible={isDeleteSubjectModalVisible}
            modalId={ModalListType.DELETE_SUBJECT_MODAL}
          />
        </Suspense>
      )}
      {isEditSubjectModalVisible && (
        <Suspense fallback={<div>L O A D I N G ...</div>}>
          <EditSubjectModal
            isVisible={isEditSubjectModalVisible}
            modalId={ModalListType.EDIT_SUBJECT_MODAL}
          />
        </Suspense>
      )}
    </Layout2>
  );
};
