import type {
    AddSubjectPayloadType,
    DeleteSubjectPayloadType,
    EditSubjectPayloadType,
} from "@customTypes/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    addSubject,
    deleteSubject,
    getSubjectCatalog,
    updateSubject,
} from "@services/index";
import i18n from "i18next";
export { beginSubjectDelete, beginSubjectEdition, cancelSubjectDelete, cancelSubjectEdition } from "@reducers/subjectReducer";

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