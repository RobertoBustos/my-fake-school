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
  logOut
} from "@reducers/authReducer"
import { generateRandomUid } from "@utils/index";

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
      state.alerts = [
        ...state.alerts,
        {
          alertId: generateRandomUid(),
          message: i18n.t("confirmations.subject.addedSuccesfully"),
          type: "success",
          dismisable: true,
        },
      ];
    });
    builder.addCase(addNewSubject.rejected, (state, action) => {
      state.appLoaderStatus = "idle";
      state.alerts = [
        ...state.alerts,
        {
          alertId: generateRandomUid(),
          message: action.payload as string,
          type: "danger",
          dismisable: true,
        },
      ];
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
      state.alerts = [
        ...state.alerts,
        {
          alertId: generateRandomUid(),
          message: i18n.t("confirmations.subject.removedSuccesfully"),
          type: "success",
          dismisable: true,
        },
      ];
    });
    builder.addCase(deleteExistingSubject.rejected, (state, action) => {
      state.appLoaderStatus = "idle";
      state.alerts = [
        ...state.alerts,
        {
          alertId: generateRandomUid(),
          message: action.payload as string,
          type: "danger",
          dismisable: true,
        },
      ];
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
      state.alerts = [
        ...state.alerts,
        {
          alertId: generateRandomUid(),
          message: i18n.t("confirmations.subject.editedSuccesfully"),
          type: "success",
          dismisable: true,
        },
      ];
    });
    builder.addCase(editExistingSubject.rejected, (state, action) => {
      state.appLoaderStatus = "idle";
      state.alerts = [
        ...state.alerts,
        {
          alertId: generateRandomUid(),
          message: action.payload as string,
          type: "danger",
          dismisable: true,
        },
      ];
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
      state.alerts = [
        ...state.alerts,
        {
          alertId: generateRandomUid(),
          message: action.payload as string,
          type: "danger",
          dismisable: true,
        },
      ];
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
      state.alerts = [
        ...state.alerts,
        {
          alertId: generateRandomUid(),
          message: action.payload as string,
          type: "danger",
          dismisable: true,
        },
      ];
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
      state.alerts = [
        ...state.alerts,
        {
          alertId: generateRandomUid(),
          message: action.payload as string,
          type: "danger",
          dismisable: true,
        },
      ];
    });
    //sendVerificationEmail
    builder.addCase(sendVerificationEmail.pending, (state) => {
      state.appLoaders = [...state.appLoaders, AppLoaders.SEND_EMAIL_VERIFICATION]
    });
    builder.addCase(sendVerificationEmail.fulfilled, (state) => {
      state.appLoaders = state.appLoaders.filter(value => value !== AppLoaders.SEND_EMAIL_VERIFICATION)
      state.alerts = [
        ...state.alerts,
        {
          alertId: generateRandomUid(),
          message: i18n.t("confirmations.user.verificationEmailSent"),
          type: "success",
          dismisable: true,
        },
      ];
    });
    builder.addCase(sendVerificationEmail.rejected, (state, action) => {
      state.appLoaders = state.appLoaders.filter(value => value !== AppLoaders.SEND_EMAIL_VERIFICATION)
      state.alerts = [
        ...state.alerts,
        {
          alertId: generateRandomUid(),
          message: action.payload as string,
          type: "danger",
          dismisable: true,
        },
      ];
    });
    //updateUserProfile
    builder.addCase(updateProfile.pending, (state) => {
      state.appLoaders = [...state.appLoaders, AppLoaders.UPDATE_PROFILE]
    });
    builder.addCase(updateProfile.fulfilled, (state) => {
      state.appLoaders = state.appLoaders.filter(value => value !== AppLoaders.UPDATE_PROFILE)
      state.alerts = [
        ...state.alerts,
        {
          alertId: generateRandomUid(),
          message: i18n.t("confirmations.user.profileUpdated"),
          type: "success",
          dismisable: true,
        },
      ];
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.appLoaders = state.appLoaders.filter(value => value !== AppLoaders.UPDATE_PROFILE)
      state.alerts = [
        ...state.alerts,
        {
          alertId: generateRandomUid(),
          message: action.payload as string,
          type: "danger",
          dismisable: true,
        },
      ];
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
      state.alerts = [
        ...state.alerts,
        {
          alertId: generateRandomUid(),
          message: action.payload as string,
          type: "danger",
          dismisable: true,
        },
      ];
    });
  },
});

export const { showLoadingSpinner, hideLoadingSpinner, hideModal, showModal, closeAlert } =
  indicatorsSlice.actions;
export default indicatorsSlice.reducer;
