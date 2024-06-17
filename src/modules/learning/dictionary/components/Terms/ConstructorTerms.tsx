import { FC, ChangeEvent, useEffect, useMemo, useState, FormEvent } from "react";
import { Spinner } from "reactstrap";
import { useAppSelector, useAppDispatch } from "Redux/hooks";
import {
    dictionarySelectors,
    setConstructorCheckedValues,
    setConstructorIsCheckedAll,
    postConstructorRequest,
} from "modules/learning/dictionary";
import SingleTerm from "./Term";
import { ButtonMain } from "ui/Button";
import { getRightDeclensionTerm } from "Helpers/GetRightDeclension";
import { Checkbox } from "Components/Checkbox";
import { authSelectors } from "modules/auth";
import { Term } from "models/learning/dictionary/Term";
import { TermsSkeleton } from "../TermsSkeleton";

import s from "./terms.module.scss";

const ConstructorTerms: FC = () => {
    const dispatch = useAppDispatch();

    const [showSelected, setShowSelected] = useState<boolean>(false);

    const { pending, terms, error } = useAppSelector(dictionarySelectors.getDictionaryState);
    const { sorting, filterCategories } = useAppSelector(dictionarySelectors.getDictionaryFilter);
    const { checkedValues, isCheckedAll, pending: saving } = useAppSelector(dictionarySelectors.getConstructor);
    const { userId } = useAppSelector(authSelectors.getBasicInfo);

    let sortedTerms = useMemo<Term[]>(() => [...terms], [terms]);

    const toggleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            dispatch(
                setConstructorCheckedValues([
                    ...checkedValues,
                    sortedTerms.filter(value => value.id === e.target.id)[0],
                ])
            );
        } else {
            dispatch(setConstructorCheckedValues(checkedValues.filter(value => value.id !== e.target.id)));
        }
    };

    const selectAllHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setConstructorIsCheckedAll(!isCheckedAll));

        if (isCheckedAll) {
            dispatch(setConstructorCheckedValues([]));
        } else {
            dispatch(setConstructorCheckedValues([...sortedTerms]));
        }
    };

    const showSelectedHandler = (e: ChangeEvent<HTMLInputElement>) => setShowSelected(!showSelected);

    const saveConstructorHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const termIds = checkedValues.map(e => e.id);
        dispatch(postConstructorRequest({ userId, termIds }));
    };

    useEffect(() => {
        if (sortedTerms.map(term => checkedValues.includes(term)).includes(false)) {
            dispatch(setConstructorIsCheckedAll(false));
        } else {
            dispatch(setConstructorIsCheckedAll(true));
        }
    }, [sortedTerms, checkedValues, dispatch]);

    if (pending) {
        return <TermsSkeleton />;
    } else if (sortedTerms.length === 0 || error) {
        return <h4 className={s.message}>Здесь ничего нет</h4>;
    }

    if (sorting === "Алфавиту") {
        sortedTerms.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (filterCategories.length >= 1) {
        sortedTerms = sortedTerms.filter(term => filterCategories.includes(term.category.name));
    }

    return (
        <form
            className={s.terms}
            onSubmit={saveConstructorHandler}
        >
            <div className={s.first_row}>
                <div className={s.select_all}>
                    <Checkbox
                        isChecked={isCheckedAll}
                        onChange={selectAllHandler}
                        label="Выбрать все"
                        id="all"
                    />

                    <Checkbox
                        isChecked={showSelected}
                        onChange={showSelectedHandler}
                        label="Показать выбранные"
                        id="selected"
                    />

                    <div className={s.amount}>
                        Выбрано {checkedValues.length} {getRightDeclensionTerm(checkedValues.length)}
                    </div>
                </div>

                <ButtonMain
                    type="submit"
                    className={s.save_button}
                    disabled={checkedValues.length === 0 || saving}
                >
                    {saving ? (
                        <div className={s.spinner}>
                            <Spinner />
                        </div>
                    ) : (
                        "Сохранить"
                    )}
                </ButtonMain>
            </div>
            {showSelected
                ? checkedValues.map(term => (
                      <Checkbox
                          key={term.id}
                          isChecked={checkedValues.includes(term)}
                          onChange={toggleHandler}
                          label={<SingleTerm term={term} />}
                          id={term.id}
                      />
                  ))
                : sortedTerms.map(term => (
                      <Checkbox
                          key={term.id}
                          isChecked={checkedValues.map(value => value.id).includes(term.id)}
                          onChange={toggleHandler}
                          label={<SingleTerm term={term} />}
                          id={term.id}
                      />
                  ))}
        </form>
    );
};

export default ConstructorTerms;
