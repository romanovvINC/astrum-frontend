import { FC, useEffect } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { getKnowledgeProjectArticleInfoRequest, knowledgeSelectors } from "modules/knowledge";

import s from "./KnowledgeArticleInfo.module.scss";

interface IKnowledgeArticleInfoProps {
    articleId: string;
}

const KnowledgeArticleInfo: FC<IKnowledgeArticleInfoProps> = ({ articleId }) => {
    const { pending } = useAppSelector(knowledgeSelectors.getKnowledgeState);
    const { title, author, content } = useAppSelector(knowledgeSelectors.getKnowledgeArticleInfo);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getKnowledgeProjectArticleInfoRequest(articleId));
    }, []);

    if (pending) {
        return <Row>Загрузка...</Row>;
    }

    return (
        <Row className={s.article_info}>
            <h1>{title}</h1>
            <h3>Автор: {author ? author.nameWithSurname : "Неизвесто"}</h3>
            <Col>
                <Card>
                    <CardBody dangerouslySetInnerHTML={{ __html: content }} />
                </Card>
            </Col>
        </Row>
    );
};

export default KnowledgeArticleInfo;
