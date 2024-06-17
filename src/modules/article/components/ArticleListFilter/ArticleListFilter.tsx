import React, { FC, useCallback, useEffect } from "react";
import Filter from "ui/Filter/Filter";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { articleSelectors, getArticleListFilterRequest, setFilter, setPredicate } from "modules/article";
import ArticleListFilterSkeleton from "modules/article/components/ArticleListFilter/ArticleListFilterSkeleton";

const ArticleListFilter: FC = () => {
    const { pendingFilter, filter, filterVariants } = useAppSelector(articleSelectors.getFilter);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getArticleListFilterRequest());
    }, []);

    const setFilterSearchHandler = useCallback((predicate: string) => {
        dispatch(setPredicate({ predicate }));
    }, []);

    const setFilterHandler = useCallback((filter: { [fieldName: string]: string }) => {
        dispatch(setFilter(filter));
    }, []);

    if (filterVariants.length === 0 && pendingFilter) {
        return <ArticleListFilterSkeleton />;
    } else {
        return (
            <Filter
                title="Найти статью"
                filter={filter}
                filterVariants={filterVariants}
                onSetFilter={setFilterHandler}
                onSetPredicate={setFilterSearchHandler}
            />
        );
    }
};

export default ArticleListFilter;
