import { call, put, select } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { InventoryItem } from "models/inventory/InventoryItem";
import { getInventoryFilter, getInventoryItemList } from "../api";
import {
    getInventoryFilterFailure,
    getInventoryFilterSuccess,
    getInventoryListAsyncFailure,
    getInventoryListFailure,
    getInventoryListSuccess,
    setCanAsyncPending,
    setPageIndex,
} from "../store";
import { mapFromInventoryItemResponseListToData } from "../mappers/mapFromApiToData";
import { GetInventoryListRequest } from "./actionTypes/GetInventoryListTypes";
import { FilterVariantResponse } from "models/filter/FilterVariant";
import { mapFilterToApi } from "Helpers/filterHelpers";
import { inventorySelectors } from "modules/inventory";
import { FilterRequest } from "models/filter/FilterRequest";
import { InventoryState } from "models/inventory/InventoryState";
import { InventoryItemListResponse } from "models/inventory/InventoryItemListResponse";

export function* getInventoryListWorker({ payload }: GetInventoryListRequest) {
    const { count }: InventoryState = yield select(inventorySelectors.getInventoryState);
    const filterParams: FilterRequest = yield call(mapFilterToApi, payload);
    const res: AxiosResponse<InventoryItemListResponse> = yield call(getInventoryItemList, {
        filterParams,
        paginationParams: { count, startIndex: 0 },
    });
    if (res) {
        const data = res.data;
        if (data.nextExist) {
            yield put(setPageIndex(data.index));
        } else {
            yield put(setCanAsyncPending(false));
        }
        const result: InventoryItem[] = yield call(mapFromInventoryItemResponseListToData, data.inventoryItems);
        yield put(getInventoryListSuccess(result));
    } else {
        yield put(getInventoryListFailure("Ошибка"));
    }
}

export function* getInventoryListAsyncWorker({ payload }: GetInventoryListRequest) {
    const { startIndex, count, inventoryList }: InventoryState = yield select(inventorySelectors.getInventoryState);
    const filterParams: FilterRequest = yield call(mapFilterToApi, payload);
    const res: AxiosResponse<InventoryItemListResponse> = yield call(getInventoryItemList, {
        filterParams,
        paginationParams: { count, startIndex },
    });
    if (res) {
        const data = res.data;
        if (data.nextExist) {
            yield put(setPageIndex(data.index));
        } else {
            yield put(setCanAsyncPending(false));
        }
        const result: InventoryItem[] = yield call(mapFromInventoryItemResponseListToData, data.inventoryItems);
        yield put(getInventoryListSuccess([...inventoryList, ...result]));
    } else {
        yield put(getInventoryListAsyncFailure());
    }
}

export function* getInventoryFilterWorker() {
    const res: AxiosResponse<FilterVariantResponse> = yield call(getInventoryFilter);
    if (res) {
        yield put(getInventoryFilterSuccess(res.data.blocks));
    } else {
        yield put(getInventoryFilterFailure("Ошибка"));
    }
}
