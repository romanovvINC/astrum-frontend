import { AxiosResponse } from "axios";
import { call, put } from "redux-saga/effects";
import { DebtInfo, DebtInfoResponse } from "models/debt/DebtInfo";
import { ShortProfileInfo } from "models/profile/ShortProfileInfo";
import { createDebt, getDebtList, getDebtUserList } from "../api";
import {
    createDebtFailure,
    createDebtSuccess,
    getDebtListFailure,
    getDebtListSuccess,
    getDebtUserListFailure,
    getDebtUserListSuccess,
} from "./index";
import { mapFromDebtInfoListResponseToData, mapFromDebtInfoResponseToData } from "../mappers/mapFromApiToData";
import { CreateDebtRequest } from "./actionTypes/CreateDebtTypes";
import { notification } from "Utils/Notification";

export function* getDebtListWorker() {
    const res: AxiosResponse<DebtInfoResponse[]> = yield call(getDebtList);
    if (res) {
        const result: DebtInfo[] = yield call(mapFromDebtInfoListResponseToData, res.data);
        yield put(getDebtListSuccess(result));
    } else {
        yield put(getDebtListFailure("Ошибка"));
    }
}

export function* createDebtWorker({ payload }: CreateDebtRequest) {
    const res: AxiosResponse<DebtInfoResponse> = yield call(createDebt, payload.data);
    if (res) {
        const result: DebtInfo = yield call(mapFromDebtInfoResponseToData, res.data);
        yield put(createDebtSuccess(result));
        if (payload.successCallback) {
            yield call(payload.successCallback);
        }
        yield call(notification, "Успех", "Долг успешно добавлен", "success");
    } else {
        yield put(createDebtFailure("Ошибка"));
    }
}

export function* getDebtUserListWorker() {
    const res: AxiosResponse<ShortProfileInfo[]> = yield call(getDebtUserList);
    if (res) {
        yield put(getDebtUserListSuccess(res.data));
    } else {
        yield put(getDebtUserListFailure("Ошибка"));
    }
}
