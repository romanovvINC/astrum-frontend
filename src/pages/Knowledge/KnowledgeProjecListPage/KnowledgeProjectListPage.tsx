import { FC } from "react";
import { Container } from "reactstrap";
import { KnowledgeProjectList } from "modules/knowledge";

import s from "./KnowledgeProjectListPage.module.scss";

const KnowledgeProjectListPage: FC = () => {
    return (
        <Container fluid={false}>
            <h2 className={s.title}>База знаний</h2>
            <KnowledgeProjectList />
        </Container>
    );
};

export default KnowledgeProjectListPage;
