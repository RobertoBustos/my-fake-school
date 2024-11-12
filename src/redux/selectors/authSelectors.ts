import { RootState } from "@redux/types";

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn

export const selectLoggedInUserData = (state: RootState) => state.auth.userCredential