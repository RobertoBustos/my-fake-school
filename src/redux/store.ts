import rootReducer from "@reducers/index";
import { AppStore, PreloadState } from "@redux/types";
import { configureStore } from "@reduxjs/toolkit";

export const setupStore = (preloadedState?: PreloadState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    devTools: true,
  })
}

export const store: AppStore = setupStore()

if (module.hot) {
  module.hot.accept("./reducers", () => store.replaceReducer(rootReducer));
}

// Infer the type of `store`
export default store;