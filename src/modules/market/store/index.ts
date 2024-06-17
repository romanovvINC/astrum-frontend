import { createSlice } from "@reduxjs/toolkit";
import {
    AddMarketProductFailure,
    AddMarketProductRequest,
    AddMarketProductSuccess,
} from "./ActionTypes/AddMarketProductTypes";
import {
    EditMarketProductFailure,
    EditMarketProductRequest,
    EditMarketProductSuccess,
} from "./ActionTypes/EditMarketProductTypes";
import {
    DeleteMarketProductFailure,
    DeleteMarketProductRequest,
    DeleteMarketProductSuccess,
} from "./ActionTypes/DeleteMarketProductTypes";
import { AddMarketOrderFailure, AddMarketOrderRequest, AddMarketOrderSuccess } from "./ActionTypes/AddMarketOrderTypes";
import {
    EditMarketOrderFailure,
    EditMarketOrderRequest,
    EditMarketOrderSuccess,
} from "./ActionTypes/EditMarketOrderTypes";
import {
    DeleteMarketOrderFailure,
    DeleteMarketOrderRequest,
    DeleteMarketOrderSuccess,
} from "./ActionTypes/DeleteMarketOrderTypes";
import { EditBasketFailure, EditBasketRequest, EditBasketSuccess } from "./ActionTypes/EditBasketTypes";
import { QueryArg, QueryName, QueryOrder } from "models/market/QueryArgTypes";
import { MarketState } from "models/market/MarketState";
import { MarketOrder } from "models/market/MarketOrder";
import {
    GetBasketProductFailure,
    GetBasketProductRequest,
    GetBasketProductSuccess,
} from "modules/market/store/ActionTypes/GetBasketProductTypes";
import { GetMarketProductFailure, GetMarketProductRequest } from "./ActionTypes/GetMarketProductTypes";

const initialState: MarketState = {
    pending: true,
    products: [],
    orders: [],
    basket: {
        id: "",
        owner: "",
        products: [],
    },
    money: 0,
    error: null,
    queryArg: {
        name: "",
        order: null,
    },
};

export const MarketReducer = createSlice({
    name: "market",
    initialState,
    reducers: {
        getMarketProductsRequest(state, action: GetMarketProductRequest) {
            state.pending = true;
        },
        getMarketProductsSuccess(state, action) {
            state.pending = false;
            state.products = action.payload;
        },

        getMarketProductsFailure(state, action: GetMarketProductFailure) {
            state.pending = false;
            state.error = action.payload;
        },

        getMarketOrdersSuccess(state, action) {
            state.pending = false;
            state.orders = action.payload.orders;
        },

        addMarketProductRequest(state, action: AddMarketProductRequest) {
            state.pending = true;
        },
        addMarketProductSuccess(state, action: AddMarketProductSuccess) {
            state.pending = false;
            state.error = null;
            state.products.push(action.payload);
        },
        addMarketProductFailure(state, action: AddMarketProductFailure) {
            state.pending = false;
            state.error = action.payload;
        },

        editMarketProductRequest(state, action: EditMarketProductRequest) {
            state.pending = true;
        },
        editMarketProductSuccess(state, action: EditMarketProductSuccess) {
            state.pending = false;
            const index = state.products.findIndex(product => product.id === action.payload.id);
            if (index !== -1) state.products[index] = action.payload;
        },
        editMarketProductFailure(state, action: EditMarketProductFailure) {
            state.pending = false;
            state.error = action.payload;
        },

        deleteMarketProductRequest(state, action: DeleteMarketProductRequest) {
            state.pending = true;
        },
        deleteMarketProductSuccess(state, action: DeleteMarketProductSuccess) {
            state.pending = false;
            state.products = state.products.filter(ev => ev.id !== action.payload);
        },
        deleteMarketProductFailure(state, action: DeleteMarketProductFailure) {
            state.pending = false;
            state.error = action.payload;
        },

        addMarketOrderRequest(state, action: AddMarketOrderRequest) {
            state.pending = true;
        },
        addMarketOrderSuccess(state, action: AddMarketOrderSuccess) {
            state.pending = false;
            state.error = null;
            state.orders.push(action.payload);
            state.basket.products = [];
        },
        addMarketOrderFailure(state, action: AddMarketOrderFailure) {
            state.pending = false;
            state.error = action.payload;
        },

        editMarketOrderRequest(state, action: EditMarketOrderRequest) {
            state.pending = true;
        },
        editMarketOrderSuccess(state, action: EditMarketOrderSuccess) {
            state.pending = false;
            const index = state.orders.findIndex(product => product.id === action.payload.id);
            if (index !== -1) state.orders[index] = action.payload;
        },
        editMarketOrderFailure(state, action: EditMarketOrderFailure) {
            state.pending = false;
            state.error = action.payload;
        },

        deleteMarketOrderRequest(state, action: DeleteMarketOrderRequest) {
            state.pending = true;
        },
        deleteMarketOrderSuccess(state, action: DeleteMarketOrderSuccess) {
            state.pending = false;
            state.orders = state.orders.filter(ev => ev.id !== action.payload);
        },
        deleteMarketOrderFailure(state, action: DeleteMarketOrderFailure) {
            state.pending = false;
            state.error = action.payload;
        },

        getBasketProductRequest(state, action: GetBasketProductRequest) {
            state.pending = true;
            state.error = null;
        },
        getBasketProductSuccess(state, action: GetBasketProductSuccess) {
            state.pending = false;
            state.basket = action.payload;
        },
        getBasketProductFailure(state, action: GetBasketProductFailure) {
            state.pending = false;
            state.error = action.payload;
        },

        addBasketProductRequest(state, action: EditBasketRequest) {
            state.pending = true;
        },
        addBasketProductSuccess(state, action: EditBasketSuccess) {
            state.pending = false;
            state.error = null;
            state.basket = action.payload;
        },
        addBasketProductFailure(state, action: EditBasketFailure) {
            state.pending = false;
            state.error = action.payload;
        },

        deleteBasketProductRequest(state, action: EditBasketRequest) {
            state.pending = true;
        },
        deleteBasketProductSuccess(state, action: EditBasketSuccess) {
            state.pending = false;
            state.error = null;
            state.basket = action.payload;
        },
        deleteBasketProductFailure(state, action: EditBasketFailure) {
            state.pending = false;
            state.error = action.payload;
        },

        setMarketOrders(state, action: { type: string; payload: MarketOrder[] }) {
            state.pending = false;
            state.error = null;
            state.orders = action.payload;
        },

        setQueryOrder(state, action: QueryOrder) {
            state.queryArg.order = action.payload;
        },

        setQueryName(state, action: QueryName) {
            state.queryArg.name = action.payload;
        },

        spendMoney(state, action: { type: string; payload: number }) {
            state.money += action.payload;
        },
    },
});

export const {
    getMarketProductsSuccess,
    getMarketProductsRequest,
    getMarketProductsFailure,
    getMarketOrdersSuccess,

    addMarketProductRequest,
    addMarketProductSuccess,
    addMarketProductFailure,

    addMarketOrderRequest,
    addMarketOrderSuccess,
    addMarketOrderFailure,

    getBasketProductRequest,
    getBasketProductSuccess,
    getBasketProductFailure,

    addBasketProductRequest,
    addBasketProductSuccess,
    addBasketProductFailure,

    editMarketOrderRequest,
    editMarketProductSuccess,
    editMarketProductFailure,

    editMarketProductRequest,
    editMarketOrderSuccess,
    editMarketOrderFailure,

    deleteBasketProductRequest,
    deleteBasketProductSuccess,
    deleteBasketProductFailure,

    deleteMarketOrderRequest,
    deleteMarketOrderSuccess,
    deleteMarketOrderFailure,

    deleteMarketProductRequest,
    deleteMarketProductSuccess,
    deleteMarketProductFailure,

    setMarketOrders,
    setQueryOrder,
    setQueryName,
    spendMoney,
} = MarketReducer.actions;

export default MarketReducer.reducer;
