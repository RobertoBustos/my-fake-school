import { createBrowserRouter } from "react-router-dom";
//pages
import HomePage from "@pages/HomePage";
import LoginPage from "@pages/auth/LoginPage";
import PrivateRoute from "@components/common/PrivateRoute";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <PrivateRoute />,
  },
  {
    id: "home",
    path: "/home",
    element: (
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>
    ),
    lazy: async () => {
      const { ErrorBoundaryPage } = await import("@pages/ErrorBoundaryPage");
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
      const { SignUpPage } = await import("@pages/auth/SignUpPage");
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
    id: "profile",
    path: "/profile",
    lazy: async () => {
      const { ProfilePage } = await import("@pages/auth/ProfilePage");
      const { profilePageLoader } = await import("@router/loaders");
      return {
        element: (
          <PrivateRoute>
            <ProfilePage />,
          </PrivateRoute>
        ),
        loader: profilePageLoader,
      };
    },
  },
  {
    id: "profilev2",
    path: "/profilev2",
    lazy: async () => {
      const { ProfilePage } = await import("@pages/auth/ProfilePagev2");
      return {
        element: (
          <PrivateRoute>
            <ProfilePage />,
          </PrivateRoute>
        ),
      };
    },
  },
  {
    id: "subjects",
    path: "/subjects",
    lazy: async () => {
      const { SubjectsPage } = await import("@pages/SubjectsPage");
      const { subjectCatalogLoader } = await import("@router/loaders");
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
