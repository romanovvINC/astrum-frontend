import { AxiosResponse } from "axios";
import { call, put } from "redux-saga/effects";
import type { MarketProduct } from "models/market/MarketProduct";
import type { MarketOrder } from "models/market/MarketOrder";
import type { MarketBasket } from "models/market/MarketBasket";
import type { AddMarketProductRequest } from "./ActionTypes/AddMarketProductTypes";
import type { EditMarketProductRequest } from "./ActionTypes/EditMarketProductTypes";
import type { DeleteMarketProductRequest } from "./ActionTypes/DeleteMarketProductTypes";
import type { AddMarketOrderRequest } from "./ActionTypes/AddMarketOrderTypes";
import type { EditMarketOrderRequest } from "./ActionTypes/EditMarketOrderTypes";
import type { DeleteMarketOrderRequest } from "./ActionTypes/DeleteMarketOrderTypes";
import type { EditBasketRequest } from "./ActionTypes/EditBasketTypes";
import {
    addMarketProduct,
    deleteMarketProduct,
    editMarketProduct,
    addBasketProduct,
    deleteBasketProduct,
    addMarketOrder,
    deleteMarketOrder,
    editMarketOrder,
    getMarketBasketREST,
    getMarketProducts,
} from "../api";
import {
    addBasketProductFailure,
    addBasketProductSuccess,
    addMarketOrderFailure,
    addMarketOrderSuccess,
    addMarketProductFailure,
    addMarketProductSuccess,
    deleteBasketProductFailure,
    deleteBasketProductSuccess,
    deleteMarketOrderFailure,
    deleteMarketOrderSuccess,
    deleteMarketProductFailure,
    deleteMarketProductSuccess,
    editMarketOrderFailure,
    editMarketOrderSuccess,
    editMarketProductFailure,
    editMarketProductSuccess,
    getBasketProductFailure,
    getBasketProductSuccess,
    getMarketProductsSuccess,
    getMarketProductsFailure
} from "./index";
import { notification } from "Utils/Notification";
import { GetBasketProductRequest } from "modules/market/store/ActionTypes/GetBasketProductTypes";
import { GetMarketProductRequest } from "./ActionTypes/GetMarketProductTypes";

export function* addMarketProductWorker({ payload }: AddMarketProductRequest) {
    try {
        const product: AxiosResponse<MarketProduct> = yield call(addMarketProduct, payload);
        yield put(addMarketProductSuccess(product.data));
    } catch (e) {
        yield put(addMarketProductFailure((e as Error).message));
    }
}

export function* editMarketProductWorker({ payload }: EditMarketProductRequest) {
    try {
        const product: AxiosResponse<MarketProduct> = yield call(editMarketProduct, payload);
        yield put(editMarketProductSuccess(product.data));
    } catch (e) {
        yield put(editMarketProductFailure((e as Error).message));
    }
}

export function* deleteMarketProductWorker({ payload }: DeleteMarketProductRequest) {
    try {
        const product: AxiosResponse<MarketProduct> = yield call(deleteMarketProduct, payload);
        yield put(deleteMarketProductSuccess(product.data.id));
    } catch (e) {
        yield put(deleteMarketProductFailure((e as Error).message));
    }
}

export function* addMarketOrderWorker({ payload }: AddMarketOrderRequest) {
    try {
        const order: AxiosResponse<MarketOrder> = yield call(addMarketOrder, payload);
        yield put(addMarketOrderSuccess(order.data));
    } catch (e) {
        yield put(addMarketOrderFailure((e as Error).message));
    }
}

export function* editMarketOrderWorker({ payload }: EditMarketOrderRequest) {
    try {
        const order: AxiosResponse<MarketOrder> = yield call(editMarketOrder, payload);
        yield put(editMarketOrderSuccess(order.data));
    } catch (e) {
        yield put(editMarketOrderFailure((e as Error).message));
    }
}

export function* deleteMarketOrderWorker({ payload }: DeleteMarketOrderRequest) {
    try {
        const order: AxiosResponse<MarketOrder> = yield call(deleteMarketOrder, payload);
        yield put(deleteMarketOrderSuccess(order.data.id));
    } catch (e) {
        yield put(deleteMarketOrderFailure((e as Error).message));
    }
}

export function* getBasketProductWorker({ payload }: GetBasketProductRequest) {
    const res: AxiosResponse<MarketBasket> = yield call(getMarketBasketREST, payload);
    if (res) {
        yield put(getBasketProductSuccess(res.data));
    } else {
        yield put(getBasketProductFailure("Ошибка"));
    }
}

export function* getMarketProductWorker({ payload }: GetMarketProductRequest) {
    const res: AxiosResponse<MarketProduct> = yield call(getMarketProducts, payload);
    if (res) {
        console.log('res',res.data)
        yield put(getMarketProductsSuccess(res.data));
    } else {
        yield put(getMarketProductsFailure("Ошибка"));
    }
}

export function* addBasketProductWorker({ payload }: EditBasketRequest) {
    try {
        const basket: AxiosResponse<MarketBasket> = yield call(addBasketProduct, payload);
        yield put(addBasketProductSuccess(basket.data));
        yield call(notification, "Товар", "Товар добавлен в корзину", "success");
    } catch (e) {
        yield put(addBasketProductFailure((e as Error).message));
    }
}

export function* deleteBasketProductWorker({ payload }: EditBasketRequest) {
    try {
        const basket: AxiosResponse<MarketBasket> = yield call(deleteBasketProduct, payload);
        yield put(deleteBasketProductSuccess(basket.data));
    } catch (e) {
        yield put(deleteBasketProductFailure((e as Error).message));
    }
}
