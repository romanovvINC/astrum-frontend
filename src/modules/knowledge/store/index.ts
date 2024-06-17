import { createSlice } from "@reduxjs/toolkit";
import { KnowledgeState } from "models/knowledge/KnowledgeState";
import {
    GetKnowledgeProjectInfoFailure,
    GetKnowledgeProjectInfoRequest,
    GetKnowledgeProjectInfoSuccess,
} from "./actionTypes/GetKnowledgeProjectInfoTypes";
import {
    GetKnowledgeProjectListFailure,
    GetKnowledgeProjectListRequest,
    GetKnowledgeProjectListSuccess,
} from "./actionTypes/GetKnowledgeProjectListTypes";
import {
    GetKnowledgeArticleListFailure,
    GetKnowledgeArticleListRequest,
    GetKnowledgeArticleListSuccess,
} from "./actionTypes/GetKnowledgeArticleListTypes";
import {
    GetKnowledgeArticleFailure,
    GetKnowledgeArticleRequest,
    GetKnowledgeArticleSuccess,
} from "./actionTypes/GetKnowledgeArticeTypes";

const initialState: KnowledgeState = {
    pending: false,
    pendingProjectList: false,
    pendingArticleList: false,
    projectList: [],
    projectInfo: {
        articles: 0,
        id: "",
        youtrackId: "",
        name: "",
        shortName: "",
        description: "",
        leaderId: "",
        leader: {
            userId: "",
            username: "",
            avatarImageId: "",
            avatarUrl: "",
            name: "",
            surname: "",
            patronymic: "",
            nameWithSurname: "",
            roles: [],
            positionId: "",
            positionName: "",
            email: "",
            birthDate: new Date(),
            address: "",
            primaryPhone: "",
            secondaryPhone: "",
            isActive: false,
            socialNetworks: {},
            competencies: [],
            money: 0,
            role: "",
        },
        issues: [],
        iconUrl: null,
        members: [],
    },
    articleList: [],
    articleInfo: {
        id: "string",
        title: "string",
        description: "string",
        content: "string",
        authorId: "string",
        author: {
            userId: "",
            username: "",
            avatarImageId: "",
            avatarUrl: "",
            name: "",
            surname: "",
            patronymic: "",
            nameWithSurname: "",
            roles: [],
            positionId: "",
            positionName: "",
            email: "",
            birthDate: new Date(),
            address: "",
            primaryPhone: "",
            secondaryPhone: "",
            isActive: false,
            socialNetworks: {},
            competencies: [],
            money: 0,
            role: "",
        },
        project: {
            articles: 0,
            id: "",
            youtrackId: "",
            name: "",
            shortName: "",
            description: "",
            leaderId: "",
            leader: {
                userId: "",
                username: "",
                avatarImageId: "",
                avatarUrl: "",
                name: "",
                surname: "",
                patronymic: "",
                nameWithSurname: "",
                roles: [],
                positionId: "",
                positionName: "",
                email: "",
                birthDate: new Date(),
                address: "",
                primaryPhone: "",
                secondaryPhone: "",
                isActive: false,
                socialNetworks: {},
                competencies: [],
                money: 0,
                role: "",
            },
            issues: [],
            iconUrl: null,
            members: [],
        },
        parentArticle: "",
        childArticlesId: [],
        comments: [],
        attachments: [],
        isNew: true,
    },
    error: null,
    errorProjectList: null,
    errorArticleList: null,
};

const KnowledgeReducer = createSlice({
    name: "knowledge",
    initialState,
    reducers: {
        getKnowledgeProjectListRequest(state, action: GetKnowledgeProjectListRequest) {
            state.pendingProjectList = true;
            state.errorProjectList = null;
        },
        getKnowledgeProjectListSuccess(state, action: GetKnowledgeProjectListSuccess) {
            state.pendingProjectList = false;
            state.projectList = action.payload;
        },
        getKnowledgeProjectListFailure(state, action: GetKnowledgeProjectListFailure) {
            state.pendingProjectList = false;
            state.errorProjectList = action.payload;
        },

        getYoutrackProjectRequest(state, action: GetKnowledgeProjectInfoRequest) {
            state.pending = true;
            state.error = null;
        },
        getYoutrackProjectSuccess(state, action: GetKnowledgeProjectInfoSuccess) {
            state.pending = false;
            state.projectInfo = action.payload;
        },
        getYoutrackProjectFailure(state, action: GetKnowledgeProjectInfoFailure) {
            state.pending = false;
            state.error = action.payload;
        },

        getKnowledgeProjectArticleListRequest(state, action: GetKnowledgeArticleListRequest) {
            state.pendingArticleList = true;
            state.errorArticleList = null;
        },
        getKnowledgeProjectArticleListSuccess(state, action: GetKnowledgeArticleListSuccess) {
            state.pendingArticleList = false;
            state.articleList = action.payload;
        },
        getKnowledgeProjectArticleListFailure(state, action: GetKnowledgeArticleListFailure) {
            state.pendingArticleList = false;
            state.errorArticleList = action.payload;
        },

        getKnowledgeProjectArticleInfoRequest(state, action: GetKnowledgeArticleRequest) {
            state.pending = true;
            state.error = null;
        },
        getKnowledgeProjectArticleInfoSuccess(state, action: GetKnowledgeArticleSuccess) {
            state.pending = false;
            state.articleInfo = action.payload;
        },
        getKnowledgeProjectArticleInfoFailure(state, action: GetKnowledgeArticleFailure) {
            state.pending = false;
            state.error = action.payload;
        },
    },
});

export const {
    getKnowledgeProjectListRequest,
    getKnowledgeProjectListSuccess,
    getKnowledgeProjectListFailure,

    getYoutrackProjectRequest,
    getYoutrackProjectSuccess,
    getYoutrackProjectFailure,

    getKnowledgeProjectArticleListRequest,
    getKnowledgeProjectArticleListSuccess,
    getKnowledgeProjectArticleListFailure,

    getKnowledgeProjectArticleInfoRequest,
    getKnowledgeProjectArticleInfoSuccess,
    getKnowledgeProjectArticleInfoFailure,
} = KnowledgeReducer.actions;

export default KnowledgeReducer.reducer;
