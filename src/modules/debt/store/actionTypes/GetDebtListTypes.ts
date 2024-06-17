import { DebtInfo } from "models/debt/DebtInfo";

export type GetDebtListSuccess = {
    type: string;
    payload: DebtInfo[];
};

export type GetDebtListFailure = {
    type: string;
    payload: string;
};
