export type DeletePostLikeRequest = {
    type: string;
    payload: {
        postId: string;
        likeId: string;
    };
};

export type DeletePostLikeFailure = {
    type: string;
    payload: string;
};
