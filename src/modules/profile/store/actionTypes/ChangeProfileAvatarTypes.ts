export type ChangeProfileAvatarRequest = {
    type: string;
    payload: { image: Blob };
};

export type ChangeProfileAvatarSuccess = {
    type: string;
    payload: string;
};

export type ChangeProfileAvatarFailure = {
    type: string;
    payload: string;
};
