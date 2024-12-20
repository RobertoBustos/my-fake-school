import { AppLoaders, ModalListType } from "@customTypes/index";
import {
  clearUserData,
  logIn,
  logOut,
  sendVerificationEmail,
  setUserData,
  signUp,
  updateProfile,
  uploadUserProfilePicture
} from "@reducers/authReducer";
import {
  addNewSubject,
  beginSubjectDelete,
  beginSubjectEdition,
  cancelSubjectDelete,
  cancelSubjectEdition,
  deleteExistingSubject,
  editExistingSubject,
  fetchAllSubjects,
} from "@reducers/subjectReducer";
import { IndicatorsState } from "@redux/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IndicatorsState = {
  appLoaderStatus: "loading",
  visibleModals: [],
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
    });
    builder.addCase(addNewSubject.rejected, (state) => {
      state.appLoaderStatus = "idle";
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
    });
    builder.addCase(deleteExistingSubject.rejected, (state) => {
      state.appLoaderStatus = "idle";
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
    });
    builder.addCase(editExistingSubject.rejected, (state) => {
      state.appLoaderStatus = "idle";
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
    builder.addCase(signUp.rejected, (state) => {
      state.appLoaders = state.appLoaders.filter(value => value !== AppLoaders.SIGN_UP)
    });
    //logIn
    builder.addCase(logIn.pending, (state) => {
      state.appLoaders = [...state.appLoaders, AppLoaders.LOG_IN]
    });
    builder.addCase(logIn.fulfilled, (state) => {
      state.appLoaders = state.appLoaders.filter(value => value !== AppLoaders.LOG_IN)
    });
    builder.addCase(logIn.rejected, (state) => {
      state.appLoaders = state.appLoaders.filter(value => value !== AppLoaders.LOG_IN)
    });
    //logout
    builder.addCase(logOut.pending, (state) => {
      state.appLoaders = [...state.appLoaders, AppLoaders.LOG_OUT]
    });
    builder.addCase(logOut.fulfilled, (state) => {
      state.appLoaders = state.appLoaders.filter(value => value !== AppLoaders.LOG_OUT)
    });
    builder.addCase(logOut.rejected, (state) => {
      state.appLoaders = state.appLoaders.filter(value => value !== AppLoaders.LOG_OUT)
    });
    //sendVerificationEmail
    builder.addCase(sendVerificationEmail.pending, (state) => {
      state.appLoaders = [...state.appLoaders, AppLoaders.SEND_EMAIL_VERIFICATION]
    });
    builder.addCase(sendVerificationEmail.fulfilled, (state) => {
      state.appLoaders = state.appLoaders.filter(value => value !== AppLoaders.SEND_EMAIL_VERIFICATION)
    });
    builder.addCase(sendVerificationEmail.rejected, (state) => {
      state.appLoaders = state.appLoaders.filter(value => value !== AppLoaders.SEND_EMAIL_VERIFICATION)
    });
    //updateUserProfile
    builder.addCase(updateProfile.pending, (state) => {
      state.appLoaders = [...state.appLoaders, AppLoaders.UPDATE_PROFILE]
    });
    builder.addCase(updateProfile.fulfilled, (state) => {
      state.appLoaders = state.appLoaders.filter(value => value !== AppLoaders.UPDATE_PROFILE)
    });
    builder.addCase(updateProfile.rejected, (state) => {
      state.appLoaders = state.appLoaders.filter(value => value !== AppLoaders.UPDATE_PROFILE)
    });
    //uploadProfilePicture
    builder.addCase(uploadUserProfilePicture.pending, (state) => {
      state.appLoaders = [...state.appLoaders, AppLoaders.UPLOAD_PROFILE_PICTURE]
    });
    builder.addCase(uploadUserProfilePicture.fulfilled, (state) => {
      state.appLoaders = state.appLoaders.filter(value => value !== AppLoaders.UPLOAD_PROFILE_PICTURE)
    });
    builder.addCase(uploadUserProfilePicture.rejected, (state) => {
      state.appLoaders = state.appLoaders.filter(value => value !== AppLoaders.UPLOAD_PROFILE_PICTURE)
    });
  },
});

export const { showLoadingSpinner, hideLoadingSpinner, hideModal, showModal } =
  indicatorsSlice.actions;
export default indicatorsSlice.reducer;
