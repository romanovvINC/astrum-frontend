import { AxiosResponse } from "axios";
import BaseApi from "Api/BaseApi";
import { MiniApp } from "models/miniapp/MiniApp";

const baseUrl = "/mini-app"

export const getMiniAppsList = (): Promise<AxiosResponse<MiniApp[]>> => {
    return BaseApi.get(baseUrl);
}

export const getMiniAppInfo = (id: string): Promise<AxiosResponse<MiniApp>> => {
    const url = `${baseUrl}/${id}`
    return BaseApi.get(url);
}