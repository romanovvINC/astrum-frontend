import React, { FC, useCallback } from "react";
import { Col, Container, Row } from "reactstrap";
import { ButtonBack } from "ui/Button";
import { ArticleActions, ArticleInfo } from "modules/article";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "Redux/hooks";
import { authSelectors } from "modules/auth";

import s from "./ArticleInfoPage.module.scss";

const ArticleInfoPage: FC = () => {
    const { username: accountUsername } = useAppSelector(authSelectors.getBasicInfo);
    const navigate = useNavigate();
    const { username, articleName } = useParams();
    const slug = `${username}/${articleName}`;

    const goToArticleList = useCallback(() => navigate("/articles"), []);

    return (
        <Container fluid={false}>
            <Row>
                <Col className={s.header}>
                    <ButtonBack
                        breadcrumbsPaths={["Статьи", articleName!.replace(/-/g, " ")]}
                        onClick={goToArticleList}
                    />
                    {accountUsername.toLowerCase() === username!.toLowerCase() && <ArticleActions />}
                </Col>
            </Row>
            <ArticleInfo slug={slug} />
        </Container>
    );
};

export default ArticleInfoPage;
