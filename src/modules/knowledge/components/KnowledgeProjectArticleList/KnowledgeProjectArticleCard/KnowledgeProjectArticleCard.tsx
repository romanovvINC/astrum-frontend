import { FC } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import { KnowledgeArticleInfo } from "models/knowledge/KnowledgeArticleInfo";

import s from "./KnowledgeProjectArticleCard.module.scss";

interface IKnowledgeProjectArticleCardProps {
    articleInfo: KnowledgeArticleInfo;
    onClick: () => void;
}

const KnowledgeProjectArticleCard: FC<IKnowledgeProjectArticleCardProps> = ({ articleInfo, onClick }) => {
    return (
        <Card
            className={s.article_card}
            onClick={onClick}
        >
            <CardHeader>
                <h3 className={s.title}>{articleInfo.title}</h3>
            </CardHeader>
            <CardBody>
                <h4>
                    Автор: <b>{articleInfo.author ? articleInfo.author.nameWithSurname : "Неизвестно"}</b>
                </h4>
            </CardBody>
        </Card>
    );
};

export default KnowledgeProjectArticleCard;
