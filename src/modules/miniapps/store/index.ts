import {
    GetMiniAppsListRequest,
    GetMiniAppsListSuccess,
    GetMiniAppsListFailure
} from "./actionTypes/GetMiniAppsListTypes";
import {
    GetMiniAppInfoFailure,
    GetMiniAppInfoRequest,
    GetMiniAppInfoSuccess
} from "./actionTypes/GetMiniAppInfoTypes";
import { MiniAppState } from "models/miniapp/MiniAppState";
import { createSlice } from "@reduxjs/toolkit";

const initialState: MiniAppState = {
    pending: false,
    pendingList: false,
    miniAppList: [],
    miniApp: {
       id: "",
       name: "",
       link: "",
       coverUrl: ""
    },
    error: null
}

export const miniAppReducer = createSlice({
    name: "miniApp",
    initialState,
    reducers: {
        getMiniAppsListRequest(state) {
            state.pending = true;
            state.error = null;
        },
        getMiniAppsListSuccess(state, action: GetMiniAppsListSuccess) {
            state.pending = false;
            state.miniAppList = action.payload;
        },
        getMiniAppsListFailure(state, action: GetMiniAppsListFailure) {
            state.pending = false;
            state.error = action.payload;
        },
        getMiniAppInfoRequest(state, action: GetMiniAppInfoRequest) {
            state.pending = true;
            state.error = null;
        },
        getMiniAppInfoSuccess(state, action: GetMiniAppInfoSuccess) {
            state.pending = false;
            state.miniApp = action.payload;
        },
        getMiniAppInfoFailure(state, action: GetMiniAppInfoFailure){
            state.pending = false;
            state.error = action.payload;
        }
    }
})

export const {
    getMiniAppsListRequest,
    getMiniAppsListSuccess,
    getMiniAppsListFailure,
    getMiniAppInfoRequest,
    getMiniAppInfoSuccess,
    getMiniAppInfoFailure
} = miniAppReducer.actions;

export default miniAppReducer.reducer;