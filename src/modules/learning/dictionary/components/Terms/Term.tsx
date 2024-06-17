import { FC } from "react";
import { SingleTermItem } from "models/learning/dictionary/SingleTermItem";

import s from "./terms.module.scss";

const SingleTerm: FC<SingleTermItem> = ({ term, className }) => {
    return (
        <div
            key={term.id}
            className={`${s.term_wrapper} ${className && className}`}
        >
            <div className={s.term}>{term.name}</div>
            <div className={s.definition}>{term.definition}</div>
        </div>
    );
};

export default SingleTerm;
