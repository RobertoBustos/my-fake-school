import { ReactNode } from "react";
import { Card } from "react-bootstrap";

export type FormContainerPropsType = {
  formTitle?: string;
  children: ReactNode;
  id?: string;
};

const FormContainer = ({ formTitle, children, id }: FormContainerPropsType) => {
  return (
    <Card className="w-100 my-3" id={id}>
      <Card.Body>
        {formTitle ? <h2 className="text-center mb-4">{formTitle}</h2> : null}
        {children}
      </Card.Body>
    </Card>
  );
};

export default FormContainer;
