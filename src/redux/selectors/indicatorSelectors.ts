import { createSelector } from "reselect"
import { RootState } from "@redux/types/index";
import { AppLoaders, ModalListType } from "@customTypes/index";

export const selectIndicatorState = (state: RootState) => state.indicators;

export const selectAppLoaderStatusLoading = (state: RootState) =>
    state.indicators.appLoaderStatus === "loading";

export const selectVisibleModals = (state: RootState) =>
    state.indicators.visibleModals;

export const selectFeatureFlag = (featureFlagName: string) => {
    return createSelector([(state: RootState) => state.indicators.featureFlags], (featureFlags) =>
        featureFlags.find((flag) => flag.name === featureFlagName)
    );
}

export const selectAppLoader = (appLoader: AppLoaders) => {
    return createSelector([(state: RootState) => state.indicators.appLoaders], (appLoaders) =>
        appLoaders.includes(appLoader)
    );
}

export const makeSelectCheckIfModalVisible = (modalName: ModalListType) => {
    return createSelector([selectVisibleModals], (visibleModals) =>
        visibleModals.includes(modalName)
    );
};