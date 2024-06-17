export type ChangeProfileCoverImageRequest = {
    type: string;
    payload: Blob;
};

export type ChangeProfileCoveImageSuccess = {
    type: string;
    payload: string;
};

export type ChangeProfileCoverImageFailure = {
    type: string;
    payload: string;
};
