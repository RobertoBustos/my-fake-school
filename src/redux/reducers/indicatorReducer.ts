import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import i18n from "i18next";
import { IndicatorsState, ModalList, AlertType } from "../types/index";
import {
  addNewSubject,
  fetchAllSubjects,
  deleteExistingSubject,
  beginSubjectEdition,
  editExistingSubject,
  cancelSubjectEdition,
  beginSubjectDelete,
  cancelSubjectDelete,
} from "./subjectReducer";
import { generateRandomUid } from "../../utils/index";

const initialState: IndicatorsState = {
  appLoaderStatus: "idle",
  visibleModals: [],
  alerts: [],
};

export const indicatorsSlice = createSlice({
  name: "indicators",
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<ModalList>) => {
      state.visibleModals = [...state.visibleModals, action.payload];
    },
    hideModal: (state, action: PayloadAction<ModalList>) => {
      state.visibleModals = state.visibleModals.filter(
        (value) => value !== action.payload
      );
    },
    showAlert: (state, action: PayloadAction<AlertType>) => {
      state.alerts = [...state.alerts, action.payload];
    },
    closeAlert: (state, action: PayloadAction<string>) => {
      state.alerts = state.alerts.filter(
        (alert) => alert.alertId !== action.payload
      );
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
      state.visibleModals.push(ModalList.DELETE_SUBJECT_MODAL);
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
      state.visibleModals.push(ModalList.EDIT_SUBJECT_MODAL);
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
  },
});

export const { hideModal, showModal, showAlert, closeAlert } =
  indicatorsSlice.actions;
export default indicatorsSlice.reducer;
