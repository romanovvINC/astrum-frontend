import { FC, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import {
    SearchTerm,
    Alphabet,
    ConstructorTerms,
    Categories,
    dictionarySelectors,
    setFilterSorting,
    getCategoriesRequest,
    getTermsRequest,
    getConstructorSelectedRequest,
} from "modules/learning/dictionary";
import { authSelectors } from "modules/auth";
import { useAppSelector, useAppDispatch } from "Redux/hooks";
import { Select } from "ui/Select";
import { ButtonBack } from "ui/Button";
import { ConstructorPageItem } from "models/learning/dictionary/ConstructorPageItem";
import { BackToTop } from "Components/BackToTop";

import s from "./ConstructorPage.module.scss";

const ConstructorPage: FC<ConstructorPageItem> = ({ location }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { sorting } = useAppSelector(dictionarySelectors.getDictionaryFilter);
    const { userId } = useAppSelector(authSelectors.getBasicInfo);

    useEffect(() => {
        dispatch(getTermsRequest());
        dispatch(getCategoriesRequest());
        dispatch(getConstructorSelectedRequest(userId));
    }, [dispatch, userId]);

    const changeSortValueHandler = (value: string) => dispatch(setFilterSorting(value));

    const goToTrainingsPage = useCallback(() => navigate("/learning/dictionary/trainings"), [navigate]);

    return (
        <Container>
            <Row>
                <Col>
                    <ButtonBack
                        breadcrumbsPaths={["Обучение", "Словарь", "Тренировки", location]}
                        onClick={goToTrainingsPage}
                    />
                </Col>
            </Row>
            <Row>
                <h2 className={s.header}>Выберите слова или категории, которые хотите включить в тренировку</h2>
            </Row>
            <Row>
                <Col md={4}>
                    <SearchTerm />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Alphabet />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Categories />
                </Col>
            </Row>
            <Row>
                <Col md={3}>
                    <Select
                        value={sorting}
                        options={["Алфавиту"]}
                        placeholder="Выберите сортировку"
                        label="Сортировать по"
                        labelClassName={s.label}
                        //eslint-disable-next-line
                        //@ts-ignore
                        onChange={changeSortValueHandler}
                    />
                </Col>
            </Row>

            <Row>
                <Col>
                    <ConstructorTerms />
                </Col>
            </Row>
            <BackToTop />
        </Container>
    );
};

export default ConstructorPage;
