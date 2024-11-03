import { createAction } from '@reduxjs/toolkit'
import { Value } from 'firebase/remote-config'
export { closeAlert, hideLoadingSpinner, hideModal, indicatorsSlice, showLoadingSpinner, showModal } from "@reducers/indicatorReducer"

export const registerFeatureFlags = createAction('indicators/registerFeatureFlags', function prepare(featureFlags: Record<string, Value>) {
    const featureFlagsMapped = Object.keys(featureFlags).map(key => {
        return { name: key, value: featureFlags[key].asBoolean() }
    })
    return {
        payload: featureFlagsMapped
    }
});