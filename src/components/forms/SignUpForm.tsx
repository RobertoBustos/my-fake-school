import { useMemoizedTranslation } from "@hooks/useTranslation";
import { useAppSelector } from "@redux/hooks";
import { selectAppLoaderStatusLoading } from "@selectors/index";
import { useRef } from "react";
import { Button, Form } from "react-bootstrap";

export type SignUpFormPropsType = {
  onSubmit: (email: string, password: string, passwordConfirm: string) => void;
};

const SignUpForm = ({ onSubmit }: SignUpFormPropsType) => {
  const { t } = useMemoizedTranslation();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const isAppLoading = useAppSelector(selectAppLoaderStatusLoading);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        if (
          emailRef.current &&
          passwordRef.current &&
          passwordConfirmRef.current
        ) {
          onSubmit(
            emailRef.current.value,
            passwordRef.current.value,
            passwordConfirmRef.current.value
          );
        }
      }}
    >
      <Form.Group id="email">
        <Form.Label>{t("forms.login.email")}</Form.Label>
        <Form.Control type="email" ref={emailRef} required />
      </Form.Group>
      <Form.Group id="password">
        <Form.Label>{t("forms.login.password")}</Form.Label>
        <Form.Control type="password" ref={passwordRef} required />
      </Form.Group>
      <Form.Group id="password-confirm">
        <Form.Label>{t("forms.login.passwordConfirmation")}</Form.Label>
        <Form.Control type="password" ref={passwordConfirmRef} required />
      </Form.Group>
      <Button disabled={isAppLoading} className="w-100 mt-4" type="submit">
        {t("buttons.signUp.confirmLabel")}
      </Button>
    </Form>
  );
};

export default SignUpForm;
