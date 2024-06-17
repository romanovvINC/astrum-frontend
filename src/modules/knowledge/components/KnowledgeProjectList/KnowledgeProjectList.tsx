import { FC, useCallback, useEffect } from "react";
import { Col, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { authSelectors } from "modules/auth";
import { getKnowledgeProjectListRequest, knowledgeSelectors } from "modules/knowledge";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { KnowledgeProjectCard } from "./KnowledgeProjectCard";

const KnowledgeProjectList: FC = () => {
    const { username } = useAppSelector(authSelectors.getBasicInfo);
    const { pendingProjectList, projectList } = useAppSelector(knowledgeSelectors.getKnowledgeState);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getKnowledgeProjectListRequest(username!));
    }, []);

    const navigateToProject = useCallback((id: string) => {
        return () => navigate(id);
    }, []);

    if (pendingProjectList && projectList.length === 0) {
        return <Row>Загрузка...</Row>;
    }

    return (
        <Row>
            {projectList.map(p => (
                <Col
                    xl={6}
                    key={p.id}
                >
                    <KnowledgeProjectCard
                        project={{ ...p }}
                        onClick={navigateToProject}
                    />
                </Col>
            ))}
        </Row>
    );
};

export default KnowledgeProjectList;
