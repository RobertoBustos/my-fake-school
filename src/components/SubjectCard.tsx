import { SubjectType } from "../constants/subjectTypes";
import "../css/SubjectCard.css";
import Button from "react-bootstrap/Button";
import { useAppDispatch } from "../redux/hooks";
import {
  beginSubjectEdition,
  beginSubjectDelete,
} from "../redux/reducers/subjectReducer";
import { useTranslation } from "react-i18next";

export type SubjectCardPropsType = {
  subject: SubjectType;
};

const SubjectCard = ({ subject }: SubjectCardPropsType) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleSubjectEdit = () => {
    dispatch(beginSubjectEdition(subject));
  };

  const handleSubjectDelete = () => {
    dispatch(beginSubjectDelete(subject));
  };

  return (
    <div className="subjectCardContainer">
      <div className="subjectCardLabelContainer">
        <h1 className="subjectCardLabel">{subject.subjectName}</h1>
      </div>
      <div className="subjectCardActionsContainer">
        <Button variant="warning" size="sm" onClick={handleSubjectEdit}>
          {t("buttons.subject.editLabel")}
        </Button>
        <Button variant="danger" size="sm" onClick={handleSubjectDelete}>
          {t("buttons.subject.deleteLabel")}
        </Button>
      </div>
    </div>
  );
};

export default SubjectCard;
