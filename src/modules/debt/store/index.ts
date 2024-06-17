import { createSlice } from "@reduxjs/toolkit";
import { DebtState } from "models/debt/DebtState";
import { GetDebtListFailure, GetDebtListSuccess } from "./actionTypes/GetDebtListTypes";
import { GetDebtUserListFailure, GetDebtUserListSuccess } from "./actionTypes/GetDebtUserListTypes";
import { CreateDebtFailure, CreateDebtRequest, CreateDebtSuccess } from "./actionTypes/CreateDebtTypes";

const initialState: DebtState = {
    pending: false,
    pendingUsers: false,
    pendingChange: false,
    debts: [],
    users: [],
    error: null,
    errorUsers: null,
    errorChange: null,
};

const DebtReducer = createSlice({
    name: "debt",
    initialState,
    reducers: {
        getDebtListRequest(state) {
            state.pending = true;
            state.error = null;
        },
        getDebtListSuccess(state, action: GetDebtListSuccess) {
            state.pending = false;
            state.debts = action.payload;
        },
        getDebtListFailure(state, action: GetDebtListFailure) {
            state.pending = false;
            state.error = action.payload;
        },

        createDebtRequest(state, action: CreateDebtRequest) {
            state.pendingChange = true;
            state.errorChange = null;
        },
        createDebtSuccess(state, action: CreateDebtSuccess) {
            state.pendingChange = false;
            state.debts.push(action.payload);
        },
        createDebtFailure(state, action: CreateDebtFailure) {
            state.pendingChange = false;
            state.errorChange = action.payload;
        },

        getDebtUserListRequest(state) {
            state.pendingUsers = true;
            state.errorUsers = null;
        },
        getDebtUserListSuccess(state, action: GetDebtUserListSuccess) {
            state.pendingUsers = false;
            state.users = action.payload;
        },
        getDebtUserListFailure(state, action: GetDebtUserListFailure) {
            state.pendingUsers = false;
            state.errorUsers = action.payload;
        },
    },
});

export const {
    getDebtListRequest,
    getDebtListSuccess,
    getDebtListFailure,

    createDebtRequest,
    createDebtSuccess,
    createDebtFailure,

    getDebtUserListRequest,
    getDebtUserListSuccess,
    getDebtUserListFailure,
} = DebtReducer.actions;

export default DebtReducer.reducer;
