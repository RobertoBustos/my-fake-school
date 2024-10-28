import SubjectCard from "@components/SubjectCard";
import type { SubjectCatalogType } from "@customTypes/index";
import { useAppSelector } from "@redux/hooks";
import { selectUnregisteredSubjects } from "@redux/selectors";
import WarningMessage from "./WarningMessage";
import { useMemo } from "react";
import { useMemoizedTranslation } from "@hooks/useTranslation";

export type SubjectCatalogPropsType = {
  subjects: SubjectCatalogType;
};

const SubjectCatalog = ({ subjects }: SubjectCatalogPropsType) => {
  const { t } = useMemoizedTranslation();

  const unregisteredSubjects = useAppSelector(selectUnregisteredSubjects);

  const memoizedWarningMessage = useMemo(() => {
    if (unregisteredSubjects.length > 0) {
      const warningText = t("errors.subject.subjectsWithoutIdDetected", {
        subjects: unregisteredSubjects.length,
      });
      return <WarningMessage bodyText={warningText} />;
    } else {
      return null;
    }
  }, [unregisteredSubjects, t]);

  return (
    <div className="subjectCatalogContainer">
      {memoizedWarningMessage}
      {subjects.map((subject) => {
        return <SubjectCard subject={subject} key={subject.subjectId} />;
      })}
    </div>
  );
};

export default SubjectCatalog;
