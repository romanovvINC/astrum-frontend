import { FC, useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { ButtonBack } from "ui/Button";
import {
    StartTraining,
    ProgressBar,
    Pagination,
    dictionarySelectors,
    setPracticePosition,
    startPracticeRequest,
    setStartedPractice,
    setFinishedPractice,
    checkAnswerRequest,
    setCorrectAnswerOption,
    FinishWindow,
    setPracticeDefault,
    finishPracticeRequest,
} from "modules/learning/dictionary";
import { PracticeType } from "models/learning/dictionary/Practice";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { authSelectors } from "modules/auth";
import { ConstructorPage } from "../../ConstructorPage";
import { PracticeSkeleton } from "modules/learning/dictionary/components/PracticeSkeleton";

import s from "../TermsDefinitionsPages.module.scss";

const TermDefinitionsPage: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [editing, setEditing] = useState<boolean>(false);
    const [answerId, setAnswerId] = useState<string | null>(null);

    const {
        questions,
        position,
        pending,
        startedPractice,
        finishedPractice,
        checkingResults,
        correctAmount,
        practiceId,
    } = useAppSelector(dictionarySelectors.getPractice);
    const { checkedValues } = useAppSelector(dictionarySelectors.getConstructor);
    const { userId } = useAppSelector(authSelectors.getBasicInfo);

    const startClickHandler = () => {
        dispatch(setPracticeDefault());
        dispatch(setStartedPractice(PracticeType.TermDefs));
        dispatch(startPracticeRequest({ userId, type: PracticeType.TermDefs, questionsCount: checkedValues.length }));
    };
    const editClickHandler = () => setEditing(!editing);

    const pageClickHandler = (num: number) => dispatch(setPracticePosition(num));

    const checkAnswerHandler = (testQuestionId: string, testOptionId: string) => {
        if (checkingResults.filter(e => e.questionId === testQuestionId).length === 0) {
            dispatch(checkAnswerRequest({ testQuestionId, testOptionId, userId, position: position + 1 }));
            setAnswerId(testOptionId);
        }
    };

    const goToTrainingsPage = useCallback(() => navigate("/learning/dictionary/trainings"), [navigate]);

    const againClickHandler = () => dispatch(setPracticeDefault());

    const isRightAnswer = (answer: string): boolean => {
        const { rightAnswer } = questions[position];
        if (rightAnswer) {
            return rightAnswer === answer;
        }
        return false;
    };

    useEffect(() => {
        const check = checkingResults.filter(e => e.questionId === questions[position].id);
        if (check.length !== 0 && answerId) {
            const { questionId, result } = check[0];

            if (result === false) {
                const rightAnswer = checkedValues.filter(value => value.id === questions[position].termSourceId);
                if (rightAnswer.length !== 0) {
                    dispatch(
                        setCorrectAnswerOption({ answerId, questionId, result, rightAnswer: rightAnswer[0].definition })
                    );
                }
            } else {
                dispatch(setCorrectAnswerOption({ answerId, questionId, result }));
            }

            if (checkingResults.length === questions.length) {
                setTimeout(() => {
                    dispatch(finishPracticeRequest({ practiceId, userId }));
                    dispatch(setFinishedPractice(PracticeType.TermDefs));
                }, 1000);
            }
        }
    }, [checkingResults, dispatch, position, questions, answerId, practiceId, userId, checkedValues]);

    if (editing) {
        return <ConstructorPage location="Термин-определение" />;
    }

    if (finishedPractice === PracticeType.TermDefs) {
        return (
            <Container>
                <Row>
                    <Col>
                        <ButtonBack
                            breadcrumbsPaths={["Обучение", "Словарь", "Тренировки", "Термин-определение"]}
                            onClick={goToTrainingsPage}
                        />
                    </Col>
                </Row>
                <FinishWindow
                    practiceType={PracticeType.TermDefs}
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
                        breadcrumbsPaths={["Обучение", "Словарь", "Тренировки", "Термин-определение"]}
                        onClick={goToTrainingsPage}
                    />
                </Col>
            </Row>

            {startedPractice === PracticeType.TermDefs ? (
                pending ? (
                    <PracticeSkeleton />
                ) : (
                    <>
                        <Row>
                            <Col md={{ offset: 1, size: 1 }}>
                                <ProgressBar value={(correctAmount / questions.length) * 100} />
                            </Col>
                            <Col md={8}>
                                <h1 className={s.question}>{questions[position].question}</h1>

                                <div className={s.options}>
                                    {questions[position].answerOptions.map(({ answer, id, questionId, correct }) => (
                                        <div
                                            className={`${s.option} ${
                                                correct === true ? s.correct : correct === false && s.wrong
                                            } ${isRightAnswer(answer) && s.right_answer}`}
                                            key={id}
                                            onClick={() => checkAnswerHandler(questionId, id)}
                                        >
                                            {answer}
                                        </div>
                                    ))}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{ offset: 2, size: 8 }}>
                                <Pagination
                                    position={position}
                                    onClick={pageClickHandler}
                                    length={questions.length}
                                />
                            </Col>
                        </Row>
                    </>
                )
            ) : (
                <StartTraining
                    onStartClick={startClickHandler}
                    onEditClick={editClickHandler}
                    header={"Тренировка термин-определение:"}
                    text={
                        "Ты увидишь термин и три варианта определения. Выбери один вариант из предложенных. Выбранный вариант подсветится зеленым или красным цветом - верный был выбран ответ или нет. В конце тренировки тебе покажут, на сколько вопросов ты ответил верно."
                    }
                />
            )}
        </Container>
    );
};

export default TermDefinitionsPage;
