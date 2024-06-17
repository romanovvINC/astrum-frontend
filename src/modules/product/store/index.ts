import { createSlice } from "@reduxjs/toolkit";
import { ProductState } from "models/product/ProductState";
import { GetProductListFailure, GetProductListRequest, GetProductListSuccess } from "./actionTypes/GetProductListTypes";
import { CreateProductFailure, CreateProductRequest } from "./actionTypes/CreateProductTypes";
import { GetProductFailure, GetProductRequest, GetProductSuccess } from "./actionTypes/GetProductTypes";
import { DeleteProductFailure, DeleteProductRequest } from "./actionTypes/DeleteProductTypes";
import {
    GetProductCustomerListFailure,
    GetProductCustomerListSuccess,
} from "./actionTypes/GetProductCustomerListTypes";
import { SetPageIndex, SetCanAsyncPending, SetProject } from "./actionTypes/MainSyncTypes";
import { GetProjectRequest, GetProjectSuccess, GetProjectFailure } from "./actionTypes/GetPtojectTypes";
import { EditProjectFailure, EditProjectRequest, EditProjectSuccess } from "./actionTypes/EditProjectTypes";
import { DeleteProjectFailure, DeleteProjectRequest } from "./actionTypes/DeleteProjectTypes";
import { EditProductFailure, EditProductRequest, EditProductSuccess } from "./actionTypes/EditProductTypes";
import { reduceFilter } from "Helpers/filterHelpers";
import { SetFilter, SetPredicate } from "models/filter/actionTypes";
import {
    GetProfilePositionListFailure,
    GetProfilePositionListSuccess,
} from "./actionTypes/GetProfilePositionListTypes";

const initialState: ProductState = {
    pending: false,
    pendingAsync: false,
    pendingChange: false,
    canPendingAsync: true,
    pendingCustomers: false,
    pendingProfileShortInfoList: false,
    pendingProfilePositions: false,
    pageIndex: 0,
    count: 4,
    customers: [],
    productListInfo: {
        filter: {
            predicate: "",
            filterParams: {},
        },
        products: [],
    },
    productInfo: {
        id: "",
        name: "",
        description: "",
        customer: { id: "", name: "" },
        startDate: new Date(),
        endDate: null,
        coverUrl: "",
        projects: [],
    },
    projectInfo: {
        id: "",
        name: "",
        description: "",
        productId: "",
        productName: "",
        isDeletable: false,
        startDate: new Date(),
        endDate: null,
        members: [],
        customFields: [],
    },
    profileShortInfoList: [],
    profilePositions: [],
    error: null,
    errorChange: null,
    errorCustomers: null,
    errorPendingProfileShortInfoList: null,
    errorProfilePositions: null,
};

export const productReducer = createSlice({
    name: "product",
    initialState,
    reducers: {
        getProductListRequest(state, action: GetProductListRequest) {
            state.pending = true;
            state.error = null;
        },
        getProductListAsyncRequest(state, action: GetProductListRequest) {
            state.pendingAsync = true;
            state.error = null;
        },
        getProductListSuccess(state, action: GetProductListSuccess) {
            state.pending = false;
            state.pendingAsync = false;
            state.productListInfo.products = action.payload;
        },
        getProductListFailure(state, action: GetProductListFailure) {
            state.pending = false;
            state.error = action.payload;
        },
        getProductListAsyncFailure(state, action: GetProductListFailure) {
            state.pendingAsync = false;
        },

        getProductRequest(state, action: GetProductRequest) {
            state.pending = true;
            state.error = null;
        },
        getProductSuccess(state, action: GetProductSuccess) {
            state.pending = false;
            state.productInfo = action.payload;
        },
        getProductFailure(state, action: GetProductFailure) {
            state.pending = false;
            state.error = action.payload;
        },

        getProductCustomerListRequest(state) {
            state.pendingCustomers = true;
            state.errorCustomers = null;
        },
        getProductCustomerListSuccess(state, action: GetProductCustomerListSuccess) {
            state.pendingCustomers = false;
            state.customers = action.payload;
        },
        getProductCustomerListFailure(state, action: GetProductCustomerListFailure) {
            state.pendingCustomers = false;
            state.errorCustomers = action.payload;
        },

        createProductRequest(state, action: CreateProductRequest) {
            state.pendingChange = true;
            state.errorChange = null;
        },
        createProductSuccess(state) {
            state.pendingChange = false;
        },
        createProductFailure(state, action: CreateProductFailure) {
            state.pendingChange = false;
            state.errorChange = action.payload;
        },

        editProductRequest(state, action: EditProductRequest) {
            state.pendingChange = true;
            state.errorChange = null;
        },
        editProductSuccess(state, action: EditProductSuccess) {
            state.pendingChange = false;
            state.productInfo = action.payload;
        },
        editProductFailure(state, action: EditProductFailure) {
            state.pendingChange = false;
            state.errorChange = action.payload;
        },

        deleteProductRequest(state, action: DeleteProductRequest) {
            state.pendingChange = true;
            state.errorChange = null;
        },
        deleteProductSuccess(state) {
            state.pendingChange = false;
            state.productInfo = {
                id: "",
                name: "",
                description: "",
                customer: { id: "", name: "" },
                startDate: new Date(),
                endDate: null,
                coverUrl: "",
                projects: [],
            };
        },
        deleteProductFailure(state, action: DeleteProductFailure) {
            state.pendingChange = false;
            state.errorChange = action.payload;
        },

        getProjectRequest(state, action: GetProjectRequest) {
            state.pending = true;
            state.error = null;
        },
        getProjectSuccess(state, action: GetProjectSuccess) {
            state.pending = false;
            state.projectInfo = action.payload;
        },
        getProjectFailure(state, action: GetProjectFailure) {
            state.pending = false;
            state.error = action.payload;
        },

        getProfilePositionListRequest(state) {
            state.pendingProfilePositions = true;
            state.errorProfilePositions = null;
        },
        getProfilePositionListSuccess(state, action: GetProfilePositionListSuccess) {
            state.pendingProfilePositions = false;
            state.profilePositions = action.payload;
        },
        getProfilePositionListFailure(state, action: GetProfilePositionListFailure) {
            state.pendingProfilePositions = false;
            state.errorProfilePositions = action.payload;
        },

        //TODO>>>>> ПОТОМ УБРАТЬ И ПЕРЕДЕЛАТЬ
        getProfileShortInfoListRequest(state) {
            state.pendingProfileShortInfoList = true;
        },
        getProfileShortInfoListSuccess(state, action) {
            state.pendingProfileShortInfoList = false;
            state.profileShortInfoList = action.payload;
        },
        getProfileShortInfoListFailure(state, action) {
            state.pendingProfileShortInfoList = false;
            state.errorPendingProfileShortInfoList = action.payload;
        },
        //TODO>>>>> ПОТОМ УБРАТЬ И ПЕРЕДЕЛАТЬ

        editProjectRequest(state, action: EditProjectRequest) {
            state.pendingChange = true;
            state.errorChange = null;
        },
        editProjectSuccess(state, action: EditProjectSuccess) {
            state.pendingChange = false;
            state.projectInfo = action.payload;
        },
        editProjectFailure(state, action: EditProjectFailure) {
            state.pendingChange = false;
            state.errorChange = action.payload;
        },

        deleteProjectRequest(state, action: DeleteProjectRequest) {
            state.pendingChange = true;
            state.errorChange = null;
        },
        deleteProjectSuccess(state) {
            state.pendingChange = false;
            state.projectInfo = {
                id: "",
                name: "",
                description: "",
                productId: "",
                productName: "",
                isDeletable: false,
                startDate: new Date(),
                endDate: null,
                members: [],
                customFields: [],
            };
        },
        deleteProjectFailure(state, action: DeleteProjectFailure) {
            state.pendingChange = false;
            state.errorChange = action.payload;
        },

        setProject(state, action: SetProject) {
            state.projectInfo = action.payload;
        },
        setPredicate(state, action: SetPredicate) {
            state.productListInfo.filter.predicate = action.payload;
        },
        setFilter(state, action: SetFilter) {
            state.productListInfo.filter.filterParams = reduceFilter(
                state.productListInfo.filter.filterParams,
                action.payload
            );
        },
        setPageIndex(state, action: SetPageIndex) {
            state.pageIndex = action.payload;
        },
        setCanAsyncPending(state, action: SetCanAsyncPending) {
            state.canPendingAsync = action.payload;
        },
    },
});

export const {
    getProductListRequest,
    getProductListSuccess,
    getProductListFailure,
    getProductListAsyncRequest,
    getProductListAsyncFailure,

    getProductCustomerListRequest,
    getProductCustomerListSuccess,
    getProductCustomerListFailure,

    getProductRequest,
    getProductSuccess,
    getProductFailure,

    createProductRequest,
    createProductSuccess,
    createProductFailure,

    editProductRequest,
    editProductSuccess,
    editProductFailure,

    deleteProductRequest,
    deleteProductSuccess,
    deleteProductFailure,

    getProjectRequest,
    getProjectSuccess,
    getProjectFailure,

    getProfilePositionListRequest,
    getProfilePositionListSuccess,
    getProfilePositionListFailure,

    getProfileShortInfoListRequest,
    getProfileShortInfoListSuccess,
    getProfileShortInfoListFailure,

    editProjectRequest,
    editProjectSuccess,
    editProjectFailure,

    deleteProjectRequest,
    deleteProjectSuccess,
    deleteProjectFailure,

    setProject,
    setPredicate,
    setFilter,
    setPageIndex,
    setCanAsyncPending,
} = productReducer.actions;

export default productReducer.reducer;
