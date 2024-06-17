export type LogoutRequest = {
    type: string;
};

export type LogoutSuccess = {
    type: string;
};

export type LogoutFailure = {
    type: string;
    payload: string;
};
