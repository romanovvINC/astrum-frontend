import { AxiosResponse } from "axios";
import { YoutrackProjectInfo, YoutrackProjectInfoResponse } from "models/knowledge/YoutrackProjectInfo";
import { call, put } from "redux-saga/effects";
import {
    getYoutrackProject,
    getYoutrackProjectArticle,
    getYoutrackProjectArticleList,
    getYoutrackProjectList,
} from "modules/knowledge/api";
import {
    getKnowledgeProjectArticleInfoFailure,
    getKnowledgeProjectArticleInfoSuccess,
    getKnowledgeProjectArticleListFailure,
    getKnowledgeProjectArticleListSuccess,
    getKnowledgeProjectListFailure,
    getKnowledgeProjectListSuccess,
    getYoutrackProjectFailure,
    getYoutrackProjectSuccess,
} from "./index";
import {
    mapFromKnowledgeArticleInfoResponseToData,
    mapFromKnowledgeProjectInfoResponseToData,
} from "modules/knowledge/mappers/mapFromApiToData";
import { KnowledgeArticleInfo, KnowledgeArticleInfoResponse } from "models/knowledge/KnowledgeArticleInfo";
import { GetKnowledgeArticleRequest } from "./actionTypes/GetKnowledgeArticeTypes";
import { GetKnowledgeProjectInfoRequest } from "./actionTypes/GetKnowledgeProjectInfoTypes";
import { GetKnowledgeProjectListRequest } from "./actionTypes/GetKnowledgeProjectListTypes";
import { GetKnowledgeArticleListRequest } from "./actionTypes/GetKnowledgeArticleListTypes";

export function* getKnowledgeProjectListWorker({ payload }: GetKnowledgeProjectListRequest) {
    const res: AxiosResponse<YoutrackProjectInfoResponse[]> = yield call(getYoutrackProjectList, payload);
    if (res) {
        const result: YoutrackProjectInfo[] = res.data.map(mapFromKnowledgeProjectInfoResponseToData);
        yield put(getKnowledgeProjectListSuccess(result));
    } else {
        yield put(getKnowledgeProjectListFailure("error"));
    }
}

export function* getKnowledgeProjectWorker({ payload }: GetKnowledgeProjectInfoRequest) {
    const res: AxiosResponse<YoutrackProjectInfoResponse> = yield call(getYoutrackProject, payload);
    if (res) {
        const result: YoutrackProjectInfo = yield call(mapFromKnowledgeProjectInfoResponseToData, res.data);
        yield put(getYoutrackProjectSuccess(result));
    } else {
        yield put(getYoutrackProjectFailure("error"));
    }
}

export function* getKnowledgeArticleListWorker({ payload }: GetKnowledgeArticleListRequest) {
    const res: AxiosResponse<KnowledgeArticleInfoResponse[]> = yield call(getYoutrackProjectArticleList, payload);
    if (res && res.data) {
        const result = res.data.map(mapFromKnowledgeArticleInfoResponseToData);
        yield put(getKnowledgeProjectArticleListSuccess(result));
    } else {
        yield put(getKnowledgeProjectArticleListFailure("error"));
    }
}

export function* getKnowledgeArticleInfoWorker({ payload }: GetKnowledgeArticleRequest) {
    const res: AxiosResponse<KnowledgeArticleInfoResponse> = yield call(getYoutrackProjectArticle, payload);
    if (res) {
        const result: KnowledgeArticleInfo = yield call(mapFromKnowledgeArticleInfoResponseToData, res.data);
        yield put(getKnowledgeProjectArticleInfoSuccess(result));
    } else {
        yield put(getKnowledgeProjectArticleInfoFailure("error"));
    }
}
