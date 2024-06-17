import { FC } from "react";
import { Container, Row } from "reactstrap";
import { Link } from "react-router-dom";

import s from "./LearningPage.module.scss";

const LearningPage: FC = () => {
    return (
        <Container fluid={false}>
            <Row>
                <h2 className={s.header}>Обучение</h2>
            </Row>
            <Row className={s.cards}>

                <div className={s.card}>
                    <Link to="/learning/dictionary">
                        Словарь
                    </Link>
                </div>

            </Row>
        </Container>
    );
};

export default LearningPage;
