import { ReactNode } from "react";
import { Card } from "react-bootstrap";

export type FormContainerPropsType = {
  formTitle?: string;
  children: ReactNode;
};

const FormContainer = ({ formTitle, children }: FormContainerPropsType) => {
  return (
    <Card className="w-100 my-3">
      <Card.Body>
        {formTitle ? <h2 className="text-center mb-4">{formTitle}</h2> : null}
        {children}
      </Card.Body>
    </Card>
  );
};

export default FormContainer;
