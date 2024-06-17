import { FC, MouseEvent } from "react";
import { useAppSelector, useAppDispatch } from "Redux/hooks";
import { ButtonMain } from "ui/Button";
import { dictionarySelectors, setFilterCategory, deleteFilterCategory } from "modules/learning/dictionary";

import s from "./Categories.module.scss";

const Categories: FC = () => {
    const dispatch = useAppDispatch();

    const { categories } = useAppSelector(dictionarySelectors.getDictionaryState);
    const { filterCategories } = useAppSelector(dictionarySelectors.getDictionaryFilter);

    const categoryClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        const value = e.currentTarget.textContent;
        if (value) {
            if (filterCategories.includes(value)) {
                dispatch(deleteFilterCategory(value));
            } else {
                dispatch(setFilterCategory(value));
            }
        }
    };

    return (
        <div className={s.categories_wrapper}>
            <h3>Категории</h3>
            <div className={s.categories}>
                {categories.length === 0 ? (
                    <h4>Пусто</h4>
                ) : (
                    categories.map(category => (
                        <ButtonMain
                            key={category.id}
                            variant={filterCategories.includes(category.name) ? "default" : "invert"}
                            onClick={categoryClickHandler}
                        >
                            {category.name}
                        </ButtonMain>
                    ))
                )}
            </div>
        </div>
    );
};

export default Categories;
