import React, { FC, memo } from "react";
import { Card, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { ArticleShortInfo } from "models/article/ArticleShortInfo";
import articleDefaultImage from "assets/images/article-default-image.jpg";
import { Image } from "ui/Image";
import { getFormattedMinutesString, getPublishDateString } from "Helpers/GetPublishDateString";
import { VerticalDivider } from "ui/VerticalDivider";
import { Badge } from "ui/Badge";

import s from "./ArticleListElement.module.scss";

const ArticleListElement: FC<ArticleShortInfo> = ({
    name,
    author,
    dateCreated,
    category,
    readingTime,
    coverUrl,
    description,
    tags,
    slug,
}) => {
    return (
        <Card className={s.article}>
            <div className={`blog-box blog-list`}>
                <Row className="blog-box blog-list">
                    <Col xl="5 col-12">
                        <Image
                            style={{ paddingRight: 0 }}
                            className={"img-fluid sm-100-w"}
                            src={coverUrl ?? articleDefaultImage}
                            alt={""}
                        />
                    </Col>
                    <Col xl="7 col-12">
                        <div className={`blog-details ${s.detail}`}>
                            <div className="blog-date">{getPublishDateString(dateCreated)}</div>
                            <Link to={`${slug}`}>
                                <h6 className={s.title}>{name}</h6>
                            </Link>
                            <div className="blog-bottom-content">
                                <ul className={`simple-list ${s.author_info}`}>
                                    <li>
                                        <span className={s.span_1}>Автор:</span>{" "}
                                        <a
                                            className={s.link}
                                            href={`${process.env.PUBLIC_URL}/profile/${author.username}`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <span className={s.span_2}>
                                                {author.name} {author.surname}
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <span className={s.span_1}>Время прочтения:</span>{" "}
                                        <span className={s.span_2}>{getFormattedMinutesString(readingTime)}</span>
                                    </li>
                                    <li className={s.category_and_tags_section}>
                                        <div>
                                            <span className={s.span_1}>Категория:</span>{" "}
                                            <span className={s.span_2}>{category.name}</span>
                                        </div>
                                        {tags.length > 0 && <VerticalDivider height={25} />}
                                        {tags.map(t => (
                                            <Badge
                                                key={t.id}
                                                className={s.tag}
                                                text={t.name}
                                            />
                                        ))}
                                    </li>
                                </ul>
                                <hr />
                                <p className={`mt-0 ${s.description}`}>{description}</p>
                            </div>
                            {/*<PostReaction*/}
                            {/*    className={s.reactions}*/}
                            {/*    likes={likes}*/}
                            {/*    comments={comments}*/}
                            {/*/>*/}
                        </div>
                    </Col>
                </Row>
            </div>
        </Card>
    );
};

export default memo(ArticleListElement);
