import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "reactstrap";
import { ButtonMain } from "ui/Button";
import { dictionarySelectors } from "modules/learning/dictionary";
import { useAppSelector } from "Redux/hooks";
import { FinishWindowItem } from "models/learning/dictionary/FininshWindowItem";
import { PracticeType } from "models/learning/dictionary/Practice";
import SingleTerm from "../Terms/Term";

import s from "./FinishWindow.module.scss";

type Answer = {
    id: string;
    question: string;
    answer: string;
    correct: boolean;
};

const FinishWindow: FC<FinishWindowItem> = ({ againClick, practiceType }) => {
    const navigate = useNavigate();

    const goToTrainingsPage = useCallback(() => navigate("/learning/dictionary/trainings"), [navigate]);

    const goToStatisticsPage = useCallback(() => navigate("/learning/dictionary/trainings/statistics"), [navigate]);

    const { correctAnswers, partlyAnswers, wrongAnswers } = useAppSelector(dictionarySelectors.getFlashTraining);
    const { correctAmount, questions } = useAppSelector(dictionarySelectors.getPractice);

    const isFlash = practiceType === PracticeType.Flash;

    const answers: Answer[] = [];

    questions.forEach(question => {
        question.answerOptions.forEach(option => {
            const { rightAnswer } = question;
            if (option.correct === true || option.correct === false) {
                const { id, answer, correct } = option;
                if (rightAnswer) {
                    answers.push({ id, question: question.question, answer: rightAnswer, correct });
                } else {
                    answers.push({ id, question: question.question, answer, correct });
                }
            }
        });
    });

    return (
        <>
            <Row>
                <Col>
                    <div className={s.finish}>
                        <div className={s.text}>Поздравляю, ты закончил тренировку!</div>

                        {!isFlash && (
                            <div className={s.text}>
                                Твой результат
                                <span>
                                    {correctAmount}/{questions.length}
                                </span>
                            </div>
                        )}

                        <div className={s.buttons}>
                            <ButtonMain onClick={goToTrainingsPage}>Вернуться к выбору тренировки</ButtonMain>
                            <ButtonMain
                                className={s.secondary}
                                variant="secondary"
                                onClick={againClick}
                            >
                                Пройти заново
                            </ButtonMain>
                            <ButtonMain
                                className={s.secondary}
                                variant="secondary"
                                onClick={goToStatisticsPage}
                            >
                                Перейти в статистику
                            </ButtonMain>
                        </div>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col>
                    <div className={s.passed_terms}>
                        <div className={s.text}>Пройденные термины</div>
                        {isFlash ? (
                            <div className={s.result}>
                                {wrongAnswers.length !== 0 && (
                                    <div className={s.items}>
                                        Не знал определение
                                        <div className={s.terms}>
                                            {wrongAnswers.map(answer => (
                                                <SingleTerm
                                                    className={`${s.term} ${s.wrong}`}
                                                    key={answer.id}
                                                    term={answer}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {partlyAnswers.length !== 0 && (
                                    <div className={s.items}>
                                        Частично знал определение
                                        <div className={s.terms}>
                                            {partlyAnswers.map(answer => (
                                                <SingleTerm
                                                    className={`${s.term} ${s.partly}`}
                                                    key={answer.id}
                                                    term={answer}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {correctAnswers.length !== 0 && (
                                    <div className={s.items}>
                                        Знал определение
                                        <div className={s.terms}>
                                            {correctAnswers.map(answer => (
                                                <SingleTerm
                                                    className={`${s.term} ${s.correct}`}
                                                    key={answer.id}
                                                    term={answer}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className={s.result}>
                                {answers.length !== 0 && (
                                    <div className={s.items}>
                                        <div className={s.terms}>
                                            {answers.map(answer => (
                                                <SingleTerm
                                                    className={`${s.term} ${answer.correct ? s.correct : s.wrong}`}
                                                    key={answer.id}
                                                    term={{
                                                        definition:
                                                            practiceType === PracticeType.TermDefs
                                                                ? answer.answer
                                                                : answer.question,
                                                        name:
                                                            practiceType === PracticeType.TermDefs
                                                                ? answer.question
                                                                : answer.answer,
                                                        id: answer.id,
                                                        category: {
                                                            id: "",
                                                            name: "",
                                                        },
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default FinishWindow;
