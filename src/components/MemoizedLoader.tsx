import { memo } from "react";
import Spinner from "react-bootstrap/Spinner";

const MemoizedLoader = memo(function Loader() {
  return <Spinner animation="border" variant="success" />;
});

export default MemoizedLoader;
