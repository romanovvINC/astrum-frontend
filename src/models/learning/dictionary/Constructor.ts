import { Term } from "./Term";

export type Constructor = {
    pending: boolean;
    error: string | null;
    checkedValues: Term[];
    isCheckedAll: boolean;
};
