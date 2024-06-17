import { FC, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { getKnowledgeProjectArticleListRequest, knowledgeSelectors } from "modules/knowledge";
import { KnowledgeProjectArticleCard } from "./KnowledgeProjectArticleCard";

interface IKnowledgeProjectArticleListProps {
    projectId: string;
}

const KnowledgeProjectArticleList: FC<IKnowledgeProjectArticleListProps> = ({ projectId }) => {
    const { pendingArticleList, articleList } = useAppSelector(knowledgeSelectors.getKnowledgeState);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getKnowledgeProjectArticleListRequest(projectId));
    }, []);

    const goToArticleInfoPage = useCallback((articleId: string) => {
        return () => navigate(`articles/${articleId}`);
    }, []);

    if (pendingArticleList && articleList.length === 0) {
        return <Row>Загрузка...</Row>;
    }

    if (articleList.length === 0) {
        return <Row>Статей нет</Row>;
    }

    return (
        <Row>
            {articleList.map(a => (
                <Col
                    xl={3}
                    key={a.id}
                >
                    <KnowledgeProjectArticleCard
                        articleInfo={{ ...a }}
                        onClick={goToArticleInfoPage(a.id)}
                    />
                </Col>
            ))}
        </Row>
    );
};

export default KnowledgeProjectArticleList;
