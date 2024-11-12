import { fetchAllSubjects } from "@redux/actions";
import store from "@redux/store";

export async function subjectCatalogLoader() {
    return store.dispatch(fetchAllSubjects())
}