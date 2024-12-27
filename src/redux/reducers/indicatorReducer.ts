import { IndicatorsState } from "@redux/types";
import { createSlice } from "@reduxjs/toolkit";
import { Analytics } from "firebase/analytics";
import { Value } from "firebase/remote-config";

const initialState: IndicatorsState = {
  appLoaderStatus: "loading",
  featureFlags: [],
  analytics: null
};

export const indicatorsSlice = createSlice({
  name: "indicators",
  initialState,
  reducers: (create) => ({
    registerFeatureFlags: create.preparedReducer((featureFlags: Record<string, Value>) => {
      const featureFlagsMapped = Object.keys(featureFlags).map(key => {
        return { name: key, value: featureFlags[key].asBoolean() }
      })
      return {
        payload: featureFlagsMapped
      }
    }, (state, action) => {
      state.featureFlags = action.payload
    }),
    setAnalytics: create.preparedReducer((analytics: Analytics) => {
      return { payload: JSON.stringify(analytics) }
    }, (state, action) => {
      state.analytics = action.payload
    })
  })
});

export const { registerFeatureFlags, setAnalytics } =
  indicatorsSlice.actions;

export default indicatorsSlice.reducer;
