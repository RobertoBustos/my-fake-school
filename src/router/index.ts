import { createBrowserRouter } from "react-router-dom";

import HomePage from "@pages/HomePage";
import SubjectsPage from "@pages/SubjectsPage";
import ErrorBoundaryPage from "@pages/ErrorBoundaryPage";
import store from "@redux/store";
import { fetchAllSubjects } from "@redux/reducers/subjectReducer";

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

      return store.dispatch(fetchAllSubjects())
    },
  },
]);

export default router;
