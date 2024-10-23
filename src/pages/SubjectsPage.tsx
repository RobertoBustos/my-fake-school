import AddSubject from "../components/AddSubject";
import Layout from "../components/common/Layout";
import PageTitle from "../components/PageTitle";
import SubjectCatalog from "../components/SubjectCatalog";
import { useAppDispatch } from "../redux/hooks";
import { fetchAllSubjects } from "../redux/reducers/subjectReducer";
import "../css/pages/SubjectsPage.css";
import { useTranslation } from "react-i18next";
import EditSubjectModal from "../components/EditSubjectModal";
import DeleteSubjectModal from "../components/DeleteSubjectModal";

const SubjectsPage = () => {
  const dispatch = useAppDispatch();
  dispatch(fetchAllSubjects());
  const { t } = useTranslation();

  return (
    <Layout>
      <PageTitle titleText={t("subject.catalogPage.title")} />
      <AddSubject />
      <SubjectCatalog showUnregistered />
      <EditSubjectModal />
      <DeleteSubjectModal />
    </Layout>
  );
};

export default SubjectsPage;
