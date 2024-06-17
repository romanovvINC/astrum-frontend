import { SuccessCallback } from "models/AliasTypes";

export type DeleteProductRequest = {
    type: string;
    payload: {
        id: string;
        successCallback: SuccessCallback;
    };
};

export type DeleteProductFailure = {
    type: string;
    payload: string;
};
