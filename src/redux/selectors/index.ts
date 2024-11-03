import { RootState } from "@redux/types/index";
export * from "./subjectSelectors"
export * from "./indicatorSelectors"

//Top level selectors, every reducer must export at least one top level selector
export const selectRootState = (state: RootState) => state;