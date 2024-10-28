import Alert from "react-bootstrap/Alert";
import { useAppDispatch } from "@redux/hooks";
import { closeAlert } from "@reducers/indicatorReducer";
import { AlertPropsType } from "@customTypes/index";

export type AlertStackPropsType = {
  alertList: AlertPropsType[];
};

const AlertStack = ({ alertList }: AlertStackPropsType) => {
  const dispatch = useAppDispatch();

  return (
    <div>
      {alertList.map((alert) => {
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
