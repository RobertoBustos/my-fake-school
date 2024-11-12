import AlertStack from "@components/AlertStack";
import SignUpForm from "@components/forms/SignUpForm";
import { signUp } from "@actions/index";
import { useAppSelector, useAppDispatch } from "@redux/hooks";
import { selectAlerts } from "@selectors/index";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export type SignUpPagePropsType = {};

export const SignUpPage = (props: SignUpPagePropsType) => {
  const dispatch = useAppDispatch();
  const alerts = useAppSelector(selectAlerts);

  const handleSubmit = (
    email: string,
    password: string,
    passwordConfirm: string
  ) => {
    dispatch(
      signUp({
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
      })
    );
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          <AlertStack alertList={alerts} />
          <SignUpForm onSubmit={handleSubmit} />
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
};
