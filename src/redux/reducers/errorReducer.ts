import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ErrorState } from "../types/index";
import {
  addNewSubject,
  editExistingSubject,
  fetchAllSubjects,
  deleteExistingSubject,
} from "./subjectReducer";

const initialState: ErrorState = {
  error: "",
  isAlertVisible: false,
};

export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isAlertVisible = true;
    },
    clearError: (state) => {
      state.error = "";
      state.isAlertVisible = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllSubjects.rejected, (state, action) => {
      state.error = action.payload as string;
      state.isAlertVisible = true;
    });
    builder.addCase(addNewSubject.rejected, (state, action) => {
      state.error = action.payload as string;
      state.isAlertVisible = true;
    });
    builder.addCase(editExistingSubject.rejected, (state, action) => {
      state.error = action.payload as string;
      state.isAlertVisible = true;
    });
    builder.addCase(deleteExistingSubject.rejected, (state, action) => {
      state.error = action.payload as string;
      state.isAlertVisible = true;
    });
  },
});

export const { setError, clearError } = errorSlice.actions;

export default errorSlice.reducer;
