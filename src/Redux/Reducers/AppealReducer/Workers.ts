import { AddAppealRequest } from "./Types/ActionTypes/AddAppealTypes";
import { EditAppealRequest } from "./Types/ActionTypes/EditAppealTypes";
import { DeleteAppealRequest } from "./Types/ActionTypes/DeleteAppealTypes";
import { AddAppealCategoryRequest } from "./Types/ActionTypes/AddAppealCategoryTypes";
import { EditAppealCategoryRequest } from "./Types/ActionTypes/EditAppealCategoryTypes";
import { DeleteAppealCategoryRequest } from "./Types/ActionTypes/DeleteAppealCategoryTypes";
import { AxiosResponse } from "axios";
import { call, put } from "redux-saga/effects";
import { Appeal } from "./Types/Appeal";
import {
    addAppeal,
    addAppealCategory,
    deleteAppeal,
    deleteAppealCategory,
    editAppeal,
    editAppealCategory,
    getAppealCreatePage,
} from "../../../Api/AppealApi";
import {
    addAppealCategoryFailure,
    addAppealCategorySuccess,
    addAppealFailure,
    addAppealSuccess,
    deleteAppealCategoryFailure,
    deleteAppealCategorySuccess,
    deleteAppealFailure,
    deleteAppealSuccess,
    editAppealCategoryFailure,
    editAppealCategorySuccess,
    editAppealFailure,
    editAppealSuccess,
    getAppealCreatePageFailure,
    getAppealCreatePageSuccess,
} from "./AppealReducer";
import { AppealCategory } from "./Types/AppealCategory";
import {
    GetAppealCreatePageData,
    GetAppealCreatePageDataRequest,
} from "./Types/ActionTypes/GetAppealCreatePageDataTypes";

export function* getAppealCreatePageWorker() {
    try {
        const appeal: AxiosResponse<GetAppealCreatePageData> = yield call(getAppealCreatePage);
        yield put(getAppealCreatePageSuccess(appeal.data));
    } catch (e) {
        yield put(getAppealCreatePageFailure((e as Error).message));
    }
}

export function* addAppealWorker({ payload }: AddAppealRequest) {
    try {
        const appeal: AxiosResponse<Appeal> = yield call(addAppeal, payload);
        yield put(addAppealSuccess(appeal.data));
    } catch (e) {
        yield put(addAppealFailure((e as Error).message));
    }
}

export function* editAppealWorker({ payload }: EditAppealRequest) {
    try {
        const appeal: AxiosResponse<Appeal> = yield call(editAppeal, payload);
        yield put(editAppealSuccess(appeal.data));
    } catch (e) {
        yield put(editAppealFailure((e as Error).message));
    }
}

export function* deleteAppealWorker({ payload }: DeleteAppealRequest) {
    try {
        const appeal: AxiosResponse<Appeal> = yield call(deleteAppeal, payload);
        yield put(deleteAppealSuccess(appeal.data));
    } catch (e) {
        yield put(deleteAppealFailure((e as Error).message));
    }
}

export function* addAppealCategoryWorker({ payload }: AddAppealCategoryRequest) {
    try {
        const appealCategory: AxiosResponse<AppealCategory> = yield call(addAppealCategory, payload);
        yield put(addAppealCategorySuccess(appealCategory.data));
    } catch (e) {
        yield put(addAppealCategoryFailure((e as Error).message));
    }
}

export function* editAppealCategoryWorker({ payload }: EditAppealCategoryRequest) {
    try {
        const appealCategory: AxiosResponse<AppealCategory> = yield call(editAppealCategory, payload);
        yield put(editAppealCategorySuccess(appealCategory.data));
    } catch (e) {
        yield put(editAppealCategoryFailure((e as Error).message));
    }
}

export function* deleteAppealCategoryWorker({ payload }: DeleteAppealCategoryRequest) {
    try {
        const appealCategory: AxiosResponse<AppealCategory> = yield call(deleteAppealCategory, payload);
        yield put(deleteAppealCategorySuccess(appealCategory.data));
    } catch (e) {
        yield put(deleteAppealCategoryFailure((e as Error).message));
    }
}
