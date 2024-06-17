import { Customer } from "models/product/Customer";

export type GetProductCustomerListSuccess = {
    type: string;
    payload: Customer[];
};

export type GetProductCustomerListFailure = {
    type: string;
    payload: string;
};
