import Alert from "react-bootstrap/Alert";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { closeAlert } from "@actions/index";
import { AlertPropsType } from "@customTypes/index";
import { selectAlerts } from "@selectors/index";
import "@styles/components/AlertStack.css";

const AlertStack = () => {
  const dispatch = useAppDispatch();
  const alerts: AlertPropsType[] = useAppSelector(selectAlerts);

  return (
    <div className="alertcontainer">
      {alerts.map((alert) => {
        if (alert.dismisable === true) {
          setTimeout(() => {
            dispatch(closeAlert(alert.alertId));
          }, 1500);
        }
        return (
          <Alert
            key={alert.alertId}
            variant={alert.type}
            dismissible={alert.dismisable}
            onClose={() => {
              dispatch(closeAlert(alert.alertId));
            }}
          >
            {alert.message}
          </Alert>
        );
      })}
    </div>
  );
};

export default AlertStack;
