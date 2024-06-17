import React, { FC } from "react";
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { ArticlePost } from "models/post/ArticlePost";
import { PostCard } from "modules/post/components/PostCard";
import { Image } from "ui/Image";

import s from "./ArticlePostItem.module.scss";
import { convertToUrlArticleName } from "modules/post/helpers";

interface IArticlePostItemProps extends ArticlePost {
    onClickDelete: (id: string) => void;
}

const ArticlePostItem: FC<IArticlePostItemProps> = ({
    id,
    user,
    dateCreated,
    title,
    attachments,
    readingTime,
    description,
    likes,
    likesCount,
    likeId,
    comments,
    onClickDelete,
}) => {
    return (
        <PostCard
            className={s.article}
            id={id}
            publishDate={dateCreated}
            user={user}
            comments={comments}
            likes={likes}
            onClickDelete={onClickDelete}
            likesCount={likesCount}
            likeId={likeId}
        >
            <Row className="blog-box blog-list">
                {attachments?.length > 0 && (
                    <Col xl="5 col-12">
                        <Image
                            style={{ padding: 0 }}
                            className={"img-fluid sm-100-w"}
                            src={attachments[0].url}
                            alt={""}
                        />
                    </Col>
                )}
                <Col
                    xl="7 col-12"
                    className={s.article_info}
                >
                    <div className={`blog-details ${s.detail}`}>
                        <div className="blog-date">{"5 октября 2022"}</div>
                        <Link to={`/articles/${user.username}/${convertToUrlArticleName(title)}`}>
                            <h6 className={s.title}>{title}</h6>
                        </Link>
                        <ul className={`simple-list ${s.author_info}`}>
                            <li>{`Автор: ${user.nameWithSurname}`}</li>
                            <li>{`Время прочтения: ${readingTime} минут`}</li>
                        </ul>
                        <hr />
                        <p className={`mt-0 ${s.description}`}>{description}</p>
                    </div>
                </Col>
            </Row>
        </PostCard>
    );
};

export default ArticlePostItem;
