import { DebtInfo } from "models/debt/DebtInfo";

export const getRequisites = (debts: DebtInfo[]): [string, string][] => {
    const result: [string, string][] = [];
    debts.forEach(d => {
        if (result.some(r => r[0] === d.debtor.nameWithSurname)) {
            return;
        } else {
            result.push([d.debtor.nameWithSurname, String(d.sumDebt)]); //TODO.... записать реквизиты
        }
    });
    return result;
};
