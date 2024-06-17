import { FC } from "react";
import { Container } from "reactstrap";
import { ProjectInfo, ProjectInfoHeader } from "modules/product";
import { useParams } from "react-router-dom";

const ProjectInfoPage: FC = () => {
    const { id } = useParams();
    return (
        <Container fluid={false}>
            <ProjectInfoHeader enableActions={true} />
            <ProjectInfo id={id!} />
        </Container>
    );
};

export default ProjectInfoPage;
