import { GetMiniAppsListRequest } from "./actionTypes/GetMiniAppsListTypes";
import { AxiosResponse } from "axios";
import { MiniApp } from "models/miniapp/MiniApp";
import { call, put } from "redux-saga/effects";
import { getMiniAppInfo, getMiniAppsList } from "../api";
import { getMiniAppsListSuccess, getMiniAppsListFailure, getMiniAppInfoSuccess, getMiniAppInfoFailure } from "../store"
import { GetMiniAppInfoRequest } from "modules/miniapps/store/actionTypes/GetMiniAppInfoTypes";

export function* getMiniAppsListWorker() {
    const result: AxiosResponse<MiniApp[]> = yield call(getMiniAppsList);
    if (result) {
        yield put(getMiniAppsListSuccess(result.data));
    }
    else {
        yield put(getMiniAppsListFailure("Ошибка"));
    }
}

export function* getMiniAppInfoWorker({ payload }: GetMiniAppInfoRequest) {
    const result: AxiosResponse<MiniApp> = yield call(getMiniAppInfo, payload);
    if (result) {
        yield put(getMiniAppInfoSuccess(result.data));
    }
    else {
        yield put(getMiniAppInfoFailure("Ошибка"));
    }
}
