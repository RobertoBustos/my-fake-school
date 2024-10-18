import { useState } from "react";
import "../css/AddSubject.css";

export type AddSubjectPropsType = {
  handleSubjectAddition: (subjectName: string) => Promise<void>;
};

const AddSubject = ({ handleSubjectAddition }: AddSubjectPropsType) => {
  const [subject, setSubject] = useState<string>("");

  const handleChange = (e: any) => {
    setSubject(e.target.value);
  };

  return (
    <div className={"formContainer"}>
      <h1>ADD SUBJECT</h1>
      <input type="text" value={subject} onChange={handleChange} />
      <button
        onClick={() => {
          handleSubjectAddition(subject);
          setSubject("");
        }}
      >
        ADD
      </button>
    </div>
  );
};

export default AddSubject;
