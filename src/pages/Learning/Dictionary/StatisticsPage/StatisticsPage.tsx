import { FC, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { Doughnut, Bar } from "react-chartjs-2";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { dictionarySelectors, getStatsSummaryRequest, getStatsTestsRequest } from "modules/learning/dictionary";
import { authSelectors } from "modules/auth";
import { ChartData } from "chart.js";
import { ButtonBack } from "ui/Button";
import { PracticeType } from "models/learning/dictionary/Practice";
import { StatisticsSkeleton } from "modules/learning/dictionary/components/StatisticsSkeleton";
import "chart.js/auto";

import s from "./StatisticsPage.module.scss";

const StatisticsPage: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { userId } = useAppSelector(authSelectors.getBasicInfo);
    const {
        summary: { countCompleted, practices },
        summaryPending,
        testsPending,
        tests,
    } = useAppSelector(dictionarySelectors.getStats);

    const goToTrainingsPage = useCallback(() => navigate("/learning/dictionary/trainings"), [navigate]);

    useEffect(() => {
        dispatch(getStatsSummaryRequest(userId));
        dispatch(getStatsTestsRequest({ userId, practiceTypes: [PracticeType.TermDefs, PracticeType.DefTerms] }));
    }, [dispatch, userId]);

    const doughnutFlashDataset = practices.filter(e => e.type === PracticeType.Flash).map(e => e.countCompleted);
    const doughnutTermDefsDataset = practices.filter(e => e.type === PracticeType.TermDefs).map(e => e.countCompleted);
    const doughnutDefTermsDataset = practices.filter(e => e.type === PracticeType.DefTerms).map(e => e.countCompleted);

    const doughnutData: ChartData<"doughnut", number[], string> = {
        labels: ["Flash-карточки", "Тер. — опр.", "Опр. — тер."],
        datasets: [
            {
                data: [
                    doughnutFlashDataset.length === 0 ? 0 : doughnutFlashDataset[0],
                    doughnutTermDefsDataset.length === 0 ? 0 : doughnutTermDefsDataset[0],
                    doughnutDefTermsDataset.length === 0 ? 0 : doughnutDefTermsDataset[0],
                ],
                backgroundColor: ["#AEAEF1", "#BDDBE1", "#ACD0AF"],
            },
        ],
    };

    const barTermDefsData: ChartData<"bar", number[], string> = {
        labels: ["", "", "", ""],
        datasets: [
            {
                label: "Неверно",
                data: tests.length > 0 ? tests[0].lastTestsStats.map(e => e.wrong) : [0],
                backgroundColor: "#D55",
            },
            {
                label: "Верно",
                data: tests.length > 0 ? tests[0].lastTestsStats.map(e => e.correct) : [0],
                backgroundColor: "#81C314",
            },
        ],
    };

    const barDefTermsData: ChartData<"bar", number[], string> = {
        labels: ["", "", "", ""],
        datasets: [
            {
                label: "Неверно",
                data: tests.length > 0 ? tests[1].lastTestsStats.map(e => e.wrong) : [0],
                backgroundColor: "#D55",
            },
            {
                label: "Верно",
                data: tests.length > 0 ? tests[1].lastTestsStats.map(e => e.correct) : [0],
                backgroundColor: "#81C314",
            },
        ],
    };

    return (
        <Container>
            <Row>
                <Col>
                    <ButtonBack
                        breadcrumbsPaths={["Обучение", "Словарь", "Тренировки", "Статистика тренировок"]}
                        onClick={goToTrainingsPage}
                    />
                </Col>
            </Row>

            {summaryPending || testsPending ? (
                <StatisticsSkeleton />
            ) : (
                <Row>
                    <Col md={4}>
                        <div className={s.statistic_card}>
                            <h3>Общее количество тренировок</h3>
                            <div className={s.amount}>
                                <span className={s.amount_num}>{countCompleted}</span>тренировок завершено
                            </div>
                            <Row>
                                <Col md={6}>
                                    <Doughnut
                                        data={doughnutData}
                                        options={{ plugins: { legend: { display: false } }, cutout: "20" }}
                                    />
                                </Col>
                                <Col md={6}>
                                    <h3>Виды завершенных тренировок</h3>
                                    <div className={s.option}>
                                        <span className={`${s.option_color} ${s.flash}`} /> Flash-карточки
                                    </div>
                                    <div className={s.option}>
                                        <span className={`${s.option_color} ${s.term}`} /> Тер. — опр.
                                    </div>
                                    <div className={s.option}>
                                        <span className={`${s.option_color} ${s.def}`} /> Опр. — тер.
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>

                    <Col md={4}>
                        <div className={s.statistic_card}>
                            <h3>Статистика тренировок термин — определение</h3>
                            <div className={s.amount}>
                                <span className={s.amount_num}>{tests.length > 0 && tests[0].successRate}%</span>—
                                средний показатель успеха
                            </div>
                            <div className={s.text}>Результаты последних четырех тренировок</div>
                            <Bar
                                data={barTermDefsData}
                                options={{
                                    plugins: { legend: { display: false } },
                                    scales: {
                                        x: { stacked: true },
                                        y: { stacked: true, ticks: { font: { size: 16 } } },
                                    },
                                }}
                            />
                            <div className={s.inline_options}>
                                <div className={s.option}>
                                    <span className={`${s.option_color} ${s.correct}`} />
                                    Верно
                                </div>
                                <div className={s.option}>
                                    <span className={`${s.option_color} ${s.wrong}`} />
                                    Неверно
                                </div>
                            </div>
                        </div>
                    </Col>

                    <Col md={4}>
                        <div className={s.statistic_card}>
                            <h3>Статистика тренировок определение — термин</h3>
                            <div className={s.amount}>
                                <span className={s.amount_num}>{tests.length > 0 && tests[1].successRate}%</span>—
                                средний показатель успеха
                            </div>
                            <div className={s.text}>Результаты последних четырех тренировок</div>
                            <Bar
                                data={barDefTermsData}
                                options={{
                                    plugins: { legend: { display: false } },
                                    scales: {
                                        x: { stacked: true },
                                        y: { stacked: true, ticks: { font: { size: 16 } } },
                                    },
                                }}
                            />
                            <div className={s.inline_options}>
                                <div className={s.option}>
                                    <span className={`${s.option_color} ${s.correct}`} />
                                    Верно
                                </div>
                                <div className={s.option}>
                                    <span className={`${s.option_color} ${s.wrong}`} />
                                    Неверно
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default StatisticsPage;
