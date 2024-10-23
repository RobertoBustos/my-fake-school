import { Fragment } from "react";
import SubjectCard from "./SubjectCard";
import { ConnectedProps, connect } from "react-redux";
import WarningMessage from "./WarningMessage";
import { useAppSelector } from "../redux/hooks";
import { selectUnregisteredSubjects } from "../redux/selectors/index";
import { RootState } from "../redux/store";

type SubjectCatalogPropsType = PropsFromRedux & {
  showUnregistered?: boolean;
};

const SubjectCatalog = ({
  showUnregistered,
  subjectCatalog,
}: SubjectCatalogPropsType) => {
  //this is an example of a custom hook
  const unregisteredSubjects = useAppSelector(selectUnregisteredSubjects);

  return (
    <>
      {showUnregistered && unregisteredSubjects.length > 0 ? (
        <WarningMessage />
      ) : null}
      {subjectCatalog.length > 0 ? (
        <div className="subjectCatalogContainer">
          {subjectCatalog.map((subject) => {
            return (
              <Fragment key={subject.subjectId}>
                <SubjectCard subject={subject} />
              </Fragment>
            );
          })}
        </div>
      ) : null}
    </>
  );
};

const mapState = (state: RootState) => ({
  subjectCatalog: state.subject.subjectCatalog,
});
const connector = connect(mapState, {});
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SubjectCatalog);
