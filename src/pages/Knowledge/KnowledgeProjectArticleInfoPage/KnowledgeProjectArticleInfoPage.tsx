import { FC, useCallback } from "react";
import { Container } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { KnowledgeArticleInfo, knowledgeSelectors } from "modules/knowledge";
import { ButtonBack } from "ui/Button";
import { useAppSelector } from "Redux/hooks";

const KnowledgeProjectArticleInfoPage: FC = () => {
    const { title } = useAppSelector(knowledgeSelectors.getKnowledgeArticleInfo);
    const { id, articleId } = useParams();
    const navigate = useNavigate();

    const navigateToKnowledgeArticleList = useCallback(() => navigate(`/knowledge/projects/${id}`), [id]);

    return (
        <Container fluid={false}>
            <ButtonBack
                breadcrumbsPaths={["База знаний", "Статьи", title]}
                onClick={navigateToKnowledgeArticleList}
            />
            <KnowledgeArticleInfo articleId={articleId!} />
        </Container>
    );
};

export default KnowledgeProjectArticleInfoPage;
