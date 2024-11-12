import AlertStack from "@components/AlertStack";
import LoginForm from "@components/forms/LoginForm";
import { logIn } from "@actions/index";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectAlerts } from "@selectors/index";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export type LoginPagePropsType = {};

const LoginPage = (props: LoginPagePropsType) => {
  const dispatch = useAppDispatch();
  const alerts = useAppSelector(selectAlerts);

  const handleSubmit = (email: string, password: string) => {
    dispatch(
      logIn({
        email: email,
        password: password,
      })
    );
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          <AlertStack alertList={alerts} />
          <LoginForm onSubmit={handleSubmit} />
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
};

export default LoginPage;
