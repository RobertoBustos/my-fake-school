import { RootState } from "@redux/types/index";
export * from "@selectors/authSelectors";
export * from "@selectors/indicatorSelectors";
export * from "@selectors/subjectSelectors";

//Top level selectors, every reducer must export at least one top level selector
export const selectRootState = (state: RootState) => state;