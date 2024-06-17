export enum DebtStatus {
    request,
    success,
}

export const DebtStatusName = {
    [DebtStatus.request]: "Не выдан",
    [DebtStatus.success]: "Выдан",
} as const;
