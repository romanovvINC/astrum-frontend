import { FC, useCallback, useState, useEffect, MouseEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Spinner } from "reactstrap";
import { ButtonBack, ButtonMain } from "ui/Button";
import { RedoIcon, ArrowDown } from "ui/icons";
import {
    StartTraining,
    FinishWindow,
    dictionarySelectors,
    finishFlashPracticeRequest,
    setFlashCorrectAnswer,
    setFlashPartlyAnswer,
    setFlashWrongAnswer,
    getTermByIdRequest,
    setFlashPosition,
    setFlashDefault,
    startFlashCardsPracticeRequest,
} from "modules/learning/dictionary";
import { authSelectors } from "modules/auth";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { ConstructorPage } from "../ConstructorPage";
import { PracticeType } from "models/learning/dictionary/Practice";

import s from "./FlashCardsPage.module.scss";

enum FlashCardAnswer {
    Correct = "correct",
    Partly = "partly",
    Wrong = "wrong",
}

const FlashCardsPage: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [isFlipped, setIsFlipped] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<FlashCardAnswer | null>(null);
    const [editing, setEditing] = useState<boolean>(false);

    const { userId } = useAppSelector(authSelectors.getBasicInfo);

    const { pending, termIds, currentCard, position, isFinished, isStarted, error, practiceId } = useAppSelector(
        dictionarySelectors.getFlashTraining
    );

    const { checkedValues } = useAppSelector(dictionarySelectors.getConstructor);

    const goToTrainingsPage = useCallback(() => navigate("/learning/dictionary/trainings"), [navigate]);

    const flipClickHandler = () => setIsFlipped(!isFlipped);

    const startClickHandler = () => {
        dispatch(
            startFlashCardsPracticeRequest({
                questionsCount: checkedValues.length,
                type: PracticeType.Flash,
                userId,
            })
        );
    };

    const editClickHandler = () => setEditing(!editing);

    useEffect(() => {
        if (position !== termIds.length) {
            dispatch(getTermByIdRequest(termIds[position]));
        }
    }, [dispatch, position, termIds]);

    const nextClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        dispatch(setFlashPosition(position + 1));

        if (selectedOption === FlashCardAnswer.Correct) {
            dispatch(setFlashCorrectAnswer(currentCard));
        } else if (selectedOption === FlashCardAnswer.Partly) {
            dispatch(setFlashPartlyAnswer(currentCard));
        } else {
            dispatch(setFlashWrongAnswer(currentCard));
        }

        setIsFlipped(false);
        setSelectedOption(null);

        if (position === termIds.length - 1) {
            dispatch(finishFlashPracticeRequest({ userId, practiceId }));
        }
    };

    const changeAnswerHandler = ({ target: { id } }: ChangeEvent<HTMLInputElement>) => {
        if (id === FlashCardAnswer.Correct || id === FlashCardAnswer.Partly || id === FlashCardAnswer.Wrong) {
            setSelectedOption(id);
        }
    };

    const againClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        dispatch(setFlashDefault());
    };

    if (error) {
        return (
            <Container>
                <Row>
                    <Col>
                        <ButtonBack
                            breadcrumbsPaths={["Обучение", "Словарь", "Тренировки", "Flash-карточки"]}
                            onClick={goToTrainingsPage}
                        />
                    </Col>
                </Row>
                <h1>Ошибка</h1>
            </Container>
        );
    }

    if (editing) {
        return <ConstructorPage location="Flash-карточки" />;
    }

    if (isFinished) {
        return (
            <Container>
                <Row>
                    <Col>
                        <ButtonBack
                            breadcrumbsPaths={["Обучение", "Словарь", "Тренировки", "Flash-карточки"]}
                            onClick={goToTrainingsPage}
                        />
                    </Col>
                </Row>
                <FinishWindow
                    practiceType={PracticeType.Flash}
                    againClick={againClickHandler}
                />
            </Container>
        );
    }

    return (
        <Container>
            <Row>
                <Col>
                    <ButtonBack
                        breadcrumbsPaths={["Обучение", "Словарь", "Тренировки", "Flash-карточки"]}
                        onClick={goToTrainingsPage}
                    />
                </Col>
            </Row>

            {isStarted ? (
                <>
                    <Row>
                        <Col md={{ offset: 2, size: 8 }}>
                            <div className={`${s.flash_card} ${isFlipped && s.flipped}`}>
                                <div className={s.flash_card_inner}>
                                    {pending ? (
                                        <div className={s.spinner}>
                                            <Spinner />
                                        </div>
                                    ) : (
                                        <>
                                            <div className={s.flash_card_front}>
                                                <h1 className={s.term}>{currentCard.name}</h1>
                                                <div className={s.hint}>
                                                    <div>
                                                        Постарайся вспомнить и проговорить определение и только потом
                                                        переверни карточку
                                                    </div>
                                                    <ArrowDown
                                                        className={s.arrow}
                                                        color="#999"
                                                    />
                                                </div>
                                            </div>

                                            <div className={s.flash_card_back}>
                                                <Row>
                                                    <Col>
                                                        <div>{currentCard.definition}</div>
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col md={4}>
                                                        <label className={s.form_control}>
                                                            <input
                                                                type="radio"
                                                                name="flash"
                                                                id={FlashCardAnswer.Correct}
                                                                checked={selectedOption === FlashCardAnswer.Correct}
                                                                onChange={changeAnswerHandler}
                                                            />
                                                            Знал определение
                                                        </label>
                                                    </Col>
                                                    <Col md={4}>
                                                        <label className={s.form_control}>
                                                            <input
                                                                type="radio"
                                                                name="flash"
                                                                id={FlashCardAnswer.Partly}
                                                                checked={selectedOption === FlashCardAnswer.Partly}
                                                                onChange={changeAnswerHandler}
                                                            />
                                                            Частино знал определение
                                                        </label>
                                                    </Col>
                                                    <Col md={4}>
                                                        <label className={s.form_control}>
                                                            <input
                                                                type="radio"
                                                                name="flash"
                                                                id={FlashCardAnswer.Wrong}
                                                                checked={selectedOption === FlashCardAnswer.Wrong}
                                                                onChange={changeAnswerHandler}
                                                            />
                                                            Не знал определение
                                                        </label>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </Col>
                    </Row>

                    {!isFinished && (
                        <Row>
                            <Col>
                                {selectedOption === null ? (
                                    <ButtonMain
                                        className={s.redo_icon}
                                        onClick={flipClickHandler}
                                        variant="secondary"
                                    >
                                        <RedoIcon color="#000" />
                                    </ButtonMain>
                                ) : (
                                    <ButtonMain
                                        className={s.redo_icon}
                                        onClick={nextClickHandler}
                                        variant="secondary"
                                    >
                                        <ArrowDown
                                            color="#000"
                                            className={s.arrow_next}
                                        />
                                    </ButtonMain>
                                )}
                            </Col>
                        </Row>
                    )}
                </>
            ) : (
                <StartTraining
                    onStartClick={startClickHandler}
                    onEditClick={editClickHandler}
                    header={"Тренировка flash-карточки:"}
                    text={
                        "На карточке ты увидишь термин. Постарайся вспомнить и проговорить определение вслух или про себя. Чтобы проверить себя, переверни карточку, там будет написан ответ. После проверки ответа отметь, насколько хорошо ты знал определение. Тренировка длится до тех пор, пока все определения не будут заучены."
                    }
                />
            )}
        </Container>
    );
};

export default FlashCardsPage;
