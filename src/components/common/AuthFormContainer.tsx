import AlertStack from "@components/AlertStack";
import { useAppSelector } from "@redux/hooks";
import { selectAlerts } from "@redux/selectors";
import { ReactNode } from "react";
import { Card } from "react-bootstrap";

export type AuthFormContainerPropsType = {
  formTitle?: string;
  children: ReactNode;
};

const AuthFormContainer = ({
  formTitle,
  children,
}: AuthFormContainerPropsType) => {
  const alerts = useAppSelector(selectAlerts);

  return (
    <Card>
      <Card.Body>
        {formTitle ? <h2 className="text-center mb-4">{formTitle}</h2> : null}
        <AlertStack alertList={alerts} />
        {children}
      </Card.Body>
    </Card>
  );
};

export default AuthFormContainer;
