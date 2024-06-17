import { FilterState } from "models/filter/FilterState";
import { FilterVariant } from "models/filter/FilterVariant";
import { ArticleShortInfo } from "./ArticleShortInfo";

export type ArticleListInfo = {
    filter: {
        predicate: string;
        filterParams: FilterState;
    };
    filterVariants: FilterVariant[];
    articles: ArticleShortInfo[];
};
