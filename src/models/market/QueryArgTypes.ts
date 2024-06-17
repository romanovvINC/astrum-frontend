import { OrderEnum } from "../OrderEnum";

export type QueryArg = {
    name: string | null;
    order: OrderEnum | null;
};

export type QueryOrder = {
    type: string;
    payload: OrderEnum;
};

export type QueryName = {
    type: string;
    payload: string;
};
