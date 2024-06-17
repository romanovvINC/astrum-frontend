import React, { FC, useCallback } from "react";
import { Col, Container } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "Redux/hooks";
import { authSelectors } from "modules/auth";
import { ProjectActions, ProjectCreateForm } from "modules/product";
import { ButtonBack } from "ui/Button";

import s from "./ProjectEditPage.module.scss";

const ProjectEditPage: FC = () => {
    const { userId, username: accountUsername } = useAppSelector(authSelectors.getBasicInfo);
    const { id } = useParams();
    const navigate = useNavigate();

    const goToProductList = useCallback(() => navigate(`/projects/${id}`), [id]);

    return (
        <Container fluid={false}>
            <Col className={s.header}>
                <ButtonBack
                    breadcrumbsPaths={["Проекты", "Редактирование"]}
                    onClick={goToProductList}
                />
                {
                    //TODO... ПРОВЕРИТЬ НА АДМИНА И МЕНЕДЖЕРА
                    true && <ProjectActions enableEditButton={false} />
                }
            </Col>
            <Col>
                <ProjectCreateForm
                    id={id!}
                    isEdit={true}
                />
            </Col>
        </Container>
    );
};

export default ProjectEditPage;
