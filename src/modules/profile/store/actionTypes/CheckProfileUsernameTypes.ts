export type CheckProfileUsernameRequest = {
    type: string;
    payload: string;
};

export type CheckProfileUsernameSuccess = {
    type: string;
    payload: boolean;
};

export type CheckProfileUsernameFailure = {
    type: string;
    payload: string;
};
