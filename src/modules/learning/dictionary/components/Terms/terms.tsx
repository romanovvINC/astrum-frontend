import { FC } from "react";
import { useAppSelector } from "Redux/hooks";
import { dictionarySelectors } from "modules/learning/dictionary";
import Term from "./Term";
import { getRightDeclensionTerm } from "Helpers/GetRightDeclension";
import { TermsSkeleton } from "../TermsSkeleton";

import s from "./terms.module.scss";

const Terms: FC = () => {
    const { pending, terms, error } = useAppSelector(dictionarySelectors.getDictionaryState);
    const { filterCategories, sorting } = useAppSelector(dictionarySelectors.getDictionaryFilter);

    if (pending) {
        return <TermsSkeleton />;
    } else if (terms.length === 0 || error) {
        return <h4 className={s.message}>Здесь ничего нет</h4>;
    }

    let sortedTerms = [...terms];
    if (sorting === "Алфавиту") {
        sortedTerms.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (filterCategories.length >= 1) {
        sortedTerms = sortedTerms.filter(term => filterCategories.includes(term.category.name));
    }

    return (
        <div className={s.terms}>
            <div className={s.amount}>{`${sortedTerms.length} ${getRightDeclensionTerm(sortedTerms.length)}`}</div>
            {sortedTerms.map(term => (
                <Term
                    key={term.id}
                    term={term}
                />
            ))}
        </div>
    );
};

export default Terms;
