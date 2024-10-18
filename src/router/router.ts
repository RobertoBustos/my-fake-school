import { createBrowserRouter } from "react-router-dom";

import HomePage from "../pages/HomePage";
import Subjects from "../pages/SubjectsPage";
import ErrorBoundaryPage from "../pages/ErrorBoundaryPage";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: HomePage,
    errorElement: ErrorBoundaryPage(),
  },
  {
    id: "subjects",
    path: "/subjects",
    Component: Subjects,
  },
]);

export default router;
