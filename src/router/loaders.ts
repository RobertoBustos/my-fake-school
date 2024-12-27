import store from "@redux/store";



import { clearUserUpdateData, fetchSubjects } from "@actions/index";

export async function subjectCatalogLoader() {
    return store.dispatch(fetchSubjects())
}

export function profilePageLoader() {
    return store.dispatch(clearUserUpdateData())
}