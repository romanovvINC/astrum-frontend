import { all, call, takeEvery, takeLatest } from "redux-saga/effects";
import {
    addBasketProductWorker,
    addMarketOrderWorker,
    addMarketProductWorker,
    deleteBasketProductWorker,
    deleteMarketOrderWorker,
    deleteMarketProductWorker,
    editMarketOrderWorker,
    editMarketProductWorker,
    getBasketProductWorker,
    getMarketProductWorker
} from "./workers";
import {
    addBasketProductRequest,
    addMarketOrderRequest,
    addMarketProductRequest,
    deleteBasketProductRequest,
    deleteMarketOrderRequest,
    deleteMarketProductRequest,
    editMarketOrderRequest,
    editMarketProductRequest,
    getBasketProductRequest,
    getMarketProductsRequest
} from "./index";

function* watchAddMarketProduct() {
    yield takeEvery(addMarketProductRequest, addMarketProductWorker);
}

function* watchEditMarketProduct() {
    yield takeEvery(editMarketProductRequest, editMarketProductWorker);
}

function* watchDeleteMarketProduct() {
    yield takeEvery(deleteMarketProductRequest, deleteMarketProductWorker);
}

function* watchAddMarketOrder() {
    yield takeEvery(addMarketOrderRequest, addMarketOrderWorker);
}

function* watchEditMarketOrder() {
    yield takeEvery(editMarketOrderRequest, editMarketOrderWorker);
}

function* watchDeleteMarketOrder() {
    yield takeEvery(deleteMarketOrderRequest, deleteMarketOrderWorker);
}

function* watchGetBasketProduct() {
    yield takeLatest(getBasketProductRequest, getBasketProductWorker);
}

function* watchGetMarketProduct() {
    yield takeLatest(getMarketProductsRequest, getMarketProductWorker);
}

function* watchAddBasketProduct() {
    yield takeEvery(addBasketProductRequest, addBasketProductWorker);
}

function* watchDeleteBasketProduct() {
    yield takeEvery(deleteBasketProductRequest, deleteBasketProductWorker);
}

export function* watchMarket() {
    yield all([
        call(watchAddMarketProduct),
        call(watchEditMarketProduct),
        call(watchDeleteMarketProduct),
        call(watchAddMarketOrder),
        call(watchEditMarketOrder),
        call(watchDeleteMarketOrder),
        call(watchGetBasketProduct),
        call(watchAddBasketProduct),
        call(watchDeleteBasketProduct),
        call(watchGetMarketProduct)
    ]);
}
