import { FC } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import { YoutrackProjectInfo } from "models/knowledge/YoutrackProjectInfo";

import s from "./KnowledgeProjectCard.module.scss";
import { useAppSelector } from "Redux/hooks";
import { knowledgeSelectors } from "modules/knowledge";

interface IKnowledgeProjectCard {
    project: YoutrackProjectInfo;
    onClick: (id: string) => () => void;
}

const KnowledgeProjectCard: FC<IKnowledgeProjectCard> = ({ project, onClick }) => {
    console.log(project);
    return (
        <Card>
            <CardHeader onClick={onClick(project.id)}>
                <h3 className={s.title}>{project.name}</h3>
            </CardHeader>
            <CardBody>
                <h4>{project.description}</h4>
                <p>Количество статей: {project.articles ?? "неизвестно"}</p>
            </CardBody>
        </Card>
    );
};

export default KnowledgeProjectCard;
