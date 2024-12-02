import { clearUserUpdateData, fetchAllSubjects } from "@redux/actions";
import store from "@redux/store";

export async function subjectCatalogLoader() {
    return store.dispatch(fetchAllSubjects())
}

export function profilePageLoader() {
    return store.dispatch(clearUserUpdateData())
}