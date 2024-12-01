import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import i18n from "i18next";
import { IndicatorsState } from "@redux/types";
import { AppLoaders, ModalListType } from "@customTypes/index";
import {
  addNewSubject,
  fetchAllSubjects,
  deleteExistingSubject,
  beginSubjectEdition,
  editExistingSubject,
  cancelSubjectEdition,
  beginSubjectDelete,
  cancelSubjectDelete,
} from "@reducers/subjectReducer";
import {
  signUp, logIn, sendVerificationEmail, updateProfile, setUserData, clearUserData, uploadUserProfilePicture,
  logOut, setUserUpdatedData
} from "@reducers/authReducer"
import { addAlertToState } from "@utils/index";

const initialState: IndicatorsState = {
  appLoaderStatus: "loading",
  visibleModals: [],
  alerts: [],
  featureFlags: [],
  appLoaders: []
};

export const indicatorsSlice = createSlice({
  name: "indicators",
  initialState,
  reducers: {
    showLoadingSpinner: (state) => {
      state.appLoaderStatus = "loading"
    },
    hideLoadingSpinner: (state) => {
      state.appLoaderStatus = "idle"
    },
    showModal: (state, action: PayloadAction<ModalListType>) => {
      state.visibleModals = [...state.visibleModals, action.payload];
    },
    hideModal: (state, action: PayloadAction<ModalListType>) => {
      state.visibleModals = state.visibleModals.filter(
        (value) => value !== action.payload
      );
    },
    setError: (state, action: PayloadAction<string>) => {
      state.alerts = addAlertToState(state, action.payload, "danger", true);
    },
    closeAlert: (state, action: PayloadAction<string>) => {
      state.alerts = state.alerts.filter(
        (alert) => alert.alertId !== action.payload
      );
    },
    registerFeatureFlags: (state, action) => {
      state.featureFlags = action.payload
    },
  },
  extraReducers: (builder) => {
    //fetch all subjects
    builder.addCase(fetchAllSubjects.pending, (state) => {
      state.appLoaderStatus = "loading";
    });
    builder.addCase(fetchAllSubjects.fulfilled, (state) => {
      state.appLoaderStatus = "idle";
    });
    builder.addCase(fetchAllSubjects.rejected, (state) => {
      state.appLoaderStatus = "idle";
    });
    //add new subject
    builder.addCase(addNewSubject.pending, (state) => {
      state.appLoaderStatus = "loading";
    });
    builder.addCase(addNewSubject.fulfilled, (state) => {
      state.appLoaderStatus = "idle";
      state.alerts = addAlertToState(state, i18n.t("confirmations.subject.addedSuccesfully"), "success", true)
    });
    builder.addCase(addNewSubject.rejected, (state, action) => {
      state.appLoaderStatus = "idle";
      state.alerts = addAlertToState(state, action.payload as string, "danger", true)
    });
    //remove existing subject
    builder.addCase(beginSubjectDelete, (state) => {
      state.visibleModals.push(ModalListType.DELETE_SUBJECT_MODAL);
    });
    builder.addCase(cancelSubjectDelete, (state) => {
      state.visibleModals = [];
    });

    builder.addCase(deleteExistingSubject.pending, (state) => {
      state.appLoaderStatus = "loading";
    });
    builder.addCase(deleteExistingSubject.fulfilled, (state) => {
      state.visibleModals = [];
      state.appLoaderStatus = "idle";
      state.alerts = addAlertToState(state, i18n.t("confirmations.subject.removedSuccesfully"), "success", true)
    });
    builder.addCase(deleteExistingSubject.rejected, (state, action) => {
      state.appLoaderStatus = "idle";
      state.alerts = addAlertToState(state, action.payload as string, "danger", true)
    });
    //edit existing subject
    builder.addCase(beginSubjectEdition, (state) => {
      state.visibleModals.push(ModalListType.EDIT_SUBJECT_MODAL);
    });
    builder.addCase(cancelSubjectEdition, (state) => {
      state.visibleModals = [];
    });

    builder.addCase(editExistingSubject.pending, (state) => {
      state.appLoaderStatus = "loading";
    });
    builder.addCase(editExistingSubject.fulfilled, (state) => {
      state.visibleModals = [];
      state.appLoaderStatus = "idle";
      state.alerts = addAlertToState(state, i18n.t("confirmations.subject.editedSuccesfully"), "success", true)
    });
    builder.addCase(editExistingSubject.rejected, (state, action) => {
      state.appLoaderStatus = "idle";
      state.alerts = addAlertToState(state, action.payload as string, "danger", true)
    });
    //load user data
    builder.addCase(setUserData, (state) => {
      state.appLoaderStatus = "idle"
    });
    //clear user data
    builder.addCase(clearUserData, (state) => {
      state.appLoaderStatus = "idle"
    })
    //signUp
    builder.addCase(signUp.pending, (state) => {
      state.appLoaders = [...state.appLoaders, AppLoaders.SIGN_UP]
    });
    builder.addCase(signUp.fulfilled, (state) => {
      state.appLoaders = state.appLoaders.filter(value => value !== AppLoaders.SIGN_UP)
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.appLoaders = state.appLoaders.filter(value => value !== AppLoaders.SIGN_UP)
      state.alerts = addAlertToState(state, action.payload as string, "danger", true)
    });
    //logIn
    builder.addCase(logIn.pending, (state) => {
      state.appLoaders = [...state.appLoaders, AppLoaders.LOG_IN]
    });
    builder.addCase(logIn.fulfilled, (state) => {
      state.appLoaders = state.appLoaders.filter(value => value !== AppLoaders.LOG_IN)
    });
    builder.addCase(logIn.rejected, (state, action) => {
      state.appLoaders = state.appLoaders.filter(value => value !== AppLoaders.LOG_IN)
      state.alerts = addAlertToState(state, action.payload as string, "danger", true)
    });
    //logout
    builder.addCase(logOut.pending, (state) => {
      state.appLoaders = [...state.appLoaders, AppLoaders.LOG_OUT]
    });
    builder.addCase(logOut.fulfilled, (state) => {
      state.appLoaders = state.appLoaders.filter(value => value !== AppLoaders.LOG_OUT)
    });
    builder.addCase(logOut.rejected, (state, action) => {
      state.appLoaders = state.appLoaders.filter(value => value !== AppLoaders.LOG_OUT)
      state.alerts = addAlertToState(state, action.payload as string, "danger", true)
    });
    //sendVerificationEmail
    builder.addCase(sendVerificationEmail.pending, (state) => {
      state.appLoaders = [...state.appLoaders, AppLoaders.SEND_EMAIL_VERIFICATION]
    });
    builder.addCase(sendVerificationEmail.fulfilled, (state) => {
      state.appLoaders = state.appLoaders.filter(value => value !== AppLoaders.SEND_EMAIL_VERIFICATION)
      state.alerts = addAlertToState(state, i18n.t("confirmations.user.verificationEmailSent"), "success", true)
    });
    builder.addCase(sendVerificationEmail.rejected, (state, action) => {
      state.appLoaders = state.appLoaders.filter(value => value !== AppLoaders.SEND_EMAIL_VERIFICATION)
      state.alerts = addAlertToState(state, action.payload as string, "danger", true)
    });
    //updateUserProfile
    builder.addCase(updateProfile.pending, (state) => {
      state.appLoaders = [...state.appLoaders, AppLoaders.UPDATE_PROFILE]
    });
    builder.addCase(updateProfile.fulfilled, (state) => {
      state.appLoaders = state.appLoaders.filter(value => value !== AppLoaders.UPDATE_PROFILE)
      state.alerts = addAlertToState(state, i18n.t("confirmations.user.profileUpdated"), "success", true)
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.appLoaders = state.appLoaders.filter(value => value !== AppLoaders.UPDATE_PROFILE)
      state.alerts = addAlertToState(state, action.payload as string, "danger", true)
    });
    //uploadProfilePicture
    builder.addCase(uploadUserProfilePicture.pending, (state) => {
      state.appLoaders = [...state.appLoaders, AppLoaders.UPLOAD_PROFILE_PICTURE]
    });
    builder.addCase(uploadUserProfilePicture.fulfilled, (state) => {
      state.appLoaders = state.appLoaders.filter(value => value !== AppLoaders.UPLOAD_PROFILE_PICTURE)
    });
    builder.addCase(uploadUserProfilePicture.rejected, (state, action) => {
      state.appLoaders = state.appLoaders.filter(value => value !== AppLoaders.UPLOAD_PROFILE_PICTURE)
      state.alerts = addAlertToState(state, action.payload as string, "danger", true)
    });
    //setUserUpdateData
    builder.addCase(setUserUpdatedData, (state) => {
      state.alerts = addAlertToState(state, i18n.t("confirmations.user.profileUpdated"), "success", true);
    })
  },
});

export const { showLoadingSpinner, hideLoadingSpinner, hideModal, showModal, closeAlert, setError } =
  indicatorsSlice.actions;
export default indicatorsSlice.reducer;
