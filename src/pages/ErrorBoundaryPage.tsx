import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export const ErrorBoundaryPage = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) return <div>This page doesn't exist</div>;
  }

  return <div>THERE HAS BEEN AN ERROR</div>;
};
