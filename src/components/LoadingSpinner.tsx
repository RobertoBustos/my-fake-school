import Spinner from "react-bootstrap/Spinner";
import { useAppSelector } from "@redux/hooks";
import { selectAppLoaderStatusLoading } from "@selectors/index";

export type LoadingSpinnerPropsType = {
  isVisible: boolean;
};

const LoadingSpinner = ({ isVisible }: LoadingSpinnerPropsType) => {
  const isAppLoading = useAppSelector(selectAppLoaderStatusLoading);

  return isVisible && isAppLoading ? (
    <Spinner animation="border" variant="success" />
  ) : null;
};

export default LoadingSpinner;
