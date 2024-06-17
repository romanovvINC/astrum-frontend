import { DebtCreateInfo } from "models/debt/DebtCreateInfo";
import { DebtInfo } from "models/debt/DebtInfo";
import { SuccessCallback } from "models/AliasTypes";

export type CreateDebtRequest = {
    type: string;
    payload: {
        data: DebtCreateInfo;
        successCallback: SuccessCallback;
    };
};

export type CreateDebtSuccess = {
    type: string;
    payload: DebtInfo;
};

export type CreateDebtFailure = {
    type: string;
    payload: string;
};
