import i18n from "@config/i18next";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { signUpService, signInService, logOutService } from "@services/authServices";
import type { AuthState } from "@redux/types";
import type { SignInServicePayloadType, SignUpPayloadType, UserInfoType } from "@customTypes/authTypes";
import { shapeFirebaseAuthError } from "@utils/index"

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
    if ("message" in response) {
        return thunkApi.rejectWithValue(i18n.t(`errors.${shapeFirebaseAuthError(response.message)}`));
    }
    return response.toJSON()
})

export const logIn = createAsyncThunk("auth/logIn", async (payload: SignInServicePayloadType, thunkApi) => {
    const response = await signInService(payload)
    if ("message" in response) {
        return thunkApi.rejectWithValue(i18n.t(`errors.${shapeFirebaseAuthError(response.message)}`));
    } else {
        return response.toJSON()
    }
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