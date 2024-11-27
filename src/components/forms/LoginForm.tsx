import CustomButton from "@components/common/CustomButton";
import { AppLoaders } from "@customTypes/index";
import { useMemoizedTranslation } from "@hooks/useTranslation";
import { useAppSelector } from "@redux/hooks";
import { selectAppLoader } from "@selectors/index";
import { useRef } from "react";
import { Form } from "react-bootstrap";

export type LoginFormPropstype = {
  onSubmit: (email: string, password: string) => void;
};

const LoginForm = ({ onSubmit }: LoginFormPropstype) => {
  const { t } = useMemoizedTranslation();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const isLogginIn = useAppSelector(selectAppLoader(AppLoaders.LOG_IN));

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
        <Form.Label>{t("forms.login.email")}</Form.Label>
        <Form.Control type="email" ref={emailRef} required />
      </Form.Group>
      <Form.Group id="password">
        <Form.Label>{t("forms.login.password")}</Form.Label>
        <Form.Control type="password" ref={passwordRef} required />
      </Form.Group>
      <CustomButton
        buttonLabel={t("buttons.signIn.confirmLabel")}
        type="submit"
        className="w-100 mt-4"
        isLoading={isLogginIn}
        loadingLabel={t("buttons.user.logInLabelInProgress")}
      />
    </Form>
  );
};

export default LoginForm;
