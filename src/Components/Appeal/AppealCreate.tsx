import React, { FC, useEffect } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import FormAppeal from "./FormAppeal";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { getAppealCreatePageRequest } from "../../Redux/Reducers/AppealReducer/AppealReducer";

const AppealCreate: FC = () => {
    const createData = useAppSelector(state => state.appealReducer.appealCreatePageData);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAppealCreatePageRequest());
    }, []);

    return (
        <Container fluid={true}>
            {createData && (
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader className="pb-0">
                                <h5>Новая заявка</h5>
                            </CardHeader>
                            <CardBody className="add-post">
                                <FormAppeal createData={createData} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default AppealCreate;
