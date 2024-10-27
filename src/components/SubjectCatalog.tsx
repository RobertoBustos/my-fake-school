import { useMemo } from "react";
import SubjectCard from "@components/SubjectCard";
import type { SubjectCatalogType } from "@customTypes/index";

export type SubjectCatalogPropsType = {
  subjects: SubjectCatalogType;
};

const SubjectCatalog = ({ subjects }: SubjectCatalogPropsType) => {
  const memoizedCatalog = useMemo(() => {
    return (
      <div className="subjectCatalogContainer">
        {subjects.map((subject) => {
          return <SubjectCard subject={subject} key={subject.subjectId} />;
        })}
      </div>
    );
  }, [subjects]);

  return memoizedCatalog;
};

export default SubjectCatalog;
