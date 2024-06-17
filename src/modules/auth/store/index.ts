import { AuthenticationState } from "models/auth/AuthentificationState";
import { createSlice } from "@reduxjs/toolkit";
import { RegistrationFailure, RegistrationRequest, RegistrationSuccess } from "./actionTypes/RegistrationTypes";
import { LoginFailure, LoginRequest, LoginSuccess } from "./actionTypes/LoginTypes";
import { CheckAuthFailure, CheckAuthSuccess } from "./actionTypes/CheckAuthTypes";
import { LogoutFailure, LogoutRequest, LogoutSuccess } from "./actionTypes/LogoutTypes";
import { ChangePasswordFailure, ChangePasswordRequest } from "./actionTypes/ChangePasswordTypes";
import { BasicInfo } from "models/auth/BasicInfo";

const initialBasicInfo: BasicInfo = {
    userId: "",
    username: "",
    avatarUrl: "",
    name: "",
    surname: "",
    money: 0,
    roles: [],
};

const initialState: AuthenticationState = {
    isAuth: false,
    loginPending: false,
    logoutPending: false,
    registrationPending: false,
    checkAuthPending: false,
    passwordRecoveryPending: false,
    error: null,
    basicInfo: { ...initialBasicInfo },
    redirectUrl: "",
    basketId: "36b030e2-972a-4f9e-b97b-9bbefcdd5651",
};

const AuthReducer = createSlice({
    name: "auth",
    initialState,
    reducers: {
        registrationRequest(state, action: RegistrationRequest) {
            state.registrationPending = true;
        },
        registrationSuccess(state, action: RegistrationSuccess) {
            state.registrationPending = false;
        },
        registrationFailure(state, action: RegistrationFailure) {
            state.registrationPending = false;
            state.error = action.payload;
        },

        loginRequest(state, action: LoginRequest) {
            state.loginPending = true;
        },
        loginWithGitlabRequest(state) {
            state.loginPending = false;
        },
        loginSuccess(state, action: LoginSuccess) {
            state.loginPending = false;
            state.basicInfo = action.payload;
            state.isAuth = true;
        },
        loginFailure(state, action: LoginFailure) {
            state.loginPending = false;
            state.error = action.payload;
        },

        checkAuthRequest(state) {
            state.checkAuthPending = true;
            state.error = null;
        },
        checkAuthSuccess(state, action: CheckAuthSuccess) {
            state.checkAuthPending = false;
            state.isAuth = true;
            state.basicInfo = action.payload;
        },
        checkAuthFailure(state, action: CheckAuthFailure) {
            state.checkAuthPending = false;
            state.isAuth = false;
            state.basicInfo = { ...initialBasicInfo };
            state.error = action.payload;
        },

        logoutRequest(state, action: LogoutRequest) {
            state.logoutPending = true;
            state.error = null;
        },
        logoutSuccess(state, action: LogoutSuccess) {
            state.logoutPending = false;
            state.isAuth = false;
            state.basicInfo = { ...initialBasicInfo };
        },
        logoutFailure(state, action: LogoutFailure) {
            state.logoutPending = false;
            state.error = action.payload;
        },

        changePasswordRequest(state, action: ChangePasswordRequest) {
            state.passwordRecoveryPending = true;
            state.error = null;
        },
        changePasswordSuccess(state) {
            state.passwordRecoveryPending = false;
        },
        changePasswordFailure(state, action: ChangePasswordFailure) {
            state.passwordRecoveryPending = false;
            state.error = action.payload;
        },

        setAvatarUrl(state, action) {
            state.basicInfo.avatarUrl = action.payload;
        },

        setUsername(state, action) {
            state.basicInfo.username = action.payload;
        },

        setMoney(state, action) {
            state.basicInfo.money = action.payload;
        },
    },
});

export const {
    registrationRequest,
    registrationSuccess,
    registrationFailure,
    loginRequest,
    loginWithGitlabRequest,
    loginSuccess,
    loginFailure,
    checkAuthRequest,
    checkAuthSuccess,
    checkAuthFailure,
    logoutRequest,
    logoutSuccess,
    logoutFailure,
    changePasswordRequest,
    changePasswordSuccess,
    changePasswordFailure,
    setAvatarUrl,
    setUsername,
    setMoney,
} = AuthReducer.actions;

export default AuthReducer.reducer;
