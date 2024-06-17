import { createSlice } from "@reduxjs/toolkit";
import { InventoryState } from "models/inventory/InventoryState";
import {
    GetInventoryListFailure,
    GetInventoryListRequest,
    GetInventoryListSuccess,
} from "./actionTypes/GetInventoryListTypes";
import { SetCanAsyncPending, SetPageIndex } from "./actionTypes/MainSyncTypes";
import { GetInventoryFilterFailure, GetInventoryFilterSuccess } from "./actionTypes/GetInventoryFilterTypes";
import { reduceFilter } from "Helpers/filterHelpers";
import { SetFilter, SetPredicate } from "models/filter/actionTypes";

const initialState: InventoryState = {
    pending: false,
    pendingFilter: false,
    pendingAsync: false,
    canPendingAsync: false,
    startIndex: 0,
    count: 10,
    inventoryList: [],
    filter: {
        predicate: "",
        filterParams: {},
    },
    filterVariants: [],
    error: null,
    errorFilter: null,
};

const InventoryReducer = createSlice({
    name: "inventory",
    initialState,
    reducers: {
        getInventoryListRequest(state, action: GetInventoryListRequest) {
            state.pending = true;
            state.error = null;
        },
        getInventoryListAsyncRequest(state, action: GetInventoryListRequest) {
            state.pendingAsync = true;
            state.error = null;
        },
        getInventoryListSuccess(state, action: GetInventoryListSuccess) {
            state.pending = false;
            state.inventoryList = action.payload;
        },
        getInventoryListFailure(state, action: GetInventoryListFailure) {
            state.pending = false;
            state.pendingAsync = false;
            state.error = action.payload;
        },
        getInventoryListAsyncFailure(state) {
            state.pendingAsync = false;
        },

        getInventoryFilterRequest(state) {
            state.pendingFilter = true;
            state.errorFilter = null;
        },
        getInventoryFilterSuccess(state, action: GetInventoryFilterSuccess) {
            state.pendingFilter = false;
            state.filterVariants = action.payload;
        },
        getInventoryFilterFailure(state, action: GetInventoryFilterFailure) {
            state.pendingFilter = false;
            state.errorFilter = action.payload;
        },

        setPredicate(state, action: SetPredicate) {
            state.filter.predicate = action.payload;
        },
        setFilter(state, action: SetFilter) {
            state.filter.filterParams = reduceFilter(state.filter.filterParams, action.payload);
        },
        setPageIndex(state, action: SetPageIndex) {
            state.startIndex = action.payload;
        },
        setCanAsyncPending(state, action: SetCanAsyncPending) {
            state.canPendingAsync = action.payload;
        },
    },
});

export const {
    getInventoryListRequest,
    getInventoryListAsyncRequest,
    getInventoryListSuccess,
    getInventoryListFailure,
    getInventoryListAsyncFailure,

    getInventoryFilterRequest,
    getInventoryFilterSuccess,
    getInventoryFilterFailure,

    setPredicate,
    setFilter,
    setPageIndex,
    setCanAsyncPending,
} = InventoryReducer.actions;

export default InventoryReducer.reducer;
