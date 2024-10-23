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
  subjectEditionInProgress: {
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
      state.subjectEditionInProgress = action.payload;
    },
    cancelSubjectEdition: (state) => {
      state.subjectEditionInProgress = {
        subjectId: "",
        subjectName: "",
        isDeleted: false,
      };
    },
    removeExistingSubjectLocally: (
      state,
      action: PayloadAction<DeleteSubjectPayloadType>
    ) => {
      state.subjectCatalog = state.subjectCatalog.filter((subject, index) => {
        return subject.subjectId !== action.payload;
      });
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
        state.subjectEditionInProgress = {
          subjectId: "",
          subjectName: "",
          isDeleted: false,
        };
      })
      .addCase(removeExistingSubject.fulfilled, (state, action) => {
        state.subjectCatalog = state.subjectCatalog.filter(
          (subject) => subject.subjectId !== action.payload
        );
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

export const removeExistingSubject = createAsyncThunk(
  "subject/removeExistingSubject",
  async (subjectId: DeleteSubjectPayloadType, thunkApi) => {
    if (subjectId === "") {
      return thunkApi.rejectWithValue("Subject id is required");
    }
    const response = await deleteSubject({
      subjectId: subjectId,
    });
    if (response instanceof Error) {
      return thunkApi.rejectWithValue(response.message);
    }
    return subjectId;
  }
);

export const {
  removeExistingSubjectLocally,
  beginSubjectEdition,
  cancelSubjectEdition,
} = subjectSlice.actions;

export default subjectSlice.reducer;
