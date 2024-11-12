import { useAppSelector } from "@redux/hooks";
import { selectIsLoggedIn } from "@redux/selectors";
import { useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";

export type PrivateRoutePropsType = {
  children?: any;
};

const PrivateRoute = ({ children }: PrivateRoutePropsType) => {
  const location = useLocation();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const memoizedPrivateRoute = useMemo(() => {
    if (
      !isLoggedIn &&
      location.pathname !== "/login" &&
      location.pathname !== "/signup"
    ) {
      return <Navigate to="/login" replace />;
    }

    if (
      (location.pathname === "/login" || location.pathname === "/signup") &&
      isLoggedIn
    ) {
      return <Navigate to="/home" replace />;
    }

    if (location.pathname === "/") {
      if (isLoggedIn) {
        return <Navigate to="/home" replace />;
      }
      return <Navigate to="/login" replace />;
    }

    return children;
  }, [children, isLoggedIn, location]);

  return memoizedPrivateRoute;
};

export default PrivateRoute;
