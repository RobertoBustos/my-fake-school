import { clearUserUpdateData, fetchAllSubjects } from "@actions/index";
import store from "@redux/store";

export async function subjectCatalogLoader() {
    return store.dispatch(fetchAllSubjects())
}

export function profilePageLoader() {
    return store.dispatch(clearUserUpdateData())
}