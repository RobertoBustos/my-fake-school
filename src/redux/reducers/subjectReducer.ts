import {
  AppLoaders,
  ModalWindows,
  type AddSubjectPayloadType,
  type DeleteSubjectPayloadType,
  type EditSubjectPayloadType,
  type SubjectType,
} from "@customTypes/index";
import type { SubjectState } from "@redux/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addSubjectService,
  deleteSubjectService,
  fetchSubjectsService,
  updateSubjectService
} from "@services/index";
import { notify } from "@utils/index";
import i18n from "i18next";

const initialState: SubjectState = {
  subjectCatalog: [],
  subjectManipulationInProgress: {
    subjectId: "",
    subjectName: "",
    isDeleted: false,
  },
  activeSubjectLoaders: [],
  visibleModals: []
};

export const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {
    beginSubjectEdition: (state, action: PayloadAction<SubjectType>) => {
      state.subjectManipulationInProgress = action.payload;
      state.visibleModals = [...state.visibleModals, ModalWindows.EDIT_SUBJECT_MODAL]
    },
    cancelSubjectEdition: (state) => {
      state.subjectManipulationInProgress = {
        subjectId: "",
        subjectName: "",
        isDeleted: false,
      };
      state.visibleModals = state.visibleModals.filter(value => value !== ModalWindows.EDIT_SUBJECT_MODAL)
    },
    beginSubjectDelete: (state, action: PayloadAction<SubjectType>) => {
      state.subjectManipulationInProgress = action.payload;
      state.visibleModals = [...state.visibleModals, ModalWindows.DELETE_SUBJECT_MODAL]
    },
    cancelSubjectDelete: (state) => {
      state.subjectManipulationInProgress = {
        subjectId: "",
        subjectName: "",
        isDeleted: false,
      };
      state.visibleModals = state.visibleModals.filter(value => value !== ModalWindows.DELETE_SUBJECT_MODAL)
    },
  },
  extraReducers: (builder) => {
    //fetchAllSubjects
    builder.addCase(fetchSubjects.pending, (state) => {
      state.activeSubjectLoaders = [...state.activeSubjectLoaders, AppLoaders.FETCH_SUBJECTS]
    })
    builder.addCase(fetchSubjects.fulfilled, (state, action) => {
      state.subjectCatalog = action.payload;
      state.activeSubjectLoaders = state.activeSubjectLoaders.filter(value => value !== AppLoaders.FETCH_SUBJECTS)
    })
    builder.addCase(fetchSubjects.rejected, (state) => {
      state.activeSubjectLoaders = state.activeSubjectLoaders.filter(value => value !== AppLoaders.FETCH_SUBJECTS)
    })
    //addNewSubject
    builder.addCase(addSubject.pending, (state) => {
      state.activeSubjectLoaders = [...state.activeSubjectLoaders, AppLoaders.ADD_SUBJECT]
    })
    builder.addCase(addSubject.fulfilled, (state, action) => {
      state.subjectCatalog = [...state.subjectCatalog, action.payload];
      state.activeSubjectLoaders = state.activeSubjectLoaders.filter(value => value !== AppLoaders.ADD_SUBJECT)
      notify.success(i18n.t("confirmations.subject.addedSuccesfully"))
    })
    builder.addCase(addSubject.rejected, (state, action) => {
      state.activeSubjectLoaders = state.activeSubjectLoaders.filter(value => value !== AppLoaders.ADD_SUBJECT)
      notify.error(action.payload as string)
    })
    //updateSubject
    builder.addCase(updateSubject.pending, (state) => {
      state.activeSubjectLoaders = [...state.activeSubjectLoaders, AppLoaders.UPDATE_SUBJECT]
    })
    builder.addCase(updateSubject.fulfilled, (state, action) => {
      state.activeSubjectLoaders = state.activeSubjectLoaders.filter(value => value !== AppLoaders.UPDATE_SUBJECT)
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
      notify.success(i18n.t("confirmations.subject.editedSuccesfully"))
    })
    builder.addCase(updateSubject.rejected, (state, action) => {
      state.activeSubjectLoaders = state.activeSubjectLoaders.filter(value => value !== AppLoaders.UPDATE_SUBJECT)
      notify.error(action.payload as string)
    })
    //deleteSubject
    builder.addCase(deleteSubject.pending, (state) => {
      state.activeSubjectLoaders = [...state.activeSubjectLoaders, AppLoaders.DELETE_SUBJECT]
    })
    builder.addCase(deleteSubject.fulfilled, (state, action) => {
      state.activeSubjectLoaders = state.activeSubjectLoaders.filter(value => value !== AppLoaders.DELETE_SUBJECT)
      state.subjectCatalog = state.subjectCatalog.filter(
        (subject) => subject.subjectId !== action.payload.subjectId
      );
      state.subjectManipulationInProgress = {
        subjectId: "",
        subjectName: "",
        isDeleted: false,
      };
      notify.success(i18n.t("confirmations.subject.removedSuccesfully"))
    })
    builder.addCase(deleteSubject.rejected, (state, action) => {
      state.activeSubjectLoaders = state.activeSubjectLoaders.filter(value => value !== AppLoaders.DELETE_SUBJECT)
      notify.error(action.payload as string)
    })
  },
});

export const fetchSubjects = createAsyncThunk(
  "subject/fetchAll",
  async (_, thunkApi) => {
    const response = await fetchSubjectsService();
    if (response instanceof Error) {
      return thunkApi.rejectWithValue(response.message);
    }
    return response;
  }
);

export const addSubject = createAsyncThunk(
  "subject/addNewSubject",
  async (subjectName: AddSubjectPayloadType, thunkApi) => {
    if (subjectName === "") {
      return thunkApi.rejectWithValue(i18n.t("errors.subject.nameRequired"));
    }
    //return { subjectName: subjectName, isDeleted: false, subjectId: "" };
    const response = await addSubjectService({
      subjectName: subjectName,
      isDeleted: false,
    });
    if (response instanceof Error) {
      return thunkApi.rejectWithValue(response.message);
    }
    return response;
  }
);

export const updateSubject = createAsyncThunk(
  "subject/editExistingSubject",
  async (payload: EditSubjectPayloadType, thunkApi) => {
    if (payload.subjectId === "" || payload.newData.subjectName === "") {
      return thunkApi.rejectWithValue(i18n.t("errors.subject.idRequired"));
    }
    const response = await updateSubjectService(payload);
    if (response instanceof Error) {
      return thunkApi.rejectWithValue(response.message);
    }
    return payload;
  }
);

export const deleteSubject = createAsyncThunk(
  "subject/removeExistingSubject",
  async (payload: DeleteSubjectPayloadType, thunkApi) => {
    if (payload.subjectId === "") {
      return thunkApi.rejectWithValue(i18n.t("errors.subject.idRequired"));
    }
    const response = await deleteSubjectService(payload);
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
