import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { IndicatorsState } from "../types/index";
import { ModalList } from "../types/index";
import {
  addNewSubject,
  fetchAllSubjects,
  removeExistingSubject,
  beginSubjectEdition,
  editExistingSubject,
  cancelSubjectEdition,
} from "./subjectReducer";

const initialState: IndicatorsState = {
  appLoaderStatus: "idle",
  visibleModals: [],
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
    builder.addCase(removeExistingSubject.pending, (state) => {
      state.appLoaderStatus = "loading";
    });
    builder.addCase(removeExistingSubject.fulfilled, (state) => {
      state.appLoaderStatus = "idle";
    });
    builder.addCase(removeExistingSubject.rejected, (state) => {
      state.appLoaderStatus = "idle";
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
    });
    builder.addCase(editExistingSubject.rejected, (state) => {
      state.appLoaderStatus = "idle";
    });
  },
});

export const { hideModal, showModal } = indicatorsSlice.actions;
export default indicatorsSlice.reducer;
