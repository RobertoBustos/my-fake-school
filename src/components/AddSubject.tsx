import { useState } from "react";
import "../css/AddSubject.css";
import { useAppDispatch } from "../redux/hooks";
import { addNewSubject } from "../redux/reducers/subjectReducer";
import { useTranslation } from "react-i18next";

const AddSubject = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [subject, setSubject] = useState<string>("");

  const handleChange = (e: any) => {
    setSubject(e.target.value);
  };

  const handleSubjectAddition = () => {
    setSubject("");
    dispatch(addNewSubject(subject));
  };

  return (
    <div className={"formContainer"}>
      <h1>{t("subject.addSubjectForm.label")}</h1>
      <input type="text" value={subject} onChange={handleChange} />
      <button onClick={handleSubjectAddition}>
        {t("buttons.subject.confirmAddLabel")}
      </button>
    </div>
  );
};

export default AddSubject;
