import { RegistrationRequest } from "./actionTypes/RegistrationTypes";
import { call, put, select } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { changePassword, login, loginWithGitlab, logout, registration, getBasicInfoProfile } from "../api";
import {
    changePasswordFailure,
    changePasswordSuccess,
    checkAuthFailure,
    checkAuthSuccess,
    loginFailure,
    loginSuccess,
    logoutFailure,
    logoutSuccess,
    registrationFailure,
    registrationSuccess,
} from "./index";
import { notification } from "Utils/Notification";
import { LoginRequest } from "./actionTypes/LoginTypes";
import { LoginResponse } from "models/auth/LoginResponse";
//eslint-disable-next-line
//@ts-ignore
import oauth from "simple-oauth-client";
import "simple-oauth-client/popup";
import { ChangePasswordRequest } from "./actionTypes/ChangePasswordTypes";
import { authSelectors } from "./selectors";
import { BasicInfo, BasicInfoResponse } from "models/auth/BasicInfo";
import { getBasketProductRequest } from "modules/market";

export function* registrationWorker({ payload }: RegistrationRequest) {
    const res: AxiosResponse = yield call(registration, payload.data);
    if (res) {
        yield put(registrationSuccess());
        if (payload.successCallback) {
            yield call(payload.successCallback);
        }
        yield call(notification, "Успех", "Заявка успешно создана", "success");
    } else {
        yield put(registrationFailure("Не удалось отрпавить заявку"));
        yield call(notification, null, "Не удалось отправить заявку", "danger");
    }
}

const fetchOauth = () => {
    return oauth(
        "https://git.66bit.ru/oauth/authorize",
        {
            client_id: process.env.REACT_APP_GITLAB_CLIENT_ID,
            redirect_uri: document.URL,
            response_type: "code",
        },
        { popupHeight: 800, popupWidth: 600 }
    ).catch(() => null);
};

export function* loginWithGitlabWorker() {
    const resp: { code: string } = yield call(fetchOauth);
    if (resp) {
        const res: AxiosResponse<{ data: LoginResponse }> = yield call(loginWithGitlab, {
            code: resp.code,
            redirectUri: document.URL,
        });
        if (res) {
            localStorage.setItem("@ACCESS_TOKEN", res.data.data.accessToken);
            const userInfoResponse: AxiosResponse<BasicInfoResponse> = yield call(getBasicInfoProfile);
            const { userName, ...rest } = userInfoResponse.data;
            const result: BasicInfo = { ...rest, username: userName };
            yield put(getBasketProductRequest(result.userId));
            yield put(loginSuccess(result));
        } else {
            yield put(loginFailure("Не удалось войти"));
            yield call(notification, null, "Не удалось войти", "danger");
        }
    } else {
        yield put(loginFailure("Не удалось войти"));
        yield call(notification, null, "Не удалось войти", "danger");
    }
}

export function* loginWorker({ payload }: LoginRequest) {
    const res: AxiosResponse<LoginResponse> = yield call(login, payload);
    if (res) {
        localStorage.setItem("@ACCESS_TOKEN", res.data.accessToken);
        const userInfoResponse: AxiosResponse<BasicInfoResponse> = yield call(getBasicInfoProfile);
        const { userName, ...rest } = userInfoResponse.data;
        const result: BasicInfo = { ...rest, username: userName };
        yield put(getBasketProductRequest(result.userId));
        yield put(loginSuccess(result));
    } else {
        yield put(loginFailure("Не удалось войти"));
        yield call(notification, null, "Не удалось войти", "danger");
    }
}

export function* checkAuthWorker() {
    const token = localStorage.getItem("@ACCESS_TOKEN");
    if (token && token !== "undefined") {
        const userInfoResponse: AxiosResponse<BasicInfoResponse> = yield call(getBasicInfoProfile);
        if (userInfoResponse) {
            //need to Refresh
            const { userName, ...rest } = userInfoResponse.data;
            const result: BasicInfo = { ...rest, username: userName };
            yield put(getBasketProductRequest(result.userId));
            yield put(checkAuthSuccess(result));
        } else {
            localStorage.removeItem("@ACCESS_TOKEN");
            yield put(checkAuthFailure("Ошибка"));
        }
    } else {
        yield put(checkAuthFailure("Ошибка"));
    }
}

export function* logoutWorker() {
    const response: { token: boolean } = yield call(logout);
    if (response) {
        yield put(logoutSuccess());
        localStorage.removeItem("@ACCESS_TOKEN");
    } else {
        yield put(logoutFailure(""));
    }
}

export function* changePasswordWorker({ payload }: ChangePasswordRequest) {
    const { username } = yield select(authSelectors.getBasicInfo);
    const response: AxiosResponse<void> | null = yield call(changePassword, payload);
    if (response) {
        yield put(changePasswordSuccess());
        yield call(notification, "Успех", "Пароль успешно изменён", "success");
    } else {
        yield put(changePasswordFailure("Не получилось изменить пароль"));
        yield call(notification, null, "Не удалось изменить пароль");
    }
}
