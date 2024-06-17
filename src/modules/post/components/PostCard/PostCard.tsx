import React, { FC, ReactNode, useCallback, useState } from "react";
import { Card, Col } from "reactstrap";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { PostReactionInfo } from "models/post/PostReactionInfo";
import { PostCommentInfo } from "models/post/PostCommentInfo";
import { PostAuthorInfo } from "models/post/PostAuthorInfo";
import { authSelectors } from "modules/auth";
import { createPostLikeRequest, deletePostLikeRequest } from "modules/post";
import { PostHeader } from "./PostHeader";
import { PostReaction } from "./PostReaction";
import { PostComments } from "./PostComments";

import classNames from "classnames";
import s from "./PostCard.module.css";

interface IPostCardProps {
    id: string;
    className?: string;
    publishDate: Date;
    user: PostAuthorInfo;
    comments: PostCommentInfo[];
    likes: PostReactionInfo[];
    children?: ReactNode;
    likesCount: number;
    likeId: string | null;
    onClickDelete: (id: string) => void;
}

const PostCard: FC<IPostCardProps> = ({
    id,
    className,
    publishDate,
    user,
    comments,
    likes,
    children,
    likesCount,
    likeId,
    onClickDelete,
}) => {
    const { userId } = useAppSelector(authSelectors.getBasicInfo);
    const [commentsOpen, setCommentsOpen] = useState(false);
    const dispatch = useAppDispatch();

    const toggleComments = useCallback(() => setCommentsOpen(prev => !prev), []);

    const clickLikeHandler = useCallback(() => {
        if (likeId === null) {
            dispatch(
                createPostLikeRequest({
                    data: { postId: id, from: userId },
                    successCallback: null,
                })
            );
        } else {
            dispatch(
                deletePostLikeRequest({
                    postId: id,
                    likeId: likeId,
                })
            );
        }
    }, [id, userId, likeId]);

    const deletePostHandler = useCallback(() => onClickDelete(id), [id, onClickDelete]);

    return (
        <Col sm="12">
            <Card className={classNames(s.post_card, className)}>
                <div className={s.post}>
                    <PostHeader
                        {...user}
                        dateCreated={publishDate}
                        onClickDelete={deletePostHandler}
                    />
                    <div className={s.post_content}>{children}</div>
                    <PostReaction
                        isLiked={likeId != null}
                        likes={likes}
                        likesCount={likesCount}
                        comments={comments}
                        onClickLikes={clickLikeHandler}
                        onClickComments={toggleComments}
                    />
                    <PostComments
                        commentsIsOpen={commentsOpen}
                        postId={id}
                        comments={comments}
                    />
                </div>
            </Card>
        </Col>
    );
};

export default PostCard;
