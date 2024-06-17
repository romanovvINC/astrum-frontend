import React, { FC } from "react";
import { ReactComponent as LikeIcon } from "assets/svg/post-like-icon.svg";
import { ReactComponent as ActiveLikeIcon } from "assets/svg/post-active-like-icon.svg";
import { ReactComponent as CommentIcon } from "assets/svg/post-comment-icon.svg";
import { PostCommentInfo } from "models/post/PostCommentInfo";
import { PostReactionInfo } from "models/post/PostReactionInfo";
import { Reaction } from "./Reaction";

import s from "./PostReaction.module.css";

interface IPostReactionProps {
    className?: string;
    comments: PostCommentInfo[];
    likes: PostReactionInfo[];
    isLiked: boolean;
    likesCount: number;
    onClickLikes: () => void;
    onClickComments: () => void;
}

const PostReaction: FC<IPostReactionProps> = ({
    className,
    likes,
    comments,
    isLiked,
    likesCount,
    onClickLikes,
    onClickComments,
}) => {
    return (
        <ul className={`simple-list d-flex flex-row ${s.reactions} ${className}`}>
            <li>
                <Reaction
                    iconElement={isLiked ? <ActiveLikeIcon /> : <LikeIcon />}
                    reactionCount={likesCount}
                    onClick={onClickLikes}
                />
            </li>
            <li>
                <Reaction
                    iconElement={<CommentIcon />}
                    reactionCount={comments.length}
                    onClick={onClickComments}
                />
            </li>
        </ul>
    );
};

export default PostReaction;
