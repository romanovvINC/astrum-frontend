import { FC, useEffect } from "react";
import { Col, Row } from "reactstrap";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { getYoutrackProjectRequest, knowledgeSelectors } from "modules/knowledge";

interface IKnowledgeProjectInfoProps {
    projectId: string;
}

const KnowledgeProjectInfo: FC<IKnowledgeProjectInfoProps> = ({ projectId }) => {
    const {
        pending,
        projectInfo: { name, shortName, description, leader, members, issues },
    } = useAppSelector(knowledgeSelectors.getKnowledgeState);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getYoutrackProjectRequest(projectId));
    }, []);

    if (pending) {
        return <Row>Загрузка...</Row>;
    }

    return (
        <Row>
            <Col xl={12}>
                <h1>{name}</h1>
            </Col>
            <Col xl={12}>
                <h3>{}</h3>
            </Col>
            <Col xl={12}>
                <h3>Владелец: {leader?.nameWithSurname}</h3>
                <p>{description}</p>
            </Col>
            {issues.length > 0 && (
                <Col>
                    <h3>Issues</h3>
                    <ul>
                        {issues.map(i => (
                            <li key={i.id}>{i.summary}</li>
                        ))}
                    </ul>
                </Col>
            )}
        </Row>
    );
};

export default KnowledgeProjectInfo;
