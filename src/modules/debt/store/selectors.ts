import { RootState } from "Redux/store";
import { DebtState } from "models/debt/DebtState";

export const debtSelectors = {
    getDebtState: (state: RootState): DebtState => state.DebtReducer,
} as const;
