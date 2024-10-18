import { Fragment, useState } from "react";
import SubjectCard from "./SubjectCard";
import { SubjectType } from "../constants/subjectTypes";
import EditSubjectModal from "./EditSubjectModal";

export type SubjectCatalogPropsType = {
  handleSubjectDelete: (subject: SubjectType) => Promise<void>;
  handleSubjectEdit: (subject: SubjectType) => Promise<void>;
  subjectsData: SubjectType[];
};

export default function SubjectCatalog({
  subjectsData,
  handleSubjectDelete,
  handleSubjectEdit,
}: SubjectCatalogPropsType) {
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);

  const handleSubjectEditModalShow = () => {
    setIsEditModalVisible(true);
  };

  console.log("isEditModalVisible", isEditModalVisible);

  return subjectsData.length > 0 ? (
    <div className="subjectCatalogContainer">
      <EditSubjectModal
        isVisible={isEditModalVisible}
        onClose={handleSubjectEdit}
      />
      {subjectsData.map((subject) => {
        return (
          <Fragment key={subject.subjectId}>
            <SubjectCard
              subject={subject}
              handleSubjectDelete={handleSubjectDelete}
              handleSubjectEdit={handleSubjectEditModalShow}
            />
          </Fragment>
        );
      })}
    </div>
  ) : null;
}
