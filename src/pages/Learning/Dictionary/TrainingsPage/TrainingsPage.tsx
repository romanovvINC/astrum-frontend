import { FC, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { ButtonBack } from "ui/Button";
import {
    TrainingCard,
    dictionarySelectors,
    getStatsSummaryRequest,
    getTermsRequest,
} from "modules/learning/dictionary";
import { authSelectors } from "modules/auth";
import { RedoIcon } from "ui/icons";
import { useAppSelector, useAppDispatch } from "Redux/hooks";
import {
    getRightDeclensionTerm,
    getRightDeclensionTraining,
    getRightDeclensionFinished,
} from "Helpers/GetRightDeclension";

import s from "./TrainingsPage.module.scss";

const TrainingsPage: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { terms } = useAppSelector(dictionarySelectors.getDictionaryState);
    const {
        summary: { countCompleted },
    } = useAppSelector(dictionarySelectors.getStats);
    const { userId } = useAppSelector(authSelectors.getBasicInfo);

    const goToDictionaryPage = useCallback(() => navigate("/learning/dictionary"), [navigate]);

    const goToTermDefinitionsPage = useCallback(
        () => navigate("/learning/dictionary/trainings/term-definitions"),
        [navigate]
    );
    const goToDefinitionTermsPage = useCallback(
        () => navigate("/learning/dictionary/trainings/definition-terms"),
        [navigate]
    );
    const goToFlashCardsPage = useCallback(() => navigate("/learning/dictionary/trainings/flash-cards"), [navigate]);
    const goToConstructorPage = useCallback(() => navigate("/learning/dictionary/trainings/constructor"), [navigate]);
    const goToStatisticsPage = useCallback(() => navigate("/learning/dictionary/trainings/statistics"), [navigate]);

    useEffect(() => {
        dispatch(getTermsRequest());
        dispatch(getStatsSummaryRequest(userId));
    }, [dispatch, userId]);

    return (
        <Container className={s.trainings}>
            <Row>
                <Col>
                    <ButtonBack
                        breadcrumbsPaths={["Обучение", "Словарь", "Тренировки"]}
                        onClick={goToDictionaryPage}
                    />
                </Col>
            </Row>
            <Row>
                <TrainingCard
                    header="Термин-определение"
                    items={["Термин", "Определение", "Определение", "Определение"]}
                    text="Выбери верное определение к термину из трех предложенных"
                    onClick={goToTermDefinitionsPage}
                />
                <TrainingCard
                    header="Определение-термин"
                    items={["Определение", "Термин", "Термин", "Термин"]}
                    text="Выбери верный термин к оперделению из трех предложенных"
                    onClick={goToDefinitionTermsPage}
                />
                <TrainingCard
                    header="Flash-карточки"
                    items={["Термин"]}
                    text="Заучивай новые термины и определения с помощью карточек"
                    icon={<RedoIcon color="#292D32" />}
                    className="items_flash"
                    onClick={goToFlashCardsPage}
                />
                <Col
                    className={s.last_col}
                    md={3}
                >
                    <div
                        className={s.item}
                        onClick={goToConstructorPage}
                    >
                        <h2>Конструктор</h2>
                        <span className={s.amount}>{terms.length}</span>
                        <div>{getRightDeclensionTerm(terms.length)} для тренировки</div>
                    </div>

                    <div
                        className={s.item}
                        onClick={goToStatisticsPage}
                    >
                        <h2>Статистика</h2>
                        <span className={s.amount}>{countCompleted}</span>
                        <div>
                            {getRightDeclensionTraining(countCompleted)} {getRightDeclensionFinished(countCompleted)}
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default TrainingsPage;
