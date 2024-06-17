import { DebtInfo, DebtInfoResponse } from "models/debt/DebtInfo";

export const mapFromDebtInfoResponseToData = (debt: DebtInfoResponse): DebtInfo => {
    const { dateDebt, ...rest } = debt;
    return {
        ...rest,
        dateDebt: dateDebt ? new Date(dateDebt) : null,
    };
};

export const mapFromDebtInfoListResponseToData = (debts: DebtInfoResponse[]): DebtInfo[] => {
    return debts.map(mapFromDebtInfoResponseToData);
};
