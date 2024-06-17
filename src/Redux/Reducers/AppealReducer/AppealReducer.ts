import { createSlice } from "@reduxjs/toolkit";
import { AddAppealFailure, AddAppealRequest, AddAppealSuccess } from "./Types/ActionTypes/AddAppealTypes";
import { EditAppealFailure, EditAppealRequest, EditAppealSuccess } from "./Types/ActionTypes/EditAppealTypes";
import { DeleteAppealFailure, DeleteAppealRequest, DeleteAppealSuccess } from "./Types/ActionTypes/DeleteAppealTypes";
import {
    AddAppealCategoryFailure,
    AddAppealCategoryRequest,
    AddAppealCategorySuccess,
} from "./Types/ActionTypes/AddAppealCategoryTypes";
import {
    EditAppealCategoryFailure,
    EditAppealCategoryRequest,
    EditAppealCategorySuccess,
} from "./Types/ActionTypes/EditAppealCategoryTypes";
import {
    DeleteAppealCategoryFailure,
    DeleteAppealCategoryRequest,
    DeleteAppealCategorySuccess,
} from "./Types/ActionTypes/DeleteAppealCategoryTypes";
import { Appeal } from "./Types/Appeal";
import { AppealCategory } from "./Types/AppealCategory";
import {
    GetAppealCreatePageData,
    GetAppealCreatePageDataFailure,
    GetAppealCreatePageDataSuccess,
} from "./Types/ActionTypes/GetAppealCreatePageDataTypes";
import { GetAppealsSuccess } from "./Types/ActionTypes/GetAppealsTypes";
import { SetCoverImage, SetImage } from "./Types/ActionTypes/ImageTypes";

export type AppealState = {
    pending: boolean;
    appeals: Appeal[];
    categories: AppealCategory[];
    appealCreatePageData: GetAppealCreatePageData;
    error: string | null;
};

const initialState: AppealState = {
    pending: false,
    appeals: [],
    categories: [],
    error: null,
    appealCreatePageData: {
        appealCategories: [],
        profileSummaries: [],
        coverUrl: "",
        coverImage: null,
    },
};

export const appealSlice = createSlice({
    name: "appeal",
    initialState,
    reducers: {
        getAppealCreatePageRequest(state) {
            state.pending = true;
        },

        getAppealCreatePageSuccess(state, action: GetAppealCreatePageDataSuccess) {
            state.pending = false;
            state.error = null;
            // console.log(action.payload);
            state.appealCreatePageData = action.payload;
        },

        getAppealCreatePageFailure(state, action: GetAppealCreatePageDataFailure) {
            state.pending = false;
            state.error = action.payload;
        },

        getAppealsSuccess(state, action: GetAppealsSuccess) {
            state.pending = false;
            state.error = null;
            // console.log(action.payload);
            state.appeals = action.payload;
        },

        addAppealRequest(state, action: AddAppealRequest) {
            state.pending = true;
        },

        addAppealSuccess(state, action: AddAppealSuccess) {
            state.pending = false;
            state.error = null;
            state.appeals.push(action.payload);
        },

        addAppealFailure(state, action: AddAppealFailure) {
            state.pending = false;
            state.error = action.payload;
        },

        editAppealRequest(state, action: EditAppealRequest) {
            state.pending = true;
        },

        editAppealSuccess(state, action: EditAppealSuccess) {
            state.pending = false;
            const index = state.appeals.findIndex(appeal => appeal.id === action.payload.id);
            if (index !== -1) state.appeals[index] = action.payload;
            console.log("payload", action.payload);
            console.log("state", state.appeals);
        },

        editAppealFailure(state, action: EditAppealFailure) {
            state.pending = false;
            state.error = action.payload;
        },

        deleteAppealRequest(state, action: DeleteAppealRequest) {
            state.pending = true;
        },

        deleteAppealSuccess(state, action: DeleteAppealSuccess) {
            state.pending = false;
            state.appeals = state.appeals.filter(appeal => appeal.id !== action.payload.id);
        },

        deleteAppealFailure(state, action: DeleteAppealFailure) {
            state.pending = false;
            state.error = action.payload;
        },

        addAppealCategoryRequest(state, action: AddAppealCategoryRequest) {
            state.pending = true;
        },

        addAppealCategorySuccess(state, action: AddAppealCategorySuccess) {
            state.pending = false;
            state.error = null;
            state.categories.push(action.payload);
        },

        addAppealCategoryFailure(state, action: AddAppealCategoryFailure) {
            state.pending = false;
            state.error = action.payload;
        },

        editAppealCategoryRequest(state, action: EditAppealCategoryRequest) {
            state.pending = true;
        },

        editAppealCategorySuccess(state, action: EditAppealCategorySuccess) {
            state.pending = false;
            const index = state.appeals.findIndex(appeal => appeal.id === action.payload.id);
            if (index !== -1) state.categories[index] = action.payload;
        },

        editAppealCategoryFailure(state, action: EditAppealCategoryFailure) {
            state.pending = false;
            state.error = action.payload;
        },

        deleteAppealCategoryRequest(state, action: DeleteAppealCategoryRequest) {
            state.pending = true;
        },

        deleteAppealCategorySuccess(state, action: DeleteAppealCategorySuccess) {
            state.pending = false;
            state.categories = state.categories.filter(category => category.id !== action.payload.id);
        },

        deleteAppealCategoryFailure(state, action: DeleteAppealCategoryFailure) {
            state.pending = false;
            state.error = action.payload;
        },

        setImageUrl(state, action: SetImage) {
            state.appealCreatePageData.coverUrl = action.payload;
        },

        setCoverImage(state, action: SetCoverImage) {
            state.appealCreatePageData.coverImage = action.payload;
        },
    },
});

export const {
    getAppealCreatePageRequest,
    getAppealCreatePageSuccess,
    getAppealCreatePageFailure,
    getAppealsSuccess,
    addAppealCategoryFailure,
    addAppealCategoryRequest,
    addAppealCategorySuccess,
    addAppealFailure,
    addAppealSuccess,
    addAppealRequest,
    deleteAppealCategoryFailure,
    deleteAppealCategoryRequest,
    deleteAppealCategorySuccess,
    deleteAppealFailure,
    editAppealCategoryFailure,
    editAppealCategoryRequest,
    editAppealCategorySuccess,
    deleteAppealRequest,
    deleteAppealSuccess,
    editAppealFailure,
    editAppealRequest,
    editAppealSuccess,
    setImageUrl,
    setCoverImage,
} = appealSlice.actions;

export default appealSlice.reducer;
