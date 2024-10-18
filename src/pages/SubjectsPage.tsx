import { useEffect, useState } from "react";
import AddSubject from "../components/AddSubject";
import PageTitle from "../components/PageTitle";
import SubjectCatalog from "../components/SubjectCatalog";
import "../css/pages/SubjectsPage.css";
import {
  addSubject,
  deleteSubject,
  getSubjectCatalog,
} from "../services/subjectServices";
import { SubjectType, SubjectCatalogType } from "../constants/subjectTypes";
import MemoizedLoader from "../components/MemoizedLoader";
import MemoizedAlert, {
  MemoizedAlertPropsType,
} from "../components/MemoizedAlert";

const SubjectsPage = () => {
  const [subjectsData, setSubjectsData] = useState<SubjectCatalogType>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showAlert, setShowAlert] = useState<MemoizedAlertPropsType>({
    isVisible: false,
    text: "",
    variant: "none",
  });

  async function getCatalog() {
    setIsLoading(true);
    const catalogResponse = await getSubjectCatalog();
    setIsLoading(false);
    if (catalogResponse instanceof Error) {
      setIsLoading(false);
      return setShowAlert({
        isVisible: true,
        text: catalogResponse.message,
        variant: "danger",
      });
    }
    return setSubjectsData(catalogResponse);
  }

  async function handleSubjectAddition(subejectName: string): Promise<void> {
    setIsLoading(true);
    const aditionResponse = await addSubject({
      subjectName: subejectName,
      isDeleted: false,
    });
    if (aditionResponse instanceof Error) {
      setIsLoading(false);
      return setShowAlert({
        isVisible: true,
        text: aditionResponse.message,
        variant: "danger",
      });
    }
    setShowAlert({
      isVisible: true,
      text: "Subject Added Succesfully",
      variant: "success",
    });
    getCatalog();
  }

  async function handleSubjectEdit(subject: SubjectType) {}

  async function handleSubjectDelete(subject: SubjectType) {
    setIsLoading(true);
    const deleteResponse = await deleteSubject({
      subjectId: subject.subjectId,
    });
    if (deleteResponse instanceof Error) {
      setIsLoading(false);
      return setShowAlert({
        isVisible: true,
        text: deleteResponse.message,
        variant: "danger",
      });
    }
    setShowAlert({
      isVisible: true,
      text: "Subject Deleted Succesfully",
      variant: "success",
    });
    getCatalog();
  }

  function renderLoader() {
    return <MemoizedLoader />;
  }

  function renderAlert() {
    return (
      <MemoizedAlert
        isVisible={showAlert.isVisible}
        text={showAlert.text}
        variant={showAlert.variant}
        onClose={() => {
          setShowAlert({
            isVisible: false,
            text: "",
            variant: "",
          });
        }}
      />
    );
  }

  useEffect(() => {
    getCatalog();
  }, []);

  console.log("subjectsData", subjectsData);
  console.log("isLoading", isLoading);

  return (
    <div className="subjectsPage">
      {renderAlert()}
      {isLoading ? renderLoader() : null}
      <PageTitle titleText="SUBJECT CATALOG" />
      <AddSubject handleSubjectAddition={handleSubjectAddition} />
      <SubjectCatalog
        subjectsData={subjectsData}
        handleSubjectDelete={handleSubjectDelete}
        handleSubjectEdit={handleSubjectEdit}
      />
    </div>
  );
};

export default SubjectsPage;
