import { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useMemoizedTranslation } from "@hooks/useTranslation";
import { useAppDispatch } from "@redux/hooks";
import { addNewSubject } from "@actions/index";
import "@styles/components/AddSubject.css";

const AddSubject = () => {
  const dispatch = useAppDispatch();
  const { t } = useMemoizedTranslation();
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
