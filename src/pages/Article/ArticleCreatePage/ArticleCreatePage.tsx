import React, { FC, useCallback } from "react";
import { Col, Container } from "reactstrap";
import { ArticleActions, ArticleCreateForm } from "modules/article";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ButtonBack } from "ui/Button";
import { useAppSelector } from "Redux/hooks";
import { authSelectors } from "modules/auth";

import s from "./ArticleCreatePage.module.scss";

const ArticleCreatePage: FC = () => {
    const { userId, username: accountUsername } = useAppSelector(authSelectors.getBasicInfo);
    const location = useLocation();
    const isEdit = location.pathname.includes("edit");
    const { username, articleName } = useParams();
    const slug = `${username}/${articleName}`;
    const breadcrumbPath = isEdit ? "Редактирование" : "Создание";
    const navigate = useNavigate();

    const goToArticleList = useCallback(() => navigate("/articles"), []);

    return (
        <Container
            fluid={false}
            className={s.container}
        >
            <Col className={s.header}>
                <ButtonBack
                    breadcrumbsPaths={["Статьи", breadcrumbPath]}
                    onClick={goToArticleList}
                />
                {isEdit && accountUsername.toLowerCase() === username!.toLowerCase() && (
                    <ArticleActions
                        enableEditButton={false}
                        enableDeleteButton={isEdit}
                    />
                )}
            </Col>
            <ArticleCreateForm
                userId={userId}
                isEdit={isEdit}
                slug={slug}
            />
        </Container>
    );
};

export default ArticleCreatePage;
