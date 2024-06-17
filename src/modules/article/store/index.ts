import { createSlice } from "@reduxjs/toolkit";
import { SetFilter } from "models/filter/actionTypes";
import { ArticleState } from "models/article/ArticleState";
import { GetCategoriesFailure, GetCategoriesSuccess } from "./actionTypes/GetCategoriesTypes";
import { GetArticleFailure, GetArticleRequest, GetArticleSuccess } from "./actionTypes/GetArticleTypes";
import { GetArticleListFailure, GetArticleListRequest, GetArticleListSuccess } from "./actionTypes/GetArticleListTypes";
import { CreateArticleFailure, CreateArticleRequest } from "./actionTypes/CreateArticleTypes";
import { EditArticleFailure, EditArticleRequest } from "./actionTypes/EditArticleTypes";
import { DeleteArticleFailure, DeleteArticleRequest } from "./actionTypes/DeleteArticleTypes";
import { reduceFilter } from "Helpers/filterHelpers";
import {
    CheckArticleNameFailure,
    CheckArticleNameRequest,
    CheckArticleNameSuccess,
} from "./actionTypes/CheckArticleNameTypes";

const initialState: ArticleState = {
    pending: false,
    pendingAsync: false,
    pendingChange: false,
    pendingCheckArticleName: false,
    pendingCategories: false,
    pendingFilter: false,
    articleNameIsExist: false,
    categories: [],
    articleListInfo: {
        filter: {
            predicate: "",
            filterParams: {},
        },
        filterVariants: [],
        articles: [],
    },
    articleInfo: {
        id: "",
        dateCreated: new Date(),
        readingTime: 1,
        name: "",
        description: "",
        author: {
            userId: "",
            username: "",
            name: "",
            surname: "",
        },
        coverUrl: "",
        category: {
            id: "",
            name: "",
        },
        tags: [],
        content: "",
        slug: "",
    },
    error: null,
    errorCheckArticleName: null,
    errorCategories: null,
    errorFilter: null,
};

export const articleReducer = createSlice({
    name: "article",
    initialState,
    reducers: {
        getCategoriesRequest(state) {
            state.pendingCategories = true;
            state.errorCategories = null;
        },
        getCategoriesSuccess(state, action: GetCategoriesSuccess) {
            state.pendingCategories = false;
            state.categories = action.payload;
        },
        getCategoriesFailure(state, action: GetCategoriesFailure) {
            state.pendingCategories = false;
            state.errorCategories = action.payload;
        },

        getArticleBySlugRequest(state, action: GetArticleRequest) {
            state.pending = true;
            state.error = null;
        },
        getArticleByIdRequest(state, action: GetArticleRequest) {
            state.pending = true;
            state.error = null;
        },
        getArticleSuccess(state, action: GetArticleSuccess) {
            state.pending = false;
            state.articleInfo = action.payload;
        },
        getArticleFailure(state, action: GetArticleFailure) {
            state.pending = false;
            state.error = action.payload;
        },

        getArticleListFilterRequest(state) {
            state.pendingFilter = true;
        },
        getArticleListFilterSuccess(state, action) {
            state.pendingFilter = false;
            state.articleListInfo.filterVariants = action.payload;
        },
        getArticleListFilterFailure(state, action) {
            state.pendingFilter = false;
            state.errorFilter = action.payload;
        },

        getArticleListRequest(state, action: GetArticleListRequest) {
            state.pending = true;
        },
        getArticleListSuccess(state, action: GetArticleListSuccess) {
            state.pending = false;
            state.error = null;
            state.articleListInfo.articles = action.payload;
        },
        getArticleListFailure(state, action: GetArticleListFailure) {
            state.pending = false;
            state.error = action.payload;
        },

        createArticleRequest(state, action: CreateArticleRequest) {
            state.pendingChange = true;
            state.error = null;
        },
        createArticleSuccess(state) {
            state.pendingChange = false;
        },
        createArticleFailure(state, action: CreateArticleFailure) {
            state.pendingChange = false;
            state.error = action.payload;
        },

        editArticleRequest(state, action: EditArticleRequest) {
            state.pendingChange = true;
            state.error = null;
        },
        editArticleSuccess(state) {
            state.pendingChange = false;
        },
        editArticleFailure(state, action: EditArticleFailure) {
            state.pendingChange = false;
            state.error = action.payload;
        },

        deleteArticleRequest(state, action: DeleteArticleRequest) {
            state.pendingChange = true;
            state.error = null;
        },
        deleteArticleSuccess(state) {
            state.pendingChange = false;
        },
        deleteArticleFailure(state, action: DeleteArticleFailure) {
            state.pendingChange = false;
            state.error = action.payload;
        },

        checkArticleNameRequest(state, action: CheckArticleNameRequest) {
            state.pendingCheckArticleName = true;
            state.errorCheckArticleName = null;
        },
        checkArticleNameSuccess(state, action: CheckArticleNameSuccess) {
            state.pendingCheckArticleName = false;
            state.articleNameIsExist = action.payload;
        },
        checkArticleNameFailure(state, action: CheckArticleNameFailure) {
            state.pendingCheckArticleName = false;
            state.errorCheckArticleName = action.payload;
        },

        setPredicate(state, action) {
            state.articleListInfo.filter.predicate = action.payload.predicate;
        },
        setFilter(state, action: SetFilter) {
            state.articleListInfo.filter.filterParams = reduceFilter(
                state.articleListInfo.filter.filterParams,
                action.payload
            );
        },
    },
});

export const {
    getCategoriesRequest,
    getCategoriesSuccess,
    getCategoriesFailure,

    getArticleByIdRequest,
    getArticleBySlugRequest,
    getArticleSuccess,
    getArticleFailure,

    createArticleRequest,
    createArticleSuccess,
    createArticleFailure,

    editArticleRequest,
    editArticleSuccess,
    editArticleFailure,

    deleteArticleRequest,
    deleteArticleSuccess,
    deleteArticleFailure,

    getArticleListFilterRequest,
    getArticleListFilterSuccess,
    getArticleListFilterFailure,

    getArticleListRequest,
    getArticleListSuccess,
    getArticleListFailure,

    checkArticleNameRequest,
    checkArticleNameSuccess,
    checkArticleNameFailure,

    setPredicate,
    setFilter,
} = articleReducer.actions;

export default articleReducer.reducer;
