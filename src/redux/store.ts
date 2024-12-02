import rootReducer from "@reducers/index";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

if (module.hot) {
  module.hot.accept("./reducers", () => store.replaceReducer(rootReducer));
}

// Infer the type of `store`
export default store;