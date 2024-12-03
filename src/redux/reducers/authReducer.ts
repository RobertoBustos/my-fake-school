import { i18n } from "@config/index";
import type { UpdateServicePayloadType, UserDataType, UserProfileNewValue, UserSignInPayloadType, UserSignUpPayloadType, UserUploadProfilePicturePayloadType, } from "@customTypes/index";
import type { AuthState } from "@redux/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteProfilePictureUnsavedService, logOutService, signInService, signUpService, updateProfileService, uploadProfilePictureService, validateCredentials, verificationService } from "@services/index";
import { isProfilePictureChanged, notify, parseUpdateUserProfilePayload, removeKeyFromObject, shapeFirebaseAuthError } from "@utils/index";

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
            } else {
                const newUserManipulationInProgress = { ...state.userManipulationInProgress, [action.payload.field]: action.payload.value };
                state.userManipulationInProgress = newUserManipulationInProgress;
            }
            if (state.userCredential.displayName === state.userManipulationInProgress.displayName) {
                state.userManipulationInProgress = removeKeyFromObject(state.userManipulationInProgress, "displayName")
            }
        },
        setUserUpdatedData: (state, { payload }: PayloadAction<UpdateServicePayloadType>) => {
            if (payload.profile?.displayName) {
                state.userCredential.displayName = payload.profile?.displayName
            }
            if (payload.profile?.photoURL) {
                state.userCredential.photoURL = payload.profile?.photoURL
            }
            if (payload.password?.newPassword) {
                state.userCredential.currentPassword = payload.password?.newPassword
            }
            notify.success(i18n.t("confirmations.user.profileUpdated"))
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signUp.rejected, (_, action) => {
            notify.error(action.payload as string)
        });
        builder.addCase(logIn.rejected, (_, action) => {
            notify.error(action.payload as string)
        });
        builder.addCase(logOut.rejected, (_, action) => {
            notify.error(action.payload as string)
        });
        builder.addCase(sendVerificationEmail.fulfilled, (_, action) => {
            notify.success(i18n.t("confirmations.user.verificationEmailSent"))
        });
        builder.addCase(sendVerificationEmail.rejected, (_, action) => {
            notify.error(action.payload as string)
        });
        builder.addCase(updateProfile.fulfilled, (state) => {
            notify.success(i18n.t("confirmations.user.profileUpdated"))
            if (state.userManipulationInProgress.displayName) {
                state.userCredential.displayName = state.userManipulationInProgress.displayName
            }
            if (state.userManipulationInProgress.photoURL) {
                state.userCredential.photoURL = state.userManipulationInProgress.photoURL
            }
            state.userManipulationInProgress = {}
        });
        builder.addCase(updateProfile.rejected, (_, action) => {
            notify.error(action.payload as string)
        });
        builder.addCase(uploadUserProfilePicture.fulfilled, (state, action) => {
            state.userManipulationInProgress.photoURL = action.payload.downloadURL
        })
        builder.addCase(uploadUserProfilePicture.rejected, (_, action) => {
            notify.error(action.payload as string)
        });
        builder.addCase(clearUserUpdateData.fulfilled, (state) => {
            state.userManipulationInProgress = {}
        });
    }
})

export const signUp = createAsyncThunk("auth/signUp", async (payload: UserSignUpPayloadType, { rejectWithValue }) => {
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
    if (servicePayload.password) {
        const credentialResponse = await validateCredentials(
            servicePayload.password?.currentPassword || ""
        );
        if ("message" in credentialResponse) {
            return rejectWithValue(i18n.t(`errors.${shapeFirebaseAuthError(credentialResponse.message)}`))
        }
    }
    const pictureChangeValidation = isProfilePictureChanged();
    if (pictureChangeValidation.result) {
        await deleteProfilePictureUnsavedService(pictureChangeValidation.previousValue || "")
    }
    const response = await updateProfileService(servicePayload);
    if ("message" in response) {
        return rejectWithValue(response.message);
    }
    return response
})

export const uploadUserProfilePicture = createAsyncThunk("auth/uploadProfilePicture", async (payload: UserUploadProfilePicturePayloadType, { rejectWithValue }) => {
    if (!payload.file || payload.file === null) {
        rejectWithValue("file not provided to upload.")
    }
    const response = await uploadProfilePictureService({ file: payload.file, path: "users/" + payload.file.name })
    if ("message" in response) {
        return rejectWithValue(i18n.t(`errors.${shapeFirebaseAuthError(response.message)}`));
    }
    return response
})

export const clearUserUpdateData = createAsyncThunk("auth/clearUserUpdateData", async (_, { rejectWithValue }) => {
    const pictureChangeValidation = isProfilePictureChanged();
    if (pictureChangeValidation.result) {
        const response = await deleteProfilePictureUnsavedService(pictureChangeValidation.newValue || "")
        return response
    }
    return;
})

export const { setUserData, clearUserData, beginUserEdition, setUserUpdatedData } = authSlice.actions

export default authSlice.reducer;