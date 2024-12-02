import { beginSubjectDelete, beginSubjectEdition } from "@actions/index";
import type { SubjectType } from "@customTypes/index";
import { useMemoizedTranslation } from "@hooks/index";
import { useAppDispatch } from "@redux/hooks";
import "@styles/components/SubjectCard.css";
import { useMemo } from "react";
import Button from "react-bootstrap/Button";

export type SubjectCardPropsType = {
  subject: SubjectType;
};

const SubjectCard = ({ subject }: SubjectCardPropsType) => {
  const dispatch = useAppDispatch();
  const { t } = useMemoizedTranslation();

  const memoizedSubjectCard = useMemo(() => {
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
  }, [dispatch, subject, t]);

  return memoizedSubjectCard;
};

export default SubjectCard;
