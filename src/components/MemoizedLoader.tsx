import { memo } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useAppSelector } from "../redux/hooks";
import { selectAppLoaderStatus } from "../redux/selectors";

const MemoizedLoader = memo(function Loader() {
  const appLoaderStatus = useAppSelector(selectAppLoaderStatus);

  return appLoaderStatus === "loading" ? (
    <Spinner animation="border" variant="success" />
  ) : null;
});

export default MemoizedLoader;
