import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import i18n from "i18next";
import type {
  AddSubjectPayloadType,
  DeleteSubjectPayloadType,
  EditSubjectPayloadType,
  SubjectType,
} from "@customTypes/index";
import type { SubjectState } from "@redux/types/index";
import {
  getSubjectCatalog,
  addSubject,
  deleteSubject,
  updateSubject,
} from "@services/subjectServices";
import { notify } from "@utils/index";

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
        notify.success(i18n.t("confirmations.subject.addedSuccesfully"))
      })
      .addCase(addNewSubject.rejected, (_, action) => {
        notify.error(action.payload as string)
      })
      .addCase(editExistingSubject.fulfilled, (state, action) => {
        notify.success(i18n.t("confirmations.subject.editedSuccesfully"))
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
      .addCase(editExistingSubject.rejected, (_, action) => {
        notify.error(action.payload as string)
      })
      .addCase(deleteExistingSubject.fulfilled, (state, action) => {
        notify.success(i18n.t("confirmations.subject.removedSuccesfully"))
        state.subjectCatalog = state.subjectCatalog.filter(
          (subject) => subject.subjectId !== action.payload.subjectId
        );
        state.subjectManipulationInProgress = {
          subjectId: "",
          subjectName: "",
          isDeleted: false,
        };
      })
      .addCase(deleteExistingSubject.rejected, (_, action) => {
        notify.error(action.payload as string)
      })
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
      return thunkApi.rejectWithValue(i18n.t("errors.subject.nameRequired"));
    }
    //return { subjectName: subjectName, isDeleted: false, subjectId: "" };
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
      return thunkApi.rejectWithValue(i18n.t("errors.subject.idRequired"));
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
      return thunkApi.rejectWithValue(i18n.t("errors.subject.idRequired"));
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
