import { Category } from "models/article/Category";

export type GetCategoriesSuccess = {
    type: string;
    payload: Category[];
};

export type GetCategoriesFailure = {
    type: string;
    payload: string;
};
