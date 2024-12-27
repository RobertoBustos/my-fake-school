import { AppLoaders } from "@customTypes/index";
import { useAppSelector } from "@redux/hooks";
import { selectAuthAppLoader, selectIsLoggedIn } from "@selectors/index";
import { useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";

export type PrivateRoutePropsType = {
  children?: any;
};

const PrivateRoute = ({ children }: PrivateRoutePropsType) => {
  const location = useLocation();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const isAppLoading = useAppSelector(
    selectAuthAppLoader(AppLoaders.LOAD_AUTH_STATE_CHANGE_LISTENER)
  );

  const memoizedPrivateRoute = useMemo(() => {
    if (isAppLoading) {
      return null;
    }
    if (location.pathname === "/") {
      //root path condition
      if (isLoggedIn) {
        return <Navigate to="/home" replace />;
      }
      return <Navigate to="/login" replace />;
    }

    //if the user enters these paths manually they are redirected if they're already logged in
    if (
      (location.pathname === "/login" || location.pathname === "/signup") &&
      isLoggedIn
    ) {
      return <Navigate to="/home" replace />;
    }

    //default condition to all the routes to be redirected to login page if the user is not logged in
    //only the login page itself and sign up page are excluded because it creates a redirection loop
    if (
      !isLoggedIn &&
      location.pathname !== "/login" &&
      location.pathname !== "/signup"
    ) {
      return <Navigate to="/login" replace />;
    }
    return children;
  }, [children, isAppLoading, isLoggedIn, location.pathname]);

  return memoizedPrivateRoute;
};

export default PrivateRoute;
