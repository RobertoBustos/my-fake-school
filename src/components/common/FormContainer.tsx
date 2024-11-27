import AlertStack from "@components/AlertStack";
import { ReactNode } from "react";
import { Card } from "react-bootstrap";

export type FormContainerPropsType = {
  formTitle?: string;
  displayAlerts?: boolean;
  children: ReactNode;
};

const FormContainer = ({
  formTitle,
  displayAlerts = true,
  children,
}: FormContainerPropsType) => {
  return (
    <Card className="w-100 my-3">
      <Card.Body>
        {formTitle ? <h2 className="text-center mb-4">{formTitle}</h2> : null}
        {displayAlerts ? <AlertStack /> : null}
        {children}
      </Card.Body>
    </Card>
  );
};

export default FormContainer;
