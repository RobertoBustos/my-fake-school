import { createBrowserRouter } from "react-router-dom";

import HomePage from "@pages/HomePage";
import SubjectsPage from "@pages/SubjectsPage";
import ErrorBoundaryPage from "@pages/ErrorBoundaryPage";
import { getSubjectCatalog } from "@services/subjectServices";

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
    Component: SubjectsPage,
    loader: async () => {
      return getSubjectCatalog();
    },
  },
]);

export default router;
