import { MiniApp } from "models/miniapp/MiniApp";

export type GetMiniAppsListRequest = {
    type: string;
}

export type GetMiniAppsListSuccess = {
    type: string;
    payload: MiniApp[];
}

export type GetMiniAppsListFailure = {
    type: string;
    payload: string;
}