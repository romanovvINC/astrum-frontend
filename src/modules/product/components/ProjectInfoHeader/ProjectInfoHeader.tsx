import React, { FC, useCallback } from "react";
import { Col, Row } from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "Redux/hooks";
import { productSelectors, ProjectActions } from "modules/product";
import { ButtonBack } from "ui/Button";

import s from "./ProjectInfoHeader.module.scss";

interface IProductInfoHeader {
    enableActions: boolean;
}

const ProjectInfoHeader: FC<IProductInfoHeader> = ({ enableActions }) => {
    const {
        pending,
        projectInfo: { productName, productId, name },
    } = useAppSelector(productSelectors.getProductState);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const goBackHandler = useCallback(() => navigate(`/products/${productId}`), [pathname]);

    return (
        <Row>
            <Col className={s.header}>
                <ButtonBack
                    breadcrumbsPaths={[productName, name]}
                    onClick={goBackHandler}
                />
                {enableActions && <ProjectActions />}
            </Col>
        </Row>
    );
};

export default ProjectInfoHeader;
