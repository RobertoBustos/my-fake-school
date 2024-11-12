import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import i18n from "@config/i18next";
import { SignInServicePayloadType, SignUpPayloadType, UserInfoType } from "@customTypes/authTypes";
import { AuthState } from "@redux/types";
import { signUpService, signInService, logOutService } from "@services/authServices";

const initialState: AuthState = {
    userCredential: null,
    isLoggedIn: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<UserInfoType>) => {
            state.userCredential = action.payload
            state.isLoggedIn = true
        },
        clearUserData: (state) => {
            state.userCredential = null;
            state.isLoggedIn = false
        }
    }
})

export const signUp = createAsyncThunk("auth/signUp", async (payload: SignUpPayloadType, thunkApi) => {
    if (payload.password !== payload.passwordConfirm) {
        return thunkApi.rejectWithValue(i18n.t("errors.auth.passwordsNotMatch"));
    }
    const response = await signUpService(payload)
    if (response instanceof Error) {
        return thunkApi.rejectWithValue(response.message);
    }
    return response
})

export const logIn = createAsyncThunk("auth/logIn", async (payload: SignInServicePayloadType, thunkApi) => {
    const response = await signInService(payload)
    if (response instanceof Error) {
        return thunkApi.rejectWithValue(response.message);
    }
    return response
})

export const logOut = createAsyncThunk("auth/logOut", async (_, thunkApi) => {
    const response = await logOutService()
    if (response instanceof Error) {
        return thunkApi.rejectWithValue(response.message);
    }
    return response
})

export const { setUserData, clearUserData } = authSlice.actions

export default authSlice.reducer;