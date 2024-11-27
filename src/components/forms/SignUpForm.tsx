import CustomButton from "@components/common/CustomButton";
import { AppLoaders } from "@customTypes/index";
import { useMemoizedTranslation } from "@hooks/useTranslation";
import { useAppSelector } from "@redux/hooks";
import { selectAppLoader } from "@selectors/index";
import { useRef } from "react";
import { Form } from "react-bootstrap";

export type SignUpFormPropsType = {
  onSubmit: (email: string, password: string, passwordConfirm: string) => void;
};

const SignUpForm = ({ onSubmit }: SignUpFormPropsType) => {
  const { t } = useMemoizedTranslation();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const isSigningUp = useAppSelector(selectAppLoader(AppLoaders.SIGN_UP));

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
      <CustomButton
        buttonLabel={t("buttons.signUp.confirmLabel")}
        type="submit"
        className="w-100 mt-4"
        isLoading={isSigningUp}
        loadingLabel={t("buttons.user.signUpLabelInProgress")}
      />
    </Form>
  );
};

export default SignUpForm;
