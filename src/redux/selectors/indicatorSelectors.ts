import { createSelector } from "reselect"
import { RootState } from "@redux/types/index";
import { ModalListType } from "@customTypes/index";

export const selectIndicatorState = (state: RootState) => state.indicators;

export const selectAppLoaderStatusLoading = (state: RootState) =>
    state.indicators.appLoaderStatus === "loading";

export const selectVisibleModals = (state: RootState) =>
    state.indicators.visibleModals;

export const selectAlerts = (state: RootState) => state.indicators.alerts;

export const selectFeatureFlag = (featureFlagName: string) => {
    return createSelector([(state: RootState) => state.indicators.featureFlags], (featureFlags) =>
        featureFlags.find((flag) => flag.name === featureFlagName)
    );
}

export const makeSelectCheckIfModalVisible = (modalName: ModalListType) => {
    return createSelector([selectVisibleModals], (visibleModals) =>
        visibleModals.includes(modalName)
    );
};