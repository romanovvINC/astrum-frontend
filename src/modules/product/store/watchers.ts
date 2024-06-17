import { all, call, takeEvery, takeLatest } from "redux-saga/effects";
import {
    createProductRequest,
    deleteProductRequest,
    deleteProjectRequest,
    editProductRequest,
    editProjectRequest,
    getProductCustomerListRequest,
    getProductListAsyncRequest,
    getProductListRequest,
    getProductRequest,
    getProfilePositionListRequest,
    getProfileShortInfoListRequest,
    getProjectRequest,
} from "./index";
import {
    createProductWorker,
    deleteProductWorker,
    deleteProjectWorker,
    editProductWorker,
    editProjectWorker,
    getProductCustomerListWorker,
    getProductListAsyncWorker,
    getProductListWorker,
    getProductWorker,
    getProfilePositionsWorker,
    getProfileShortInfoListWorker,
    getProjectWorker,
} from "./workers";

function* getProductListWatcher() {
    yield takeLatest(getProductListRequest, getProductListWorker);
}

function* getProductListAsync() {
    yield takeLatest(getProductListAsyncRequest, getProductListAsyncWorker);
}

function* getProductWatcher() {
    yield takeLatest(getProductRequest, getProductWorker);
}

function* getProductCustomerListWatcher() {
    yield takeLatest(getProductCustomerListRequest, getProductCustomerListWorker);
}

function* createProductWatcher() {
    yield takeEvery(createProductRequest, createProductWorker);
}

function* editProductWatcher() {
    yield takeEvery(editProductRequest, editProductWorker);
}

function* deleteProductWatcher() {
    yield takeEvery(deleteProductRequest, deleteProductWorker);
}

function* getProjectWatcher() {
    yield takeLatest(getProjectRequest, getProjectWorker);
}

function* getProfilePositionWatcher() {
    yield takeLatest(getProfilePositionListRequest, getProfilePositionsWorker);
}

//TODO>>>>> ПОТОМ УБРАТЬ И ПЕРЕДЕЛАТЬ
function* getProfileShortInfoListWatcher() {
    yield takeLatest(getProfileShortInfoListRequest, getProfileShortInfoListWorker);
}
//TODO>>>>> ПОТОМ УБРАТЬ И ПЕРЕДЕЛАТЬ

function* editProjectWatcher() {
    yield takeEvery(editProjectRequest, editProjectWorker);
}

function* deleteProjectWatcher() {
    yield takeEvery(deleteProjectRequest, deleteProjectWorker);
}

export function* watchProduct() {
    yield all([
        call(getProductListWatcher),
        call(getProductListAsync),
        call(getProductWatcher),
        call(getProductCustomerListWatcher),
        call(createProductWatcher),
        call(editProductWatcher),
        call(deleteProductWatcher),
        call(getProjectWatcher),
        call(getProfilePositionWatcher),
        call(getProfileShortInfoListWatcher),
        call(editProjectWatcher),
        call(deleteProjectWatcher),
    ]);
}
