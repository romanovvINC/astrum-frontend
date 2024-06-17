import { FC, useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Spinner } from "reactstrap";
import { ButtonBack } from "ui/Button";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import {
    StartTraining,
    ProgressBar,
    Pagination,
    dictionarySelectors,
    setStartedPractice,
    setFinishedPractice,
    startPracticeRequest,
    setPracticePosition,
    finishPracticeRequest,
    checkAnswerRequest,
    setPracticeDefault,
    setCorrectAnswerOption,
    FinishWindow,
} from "modules/learning/dictionary";
import { authSelectors } from "modules/auth";
import { ConstructorPage } from "../../ConstructorPage";
import { PracticeType } from "models/learning/dictionary/Practice";
import { PracticeSkeleton } from "modules/learning/dictionary/components/PracticeSkeleton";

import s from "../TermsDefinitionsPages.module.scss";

const DefinitionTermsPage: FC = () => {
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
        dispatch(setStartedPractice(PracticeType.DefTerms));
        dispatch(startPracticeRequest({ questionsCount: checkedValues.length, type: PracticeType.DefTerms, userId }));
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
                        setCorrectAnswerOption({ answerId, questionId, result, rightAnswer: rightAnswer[0].name })
                    );
                }
            } else {
                dispatch(setCorrectAnswerOption({ answerId, questionId, result }));
            }

            // TODO find out about timeout
            if (checkingResults.length === questions.length) {
                setTimeout(() => {
                    dispatch(finishPracticeRequest({ practiceId, userId }));
                    dispatch(setFinishedPractice(PracticeType.DefTerms));
                }, 1000);
            }
        }
    }, [checkingResults, dispatch, position, questions, answerId, practiceId, userId, checkedValues]);

    if (editing) {
        return <ConstructorPage location="Определение-термин" />;
    }

    if (finishedPractice === PracticeType.DefTerms) {
        return (
            <Container>
                <Row>
                    <Col>
                        <ButtonBack
                            breadcrumbsPaths={["Обучение", "Словарь", "Тренировки", "Определение-термин"]}
                            onClick={goToTrainingsPage}
                        />
                    </Col>
                </Row>
                <FinishWindow
                    practiceType={PracticeType.DefTerms}
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
                        breadcrumbsPaths={["Обучение", "Словарь", "Тренировки", "Определение-термин"]}
                        onClick={goToTrainingsPage}
                    />
                </Col>
            </Row>

            {startedPractice === PracticeType.DefTerms ? (
                pending ? (
                    <PracticeSkeleton />
                ) : (
                    <>
                        <Row>
                            <Col md={{ offset: 1, size: 1 }}>
                                <ProgressBar value={(correctAmount / questions.length) * 100} />
                            </Col>
                            <Col md={8}>
                                <h2 className={s.question}>{questions[position].question}</h2>

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
                                    onClick={pageClickHandler}
                                    position={position}
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
                    header={"Тренировка определение-термин:"}
                    text={
                        "Ты увидишь определение и три варианта тремина. Выбери один вариант из предложенных. Выбранный вариант подсветится зеленым или красным цветом - верный был выбран ответ или нет. В конце тренировки тебе покажут, на сколько вопросов ты ответил верно."
                    }
                />
            )}
        </Container>
    );
};

export default DefinitionTermsPage;
