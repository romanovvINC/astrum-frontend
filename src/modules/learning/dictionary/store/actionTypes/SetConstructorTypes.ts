import { Term } from "models/learning/dictionary/Term";

export type SetConstructorCategoryType = {
    type: string;
    payload: string;
};

export type SetConstructorCheckedValuesType = {
    type: string;
    payload: Term[];
};

export type ChangeConstructorCheckedValuesType = {
    type: string;
    payload: string;
};

export type SetConstructorIsCheckedAllType = {
    type: string;
    payload: boolean;
};
