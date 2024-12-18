import { createBrowserRouter } from "react-router-dom";
//pages
import PrivateRoute from "@components/common/PrivateRoute";
import HomePage from "@pages/HomePage";
import LoginPage from "@pages/auth/LoginPage";
export * from "@router/loaders";

const router = createBrowserRouter(
  [
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
        const { profilePageLoader } = await import("@router/index");
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
      id: "subjects",
      path: "/subjects",
      lazy: async () => {
        const { SubjectsPage } = await import("@pages/SubjectsPage");
        const { subjectCatalogLoader } = await import("@router/index");
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
    {
      id: "payment",
      path: "/payment",
      lazy: async () => {
        const { PaymentsPage } = await import("@pages/PaymentsPage");
        return {
          element: (
            <PrivateRoute>
              <PaymentsPage />
            </PrivateRoute>
          ),
        };
      },
    },
    {
      id: "confirmation",
      path: "/payment/confirm",
      lazy: async () => {
        const { PaymentsConfirmationPage } = await import(
          "@pages/PaymentsConfirmationPage"
        );
        return {
          element: (
            <PrivateRoute>
              <PaymentsConfirmationPage />
            </PrivateRoute>
          ),
        };
      },
    },
    {
      id: "location",
      path: "/location",
      lazy: async () => {
        const { LocationPage } = await import("@pages/LocationPage");
        return {
          element: (
            <PrivateRoute>
              <LocationPage />
            </PrivateRoute>
          ),
        };
      },
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default router;
