import React, { FC, useMemo, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { ArticleList, ArticleListFilter } from "modules/article";
import { HeaderWithTabs } from "ui/HeaderWithTabs";
import s from "./ArticleListPage.module.scss";

const ArticleListPage: FC = () => {
    const tabsData = useMemo(
        () => [
            { title: "Статьи", value: "articles" },
            { title: "Мои статьи", value: "my-articles" },
        ],
        []
    );
    const [activeTab, setActiveTab] = useState(tabsData[0].value);

    return (
        <>
            <HeaderWithTabs
                tabsData={tabsData}
                activeTab={activeTab}
                createButtonTitle={"Создать статью"}
                createButtonHref={"create"}
                onClickTab={setActiveTab}
            />
            <Container fluid={false}>
                <Row className={s.content}>
                    <Col xl={"9 xl-70"}>
                        <ArticleList isMyArticles={activeTab === tabsData[1].value} />
                    </Col>
                    <Col xl={"3 xl-30"}>
                        <ArticleListFilter />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ArticleListPage;
