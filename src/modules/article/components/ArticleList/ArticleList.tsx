import React, { FC, useEffect } from "react";
import { Col, Row } from "reactstrap";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { articleSelectors, getArticleListRequest } from "modules/article";
import { ArticleListElement, ArticleListElementSkeleton } from "./ArticleListElement";
import { authSelectors } from "modules/auth";

interface IArticleListProps {
    isMyArticles: boolean;
}

const ArticleList: FC<IArticleListProps> = ({ isMyArticles }) => {
    const {
        pending,
        pendingAsync,
        articleListInfo: { articles, filter },
    } = useAppSelector(articleSelectors.getArticleState);
    const { userId } = useAppSelector(authSelectors.getBasicInfo);
    const resultArticles = articles.filter(a => !isMyArticles || (isMyArticles && a.author.userId === userId));

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getArticleListRequest(filter));
    }, [filter]);

    if (resultArticles.length === 0 && pending) {
        return (
            <Row>
                <Col
                    xl={12}
                    sm={6}
                >
                    <ArticleListElementSkeleton />
                </Col>
                <Col
                    xl={12}
                    sm={6}
                >
                    <ArticleListElementSkeleton />
                </Col>
            </Row>
        );
    } else if (resultArticles.length === 0) {
        return <h3 style={{ fontWeight: 400 }}>Нет статей</h3>;
    } else {
        return (
            <Row>
                {resultArticles.map(a => (
                    <Col
                        key={a.id}
                        xl={12}
                        sm={6}
                    >
                        <ArticleListElement {...a} />
                    </Col>
                ))}
                {pendingAsync && (
                    <>
                        <Col
                            xl={12}
                            sm={6}
                        >
                            <ArticleListElementSkeleton />
                        </Col>
                        <Col
                            xl={12}
                            sm={6}
                        >
                            <ArticleListElementSkeleton />
                        </Col>
                    </>
                )}
            </Row>
        );
    }
};

export default ArticleList;
