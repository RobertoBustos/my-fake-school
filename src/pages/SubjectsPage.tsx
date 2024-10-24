import AddSubject from "../components/AddSubject";
import Layout from "../components/common/Layout";
import PageTitle from "../components/PageTitle";
import SubjectCatalog from "../components/SubjectCatalog";
import "../css/pages/SubjectsPage.css";
import { useTranslation } from "react-i18next";
import EditSubjectModal from "../components/EditSubjectModal";
import DeleteSubjectModal from "../components/DeleteSubjectModal";
import { useLoaderData } from "react-router-dom";
import { SubjectType } from "../constants/subjectTypes";

const SubjectsPage = () => {
  const { t } = useTranslation();
  let data = useLoaderData();

  return (
    <Layout>
      <PageTitle titleText={t("subject.catalogPage.title")} />
      <AddSubject />
      <SubjectCatalog subjects={data as SubjectType[]} />
      <EditSubjectModal />
      <DeleteSubjectModal />
    </Layout>
  );
};

export default SubjectsPage;
