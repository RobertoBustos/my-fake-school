import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "@reducers/index";

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

if (module.hot) {
  module.hot.accept("./reducers", () => store.replaceReducer(rootReducer));
}

// Infer the type of `store`
export default store;
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
// Define a reusable type describing thunk functions
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
