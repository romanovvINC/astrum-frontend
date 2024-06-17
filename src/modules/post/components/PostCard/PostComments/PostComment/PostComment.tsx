import React, { FC } from "react";
import { PostCommentInfo } from "models/post/PostCommentInfo";
import { PostHeader } from "../../PostHeader";

import s from "./PostComment.module.scss";

interface IPostCommentProps {
    comment: PostCommentInfo;
    onClickReply: () => void;
    onClickDelete?: () => void;
}

const PostComment: FC<IPostCommentProps> = ({ comment, onClickReply, onClickDelete }) => {
    return (
        <div className={s.comment}>
            <PostHeader
                {...comment.user}
                className={s.header}
                avatarWidth={60}
                dateCreated={comment.dateCreated}
                onClickDelete={onClickDelete}
            />
            <div className={s.comment_body}>
                <p className={s.comment_text}>{comment.text}</p>
                <div onClick={onClickReply}>
                    <a className={s.reply_button}>Ответить</a>
                </div>
            </div>
        </div>
    );
};

export default PostComment;
