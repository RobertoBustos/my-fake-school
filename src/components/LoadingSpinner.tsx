import Spinner from "react-bootstrap/Spinner";
import { useAppSelector } from "../redux/hooks";
import { selectAppLoaderStatusLoading } from "../redux/selectors";

const LoadingSpinner = () => {
  const isAppLoading = useAppSelector(selectAppLoaderStatusLoading);

  return isAppLoading ? (
    <Spinner animation="border" variant="success" />
  ) : (
    <></>
  );
};

export default LoadingSpinner;
