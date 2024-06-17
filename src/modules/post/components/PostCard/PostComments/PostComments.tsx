import React, { FC, useCallback, useState } from "react";
import { Collapse } from "reactstrap";
import { useAppDispatch } from "Redux/hooks";
import { PostCommentInfo } from "models/post/PostCommentInfo";
import { deletePostCommentRequest } from "modules/post";
import { CommentForm } from "./CommentForm";
import { DividerLine } from "./DividerLine";
import { PostComment } from "./PostComment";

import s from "./PostComments.module.css";

interface IPostCommentsProps {
    commentsIsOpen: boolean;
    postId: string;
    comments: PostCommentInfo[];
}

// const toggleReplyCommentViewHandler = useCallback((id: string) => setReplyingCommentId(id));
const PostComments: FC<IPostCommentsProps> = ({ commentsIsOpen, postId, comments }) => {
    const [replyingCommentId, setReplyingCommentId] = useState("");
    const dispatch = useAppDispatch();

    const setReplyingCommentHandler = useCallback((commentId: string) => {
        return () => {
            setReplyingCommentId(prev => {
                if (prev === commentId) {
                    return "";
                } else return commentId;
            });
        };
    }, []);

    const deleteCommentHandler = useCallback((postId: string, commentId: string) => {
        return () =>
            dispatch(
                deletePostCommentRequest({
                    postId,
                    commentId,
                })
            );
    }, []);

    return (
        <Collapse
            className={s.post_comments}
            isOpen={commentsIsOpen}
        >
            <DividerLine />
            <CommentForm
                postId={postId}
                replyingCommentId={null}
            />
            <div className={s.comments_content}>
                {comments.map(c => (
                    <>
                        <PostComment
                            comment={c}
                            key={c.id}
                            onClickReply={setReplyingCommentHandler(c.id)}
                            onClickDelete={deleteCommentHandler(c.postId, c.id)}
                        />
                        <div className={s.replies_container}>
                            {c.childComments.map(cc => (
                                <PostComment
                                    comment={cc}
                                    key={cc.id}
                                    onClickReply={setReplyingCommentHandler(c.id)}
                                    onClickDelete={deleteCommentHandler(c.postId, c.id)}
                                />
                            ))}
                            {replyingCommentId === c.id ? (
                                <CommentForm
                                    postId={postId}
                                    replyingCommentId={replyingCommentId}
                                />
                            ) : null}
                        </div>
                    </>
                ))}
            </div>
        </Collapse>
    );
};

export default PostComments;
