export type DeletePostCommentRequest = {
    type: string;
    payload: {
        postId: string;
        commentId: string;
    };
};

export type DeletePostCommentFailure = {
    type: string;
    payload: string;
};
