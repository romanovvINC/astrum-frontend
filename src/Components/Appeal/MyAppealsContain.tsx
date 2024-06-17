import React, { useCallback, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import AppealsTableData from "./AppealsTableData";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { useQuery } from "@apollo/client/react";
import { getMyAppeals } from "../../Api/AppealApi";
import { Appeal } from "Redux/Reducers/AppealReducer/Types/Appeal";
import { getAppealsSuccess } from "Redux/Reducers/AppealReducer/AppealReducer";
import { authSelectors } from "modules/auth";
import { ButtonMain } from "../../ui/Button";

const MyAppealsContain = () => {
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [cursor, setCursor] = useState("");
    const [take, setTake] = useState("first:10");

    const { pending, appeals } = useAppSelector(state => state.appealReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { userId } = useAppSelector(authSelectors.getBasicInfo);
    //TODO: костыль переделать
    const { data, loading, error, refetch } = useQuery(getMyAppeals(userId, cursor, "", take));
    useEffect(() => {
        refetch();
    }, []);
    useEffect(() => {
        if (data) {
            const appeals: Appeal[] = [];
            let edges = data.appeals.edges;
            setTotalCount(data.appeals.totalCount);
            edges.forEach((cal: any) => {
                appeals.push({
                    id: String(cal.node.id),
                    title: cal.node.title,
                    request: cal.node.request,
                    to: cal.node.to,
                    toName: cal.node.toName,
                    from: cal.node.from,
                    fromName: cal.node.fromName,
                    categories: cal.node.categories,
                    status: cal.node.appealStatus,
                    answer: cal.node.answer,
                    dateCreated: cal.node.dateCreated,
                    closed: cal.node.closed,
                    coverUrl: cal.node.coverUrl,
                    cursor: cal.cursor,
                });
            });
            dispatch(getAppealsSuccess(appeals));
        }
    }, [data]);

    function changePage(newPage: number) {
        let newCursor = "";
        let newTake = "first:10";
        let diff = totalCount / 10;
        if (newPage === Math.ceil(diff)) {
            newTake = `last:${totalCount % 10}`;
        }
        if (newPage > currentPage) {
            newCursor = `after: "${appeals[appeals.length - 1].cursor}"`;
        } else if (newPage != 1 && newPage < currentPage) {
            newCursor = `before: "${appeals[0].cursor}"`;
        }
        setCurrentPage(newPage);
        setCursor(newCursor);
        setTake(newTake);
        refetch();
    }

    const goToCreateAppeal = useCallback(() => navigate("/appeals/create"), []);

    if (pending) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <Container
                fluid={true}
                className="list-products"
            >
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader className="pb-0">
                                <h5>Список моих заявок</h5>
                            </CardHeader>
                            <CardBody>
                                <ButtonMain onClick={goToCreateAppeal}>Подать заявку</ButtonMain>
                                <AppealsTableData
                                    appealsData={appeals}
                                    totalCount={totalCount}
                                    onChangePage={changePage}
                                    empty={"Вы ещё не отправили ни одной заявки"}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
};
export default MyAppealsContain;
