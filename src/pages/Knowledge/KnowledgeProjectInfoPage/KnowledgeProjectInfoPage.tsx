import { FC, useCallback } from "react";
import { Card, CardBody, Container } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { KnowledgeProjectArticleList, KnowledgeProjectInfo, knowledgeSelectors } from "modules/knowledge";
import { useAppSelector } from "Redux/hooks";
import { ButtonBack } from "ui/Button";

const KnowledgeProjectInfoPage: FC = () => {
    const { name } = useAppSelector(knowledgeSelectors.getKnowledgeProjectInfo);
    const { id } = useParams();
    const navigate = useNavigate();

    const goToProjectList = useCallback(() => navigate("/knowledge/projects"), []);

    return (
        <Container fluid={false}>
            <ButtonBack
                breadcrumbsPaths={["База знаний", name]}
                onClick={goToProjectList}
            />
            <KnowledgeProjectInfo projectId={id!} />
            <h2>Статьи</h2>
            <Card>
                <CardBody>
                    <KnowledgeProjectArticleList projectId={id!} />
                </CardBody>
            </Card>
        </Container>
    );
};

export default KnowledgeProjectInfoPage;
