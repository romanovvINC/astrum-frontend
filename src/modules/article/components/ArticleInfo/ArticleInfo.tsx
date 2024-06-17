import React, { FC, memo, useEffect } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { getPublishDateString } from "Helpers/GetPublishDateString";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { articleSelectors, getArticleBySlugRequest } from "modules/article";
import ArticleInfoSkeleton from "./ArticleInfoSkeleton";
import { Badge } from "ui/Badge";

import classNames from "classnames";
import s from "./ArticleInfo.module.scss";

interface IArticleInfoProps {
    slug: string;
}

const ArticleInfo: FC<IArticleInfoProps> = ({ slug }) => {
    const { pending, error } = useAppSelector(articleSelectors.getArticleState);
    const { name, dateCreated, author, tags, category, content } = useAppSelector(articleSelectors.getArticleInfo);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getArticleBySlugRequest(slug));
    }, [slug]);

    if (pending) {
        return <ArticleInfoSkeleton />;
    } else if (error) {
        return <div>Ошибка: {error}</div>;
    }

    return (
        <Row className={s.article}>
            <Col xl={12}>
                <span className={s.date_created}>{getPublishDateString(dateCreated)}</span>
            </Col>
            <Col xl={12}>
                <h1 className={s.name}>{name}</h1>
            </Col>
            <Col xl={12}>
                <h2 className={classNames(s.author, s.pair)}>
                    Автор:
                    <span>
                        <a
                            className={s.profile_link}
                            href={`/profile/${author.username}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {author.name} {author.surname}
                        </a>
                    </span>
                </h2>
            </Col>
            <Col xl={12}>
                <h2 className={classNames(s.weight_400, s.pair)}>
                    Категория: <span>{category.name}</span>
                </h2>
            </Col>
            {tags && tags.length > 0 && (
                <Col xl={12}>
                    <ul className={s.tags}>
                        {tags.map(tag => (
                            <li key={`tag-${tag.id}`}>
                                <Badge
                                    className={s.tag}
                                    text={tag.name}
                                />
                            </li>
                        ))}
                    </ul>
                </Col>
            )}
            <Col xl={12}>
                <Card>
                    {content ? (
                        <CardBody
                            className={s.content}
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    ) : (
                        <CardBody>
                            <h2
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                Ничего нет
                            </h2>
                        </CardBody>
                    )}
                </Card>
            </Col>
        </Row>
    );
};

export default memo(ArticleInfo);
