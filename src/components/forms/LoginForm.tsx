import { useAppSelector } from "@redux/hooks";
import { selectAppLoaderStatusLoading } from "@selectors/index";
import { useRef } from "react";
import { Button, Form } from "react-bootstrap";

export type LoginFormPropstype = {
  onSubmit: (email: string, password: string) => void;
};

const LoginForm = ({ onSubmit }: LoginFormPropstype) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const isAppLoading = useAppSelector(selectAppLoaderStatusLoading);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        if (emailRef.current && passwordRef.current) {
          onSubmit(emailRef.current.value, passwordRef.current.value);
        }
      }}
    >
      <Form.Group id="email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" ref={emailRef} required />
      </Form.Group>
      <Form.Group id="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" ref={passwordRef} required />
      </Form.Group>
      <Button disabled={isAppLoading} className="w-100 mt-4" type="submit">
        Sign Up
      </Button>
    </Form>
  );
};

export default LoginForm;
