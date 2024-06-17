import { all, call, takeEvery, takeLatest } from "redux-saga/effects";
import {
    checkArticleNameRequest,
    createArticleRequest,
    deleteArticleRequest,
    editArticleRequest,
    getArticleByIdRequest,
    getArticleBySlugRequest,
    getArticleListFilterRequest,
    getArticleListRequest,
    getCategoriesRequest,
} from "./index";
import {
    checkArticleNameWorker,
    createArticleWorker,
    deleteArticleWorker,
    editArticleWorker,
    getArticleByIdWorker,
    getArticleBySlugWorker,
    getArticleListFilterWorker,
    getArticleListWorker,
    getCategoriesWorker,
} from "./workers";

function* getCategoriesWatcher() {
    yield takeLatest(getCategoriesRequest, getCategoriesWorker);
}

function* getArticleByIdWatcher() {
    yield takeLatest(getArticleByIdRequest, getArticleByIdWorker);
}

function* getArticleBySlugWatcher() {
    yield takeLatest(getArticleBySlugRequest, getArticleBySlugWorker);
}

function* createArticleWatcher() {
    yield takeEvery(createArticleRequest, createArticleWorker);
}

function* editArticleWatcher() {
    yield takeEvery(editArticleRequest, editArticleWorker);
}

function* deleteArticleWatcher() {
    yield takeEvery(deleteArticleRequest, deleteArticleWorker);
}

function* getArticleListFilterWatcher() {
    yield takeLatest(getArticleListFilterRequest, getArticleListFilterWorker);
}

function* getArticleListWatcher() {
    yield takeLatest(getArticleListRequest, getArticleListWorker);
}

function* watchCheckArticleName() {
    yield takeEvery(checkArticleNameRequest, checkArticleNameWorker);
}

export function* articleWatcher() {
    yield all([
        call(getCategoriesWatcher),
        call(getArticleByIdWatcher),
        call(getArticleBySlugWatcher),
        call(createArticleWatcher),
        call(editArticleWatcher),
        call(deleteArticleWatcher),
        call(getArticleListFilterWatcher),
        call(getArticleListWatcher),
        call(watchCheckArticleName),
    ]);
}
