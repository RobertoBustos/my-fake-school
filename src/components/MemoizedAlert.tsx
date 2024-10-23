import { memo, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { clearError } from "../redux/reducers/errorReducer";
import { Variant } from "react-bootstrap/esm/types";
import { selectErrorState } from "../redux/selectors";

const MemoizedAlert = memo(function MemoizedAlert() {
  const dispatch = useAppDispatch();
  const { error, isAlertVisible } = useAppSelector(selectErrorState);
  const defineVariant: Variant = error ? "danger" : "";

  useEffect(() => {
    if (isAlertVisible) {
      setTimeout(() => {
        dispatch(clearError());
      }, 3000);
    }
  }, [dispatch, isAlertVisible]);

  const handleCloseAlert = () => {
    dispatch(clearError());
  };

  const renderText = () => {
    if (error) return error;
    return "";
  };

  return isAlertVisible ? (
    <Alert
      key={defineVariant}
      variant={defineVariant}
      dismissible
      onClose={handleCloseAlert}
    >
      {renderText()}
    </Alert>
  ) : null;
});

export default MemoizedAlert;
