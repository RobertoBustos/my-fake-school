import { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@redux/hooks";
import { addNewSubject } from "@redux/reducers/subjectReducer";
import "@styles/components/AddSubject.css";

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
      <FloatingLabel
        controlId="floatingInput"
        label={t("subject.addSubjectForm.label")}
      >
        <Form.Control type="text" onChange={handleChange} value={subject} />
      </FloatingLabel>
      <Button
        onClick={handleSubjectAddition}
        variant="primary"
        className="addSubjectButton"
      >
        {t("buttons.subject.confirmAddLabel")}
      </Button>
    </div>
  );
};

export default AddSubject;
