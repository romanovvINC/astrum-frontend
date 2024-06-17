import { all, call, takeLatest } from "redux-saga/effects";
import { getInventoryFilterRequest, getInventoryListRequest, getInventoryListAsyncRequest } from "./index";
import { getInventoryFilterWorker, getInventoryListAsyncWorker, getInventoryListWorker } from "./workers";

function* watchGetInventoryList() {
    yield takeLatest(getInventoryListRequest, getInventoryListWorker);
}

function* watchGetInventoryListAsync() {
    yield takeLatest(getInventoryListAsyncRequest, getInventoryListAsyncWorker);
}

function* watchGetInventoryFilter() {
    yield takeLatest(getInventoryFilterRequest, getInventoryFilterWorker);
}

export function* watchInventory() {
    yield all([call(watchGetInventoryList), call(watchGetInventoryListAsync), call(watchGetInventoryFilter)]);
}
