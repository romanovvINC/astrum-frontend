export type CheckArticleNameRequest = {
    type: string;
    payload: string;
};

export type CheckArticleNameSuccess = {
    type: string;
    payload: boolean;
};

export type CheckArticleNameFailure = {
    type: string;
    payload: string;
};
