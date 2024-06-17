import { CategoryView } from "models/learning/dictionary/Term";

export type GetCategoriesSuccess = {
    type: string;
    payload: CategoryView[];
};

export type GetCategoriesFailure = {
    type: string;
    payload: string;
};
