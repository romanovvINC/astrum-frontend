import { all, call, takeLatest } from "redux-saga/effects";
import {
    getKnowledgeProjectArticleInfoRequest,
    getKnowledgeProjectArticleListRequest,
    getKnowledgeProjectListRequest,
    getYoutrackProjectRequest,
} from "modules/knowledge";
import {
    getKnowledgeArticleInfoWorker,
    getKnowledgeArticleListWorker,
    getKnowledgeProjectListWorker,
    getKnowledgeProjectWorker,
} from "./workers";

function* watchGetKnowledgeProjectList() {
    yield takeLatest(getKnowledgeProjectListRequest, getKnowledgeProjectListWorker);
}

function* watchGetKnowledgeProject() {
    yield takeLatest(getYoutrackProjectRequest, getKnowledgeProjectWorker);
}

function* watchGetKnowledgeArticleList() {
    yield takeLatest(getKnowledgeProjectArticleListRequest, getKnowledgeArticleListWorker);
}

function* watchGetKnowledgeArticleInfo() {
    yield takeLatest(getKnowledgeProjectArticleInfoRequest, getKnowledgeArticleInfoWorker);
}

export function* watchKnowledge() {
    yield all([
        call(watchGetKnowledgeProject),
        call(watchGetKnowledgeProjectList),
        call(watchGetKnowledgeArticleList),
        call(watchGetKnowledgeArticleInfo),
    ]);
}
