import { DebtStatus } from "models/debt/DebtStatus";
import { DebtUserInfo } from "models/debt/DebtUserInfo";

export type DebtInfo = {
    id: string;
    dateDebt: Date | null;
    borrower: DebtUserInfo;
    debtor: DebtUserInfo;
    sumDebt: number;
    description: string;
    status: DebtStatus;
};

export type DebtInfoResponse = Omit<DebtInfo, "date"> & {
    dateDebt: string | null;
};
