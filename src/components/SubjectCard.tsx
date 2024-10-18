import { SubjectType } from "../constants/subjectTypes";
import "../css/SubjectCard.css";
import Button from "react-bootstrap/Button";

export type SubjectCardPropsType = {
  subject: SubjectType;
  handleSubjectDelete: (subject: SubjectType) => Promise<void>;
  handleSubjectEdit: () => void;
};

const SubjectCard = ({
  subject,
  handleSubjectDelete,
  handleSubjectEdit,
}: SubjectCardPropsType) => {
  return (
    <div className="subjectCardContainer">
      <div className="subjectCardLabelContainer">
        <h1 className="subjectCardLabel">{subject.subjectName}</h1>
      </div>
      <div className="subjectCardActionsContainer">
        <Button variant="warning" size="sm" onClick={handleSubjectEdit}>
          Edit
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => {
            handleSubjectDelete(subject);
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default SubjectCard;
