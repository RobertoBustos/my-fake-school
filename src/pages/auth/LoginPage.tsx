import AlertStack from "@components/AlertStack";
import LoginForm from "@components/forms/LoginForm";
import { logIn } from "@actions/index";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectAlerts } from "@selectors/index";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useMemoizedTranslation } from "@hooks/useTranslation";

export type LoginPagePropsType = {};

const LoginPage = (props: LoginPagePropsType) => {
  const { t } = useMemoizedTranslation();
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
          <h2 className="text-center mb-4">{t("pageTitles.signIn")}</h2>
          <AlertStack alertList={alerts} />
          <LoginForm onSubmit={handleSubmit} />
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        {t("forms.login.needAnAccount")}
        <Link to="/signup">{t("forms.login.signUp")}</Link>
      </div>
    </>
  );
};

export default LoginPage;
