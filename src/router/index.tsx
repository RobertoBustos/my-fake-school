import { createBrowserRouter } from "react-router-dom";
//pages
import HomePage from "@pages/HomePage";
import LoginPage from "@pages/auth/LoginPage";
import PrivateRoute from "@components/common/PrivateRoute";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/home",
    element: (
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>
    ),
    lazy: async () => {
      let { ErrorBoundaryPage } = await import("@pages/ErrorBoundaryPage");
      return { ErrorBoundary: ErrorBoundaryPage };
    },
  },
  {
    id: "login",
    path: "/login",
    element: (
      <PrivateRoute>
        <LoginPage />
      </PrivateRoute>
    ),
  },
  {
    id: "signup",
    path: "/signup",
    lazy: async () => {
      let { SignUpPage } = await import("@pages/auth/SignUpPage");
      return {
        element: (
          <PrivateRoute>
            <SignUpPage />
          </PrivateRoute>
        ),
      };
    },
  },
  {
    id: "subjects",
    path: "/subjects",
    lazy: async () => {
      let { SubjectsPage } = await import("@pages/SubjectsPage");
      let { subjectCatalogLoader } = await import("@router/loaders");
      return {
        loader: subjectCatalogLoader,
        element: (
          <PrivateRoute>
            <SubjectsPage />
          </PrivateRoute>
        ),
      };
    },
  },
]);

export default router;
