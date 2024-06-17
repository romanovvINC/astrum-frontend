import { AxiosResponse } from "axios";
import baseApi from "Api/BaseApi";
import { DebtInfoResponse } from "models/debt/DebtInfo";
import { ShortProfileInfo } from "models/profile/ShortProfileInfo";
import { DebtCreateInfo } from "models/debt/DebtCreateInfo";

const baseUrl = "/debts";

export const getDebtList = (): Promise<AxiosResponse<DebtInfoResponse[]>> => {
    const url = `${baseUrl}/get-debts`;
    return baseApi.get(url);
};

export const createDebt = (data: DebtCreateInfo): Promise<AxiosResponse<DebtInfoResponse>> => {
    const url = `${baseUrl}/create-debt`;
    return baseApi.post(url, data);
};

export const getDebtUserList = (): Promise<AxiosResponse<ShortProfileInfo[]>> => {
    return baseApi.get(`${baseUrl}/get-users-info`);
};
