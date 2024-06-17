import { ShortProfileInfo } from "models/profile/ShortProfileInfo";
import { DebtInfo } from "models/debt/DebtInfo";

export type DebtCreateInfo = Omit<DebtInfo, "id" | "borrower" | "debtor" | "status"> & {
    dateDebt: Date;
    debtorId: string;
    borrowerId: string;
};

export type DebtCreateInfoForm = Omit<DebtCreateInfo, "debtorId"> & {
    debtor: ShortProfileInfo | null;
    phoneNumber: string;
    cardNumber: string;
    bank: string;
};
