import { MiniApp } from "models/miniapp/MiniApp"

export type GetMiniAppInfoRequest = {
    type: string;
    payload: string;
}

export type GetMiniAppInfoSuccess = {
    type: string;
    payload: MiniApp;
}

export type GetMiniAppInfoFailure = {
    type: string;
    payload: string;
}