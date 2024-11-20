import i18n from "@config/i18next";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { AuthState } from "@redux/types";
import type { UserDataType, UserSignUpPayloadType, UserSignInPayloadType, UserProfileNewValue, } from "@customTypes/index";
import { parseUpdateUserProfilePayload, removeKeyFromObject, shapeFirebaseAuthError } from "@utils/index"
import { signUpService, signInService, logOutService, verificationService, updateProfileService } from "@services/authServices";

const initialState: AuthState = {
    userCredential: {},
    isLoggedIn: false,
    userManipulationInProgress: {}
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<UserDataType>) => {
            state.userCredential = action.payload
            state.isLoggedIn = true
        },
        clearUserData: (state) => {
            state.userCredential = {};
            state.isLoggedIn = false
        },
        beginUserEdition: (state, action: PayloadAction<UserProfileNewValue>) => {
            if (action.payload.value === "") {
                state.userManipulationInProgress = removeKeyFromObject(state.userManipulationInProgress, action.payload.field)
                if (action.payload.field === "firstName") {
                    state.userManipulationInProgress.displayName = `${state.userManipulationInProgress.lastName || ""},`
                }
                if (action.payload.field === "lastName") {
                    state.userManipulationInProgress.displayName = `,${state.userManipulationInProgress.firstName || ""}`
                }
            } else {
                const newUserManipulationInProgress = { ...state.userManipulationInProgress, [action.payload.field]: action.payload.value };
                state.userManipulationInProgress = newUserManipulationInProgress;
                if (action.payload.field === "firstName") {
                    state.userManipulationInProgress.displayName = `${state.userManipulationInProgress.lastName || ""},${action.payload.value}`
                }
                if (action.payload.field === "lastName") {
                    state.userManipulationInProgress.displayName = `${action.payload.value},${state.userManipulationInProgress.firstName || ""}`
                }
            }
            if (!state.userManipulationInProgress.firstName && !state.userManipulationInProgress.lastName) {
                state.userManipulationInProgress = removeKeyFromObject(state.userManipulationInProgress, "displayName")
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(updateProfile.fulfilled, (state) => {
            state.userCredential.firstName = state.userManipulationInProgress.firstName;
            state.userCredential.lastName = state.userManipulationInProgress.lastName;
            state.userManipulationInProgress = {}
        });
        builder.addCase(updateProfile.rejected, (state) => {
            state.userManipulationInProgress = {}
        });
    }
})

export const signUp = createAsyncThunk("auth/signUp", async (payload: UserSignUpPayloadType, { rejectWithValue }) => {
    if (payload.password !== payload.passwordConfirm) {
        return rejectWithValue(i18n.t("errors.auth.passwordsNotMatch"));
    }
    const response = await signUpService(payload)
    if ("message" in response) {
        return rejectWithValue(i18n.t(`errors.${shapeFirebaseAuthError(response.message)}`));
    }
    return response.toJSON()
})

export const logIn = createAsyncThunk("auth/logIn", async (payload: UserSignInPayloadType, { rejectWithValue }) => {
    const response = await signInService(payload)
    if ("message" in response) {
        return rejectWithValue(i18n.t(`errors.${shapeFirebaseAuthError(response.message)}`));
    } else {
        return response.toJSON()
    }
})

export const logOut = createAsyncThunk("auth/logOut", async (_, { rejectWithValue }) => {
    const response = await logOutService()
    if ("message" in response) {
        return rejectWithValue(response.message);
    }
    return response
})

export const sendVerificationEmail = createAsyncThunk("auth/verifyEmail", async (_, { rejectWithValue }) => {
    const response = await verificationService();
    if ("message" in response) {
        return rejectWithValue(response.message);
    }
    return response
})

export const updateProfile = createAsyncThunk("auth/updateProfile", async (_, { rejectWithValue }) => {
    const servicePayload = parseUpdateUserProfilePayload()
    if (servicePayload === null) {
        return rejectWithValue(i18n.t("errors.auth.noChangesInProfile"));
    }
    const response = await updateProfileService(servicePayload);
    if ("message" in response) {
        return rejectWithValue(response.message);
    }
    return response
})

export const { setUserData, clearUserData, beginUserEdition } = authSlice.actions

export default authSlice.reducer;