import SubjectCard from "@components/SubjectCard";
import WarningMessage from "@components/WarningMessage";
import type { SubjectType } from "@customTypes/index";
import { useMemoizedTranslation } from "@hooks/index";
import { useAppSelector } from "@redux/hooks";
import { selectUnregisteredSubjects } from "@selectors/index";
import { useMemo } from "react";

export type SubjectCatalogPropsType = {
  subjects: SubjectType[];
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
