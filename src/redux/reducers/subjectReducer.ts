import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {
  AddSubjectPayloadType,
  DeleteSubjectPayloadType,
  EditSubjectPayloadType,
  SubjectType,
} from "../../constants/subjectTypes";
import type { SubjectState } from "../types/index";
import {
  getSubjectCatalog,
  addSubject,
  deleteSubject,
  updateSubject,
} from "../../services/subjectServices";

const initialState: SubjectState = {
  subjectCatalog: [],
  subjectManipulationInProgress: {
    subjectId: "",
    subjectName: "",
    isDeleted: false,
  },
};

export const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {
    beginSubjectEdition: (state, action: PayloadAction<SubjectType>) => {
      state.subjectManipulationInProgress = action.payload;
    },
    cancelSubjectEdition: (state) => {
      state.subjectManipulationInProgress = {
        subjectId: "",
        subjectName: "",
        isDeleted: false,
      };
    },
    beginSubjectDelete: (state, action: PayloadAction<SubjectType>) => {
      state.subjectManipulationInProgress = action.payload;
    },
    cancelSubjectDelete: (state) => {
      state.subjectManipulationInProgress = {
        subjectId: "",
        subjectName: "",
        isDeleted: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSubjects.fulfilled, (state, action) => {
        state.subjectCatalog = action.payload;
      })
      .addCase(addNewSubject.fulfilled, (state, action) => {
        state.subjectCatalog = [...state.subjectCatalog, action.payload];
      })
      .addCase(editExistingSubject.fulfilled, (state, action) => {
        const subject = state.subjectCatalog.find(
          (subject) => subject.subjectId === action.payload.subjectId
        );
        if (subject) {
          subject.subjectName = action.payload.newData.subjectName;
        }
        state.subjectManipulationInProgress = {
          subjectId: "",
          subjectName: "",
          isDeleted: false,
        };
      })
      .addCase(deleteExistingSubject.fulfilled, (state, action) => {
        state.subjectCatalog = state.subjectCatalog.filter(
          (subject) => subject.subjectId !== action.payload.subjectId
        );
        state.subjectManipulationInProgress = {
          subjectId: "",
          subjectName: "",
          isDeleted: false,
        };
      });
  },
});

export const fetchAllSubjects = createAsyncThunk(
  "subject/fetchAll",
  async (_, thunkApi) => {
    const response = await getSubjectCatalog();
    if (response instanceof Error) {
      return thunkApi.rejectWithValue(response.message);
    }
    return response;
  }
);

export const addNewSubject = createAsyncThunk(
  "subject/addNewSubject",
  async (subjectName: AddSubjectPayloadType, thunkApi) => {
    if (subjectName === "") {
      return thunkApi.rejectWithValue("Please write the subject name");
    }
    const response = await addSubject({
      subjectName: subjectName,
      isDeleted: false,
    });
    if (response instanceof Error) {
      return thunkApi.rejectWithValue(response.message);
    }
    return response;
  }
);

export const editExistingSubject = createAsyncThunk(
  "subject/editExistingSubject",
  async (payload: EditSubjectPayloadType, thunkApi) => {
    if (payload.subjectId === "" || payload.newData.subjectName === "") {
      return thunkApi.rejectWithValue("Subject id and name is required");
    }
    const response = await updateSubject(payload);
    if (response instanceof Error) {
      return thunkApi.rejectWithValue(response.message);
    }
    return payload;
  }
);

export const deleteExistingSubject = createAsyncThunk(
  "subject/removeExistingSubject",
  async (payload: DeleteSubjectPayloadType, thunkApi) => {
    if (payload.subjectId === "") {
      return thunkApi.rejectWithValue("Subject id is required");
    }
    const response = await deleteSubject(payload);
    if (response instanceof Error) {
      return thunkApi.rejectWithValue(response.message);
    }
    return payload;
  }
);

export const {
  beginSubjectEdition,
  cancelSubjectEdition,
  beginSubjectDelete,
  cancelSubjectDelete,
} = subjectSlice.actions;

export default subjectSlice.reducer;