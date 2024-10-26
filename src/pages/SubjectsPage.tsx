import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router-dom";
import Layout from "@components/common/Layout";
import AddSubject from "@components/AddSubject";
import DeleteSubjectModal from "@components/DeleteSubjectModal";
import EditSubjectModal from "@components/EditSubjectModal";
import PageTitle from "@components/PageTitle";
import SubjectCatalog from "@components/SubjectCatalog";
import { SubjectType } from "@constants/subjectTypes";
import "@styles/pages/SubjectsPage.css";

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
