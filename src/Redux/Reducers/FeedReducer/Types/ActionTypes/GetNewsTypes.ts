import { Banner } from "../Banner";
import { Widget } from "../Widget";

export type GetNewsSuccessPayload = {
    banners: Banner[];
    posts: any[];
    widgets: Widget[];
};

export type GetNewsSuccess = {
    type: string;
    payload: GetNewsSuccessPayload;
};
