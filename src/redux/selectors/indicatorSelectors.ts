import { RootState } from "@redux/types";
import { createSelector } from "reselect";

export const selectIndicatorState = (state: RootState) => state.indicators;

export const selectFeatureFlag = (featureFlagName: string) => {
    return createSelector([(state: RootState) => state.indicators.featureFlags], (featureFlags) =>
        featureFlags.find((flag) => flag.name === featureFlagName)
    );
}