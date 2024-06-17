import { FC, useEffect, useCallback } from "react";
import { Container, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import {
    getTermsRequest,
    getCategoriesRequest,
    SearchTerm,
    Alphabet,
    Terms,
    dictionarySelectors,
    setFilterSorting,
    Categories,
} from "modules/learning/dictionary";
import { ButtonBack, ButtonMain } from "ui/Button";
import { Select } from "ui/Select";
import { BackToTop } from "Components/BackToTop";

import s from "./DictionaryPage.module.scss";

const DictionaryPage: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { sorting } = useAppSelector(dictionarySelectors.getDictionaryFilter);

    useEffect(() => {
        dispatch(getTermsRequest());
        dispatch(getCategoriesRequest());
    }, [dispatch]);

    const goToLearningPage = useCallback(() => navigate("/learning"), [navigate]);

    const goToTrainingsPage = useCallback(() => navigate("/learning/dictionary/trainings"), [navigate]);

    const changeSortValueHandler = (value: string) => dispatch(setFilterSorting(value));

    return (
        <Container>
            <Row>
                <Col sm={8}>
                    <Row>
                        <Col>
                            <ButtonBack
                                onClick={goToLearningPage}
                                breadcrumbsPaths={["Обучение", "Словарь"]}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={6}>
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
                        <Col sm={4}>
                            <Select
                                value={sorting}
                                options={["Алфавиту", "По умолчанию"]}
                                placeholder="Выберите сортировку"
                                label="Сортировать по"
                                labelClassName={s.label}
                                //eslint-disable-next-line
                                //@ts-ignore
                                onChange={changeSortValueHandler}
                            />
                        </Col>
                    </Row>
                    <Row></Row>
                </Col>

                <Col sm={4}>
                    <div className={s.training}>
                        <h2>Хочешь проверить свои знания?</h2>
                        <ButtonMain
                            className={s.training_button}
                            onClick={goToTrainingsPage}
                        >
                            Перейти к тренировкам
                        </ButtonMain>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Terms />
                </Col>
            </Row>
            <BackToTop />
        </Container>
    );
};

export default DictionaryPage;
