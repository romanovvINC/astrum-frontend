export type PostInfoState = {
    pendingLikes: boolean;
    pendingComments: boolean;
    pendingCommentChange: boolean;
    pendingChange: boolean;
    errorComments: string | null;
    errorCommentChange: string | null;
    errorChange: string | null;
    pendingLikesChange: boolean;
    errorLikes: string | null;
    errorLikesChange: string | null;
};
