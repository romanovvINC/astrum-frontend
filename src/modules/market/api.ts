import { createApolloClient } from "baseApolloClient";
import baseApi, { BASE_URL } from "Api/BaseApi";
import { InMemoryCache } from "@apollo/client";
import { OrderEnum } from "models/OrderEnum";
import { gql } from "@apollo/client/core";
import { AxiosResponse } from "axios";
import { MarketProduct, MarketProductRequest } from "models/market/MarketProduct";
import { GetMarketProductsParams } from "models/market/GetMarketProductsParams";
import { GetMarketProductRequestPayload } from "./store/ActionTypes/GetMarketProductTypes";
import { EditMarketProductRequestPayload } from "modules/market/store/ActionTypes/EditMarketProductTypes";
import { EditBasketRequestPayload } from "modules/market/store/ActionTypes/EditBasketTypes";
import { MarketBasket } from "models/market/MarketBasket";
import { AddMarketOrderRequestPayload } from "modules/market/store/ActionTypes/AddMarketOrderTypes";
import { MarketOrder } from "models/market/MarketOrder";
import { EditMarketOrderRequestPayload } from "modules/market/store/ActionTypes/EditMarketOrderTypes";

export const marketClient = createApolloClient({
    uri: `${BASE_URL}/graphql/market`,
    cache: new InMemoryCache(),
});

const ordersUrl = '/market/orders'

// export const getMarketProducts = (name: string, order: OrderEnum | null) => {
//     let orderQuery = "";
//     if (order) orderQuery = `order: {price:${order}},`;
//     return gql`
//     query {
//         productList (${orderQuery} where: {name:{contains:\"${name}\"}}) {
//             edges {
//                 node {
//                     id
//                     name
//                     summary
//                     description
//                     price
//                     remain
//                     isAvailable
//                     isInfinite
//                     coverUrl
//                 }
//                 cursor
//             }
//         }
//     }
// `;
// };



const baseUrl = "/market/products";

export const getMarketProducts = async (params: GetMarketProductRequestPayload): Promise<AxiosResponse<MarketProduct>> => {
    return await baseApi.get(`${baseUrl}/${params.page}/${params.pageSize}`);
};

export const addMarketProduct = async (data: MarketProductRequest): Promise<AxiosResponse<MarketProduct>> => {
    const url = baseUrl;
    return await baseApi.post(url, data);
};

export const editMarketProduct = (data: EditMarketProductRequestPayload): Promise<AxiosResponse<MarketProduct>> => {
    const url = `${baseUrl}/${data.id}`;
    return baseApi.put(url, data.data);
};

export const deleteMarketProduct = (id: string): Promise<AxiosResponse<MarketProduct>> => {
    const url = `${baseUrl}/${id}`;
    return baseApi.delete(url);
};

export const cartClient = createApolloClient({
    uri: `${BASE_URL}/graphql/market`,
    cache: new InMemoryCache(),
});

export const getMarketBasket = (ownerId: string) => {
    return gql`
    query{
      basket(owner: \"${ownerId}\") {
        id
        owner
        products{
          id
          basketId
          productId
          amount
          product {
            id
            name
            price
            coverUrl
          }
        }
      }
    }
`;
};

const baseBasketUrl = "/market/basket";

export const getMarketBasketREST = (userId: string): Promise<AxiosResponse<MarketBasket>> => {
    const url = `${baseBasketUrl}/get/${userId}`;
    return baseApi.get(url);
};

export const addBasketProduct = (data: EditBasketRequestPayload): Promise<AxiosResponse<MarketBasket>> => {
    if (data.amount === undefined) data.amount = 1;
    const url = `${baseBasketUrl}/product/${data.basketId}/${data.productId}/${data.amount}`;
    return baseApi.post(url);
};

export const deleteBasketProduct = (data: EditBasketRequestPayload): Promise<AxiosResponse<MarketBasket>> => {
    if (data.amount === undefined) data.amount = 1;
    const url = `${baseBasketUrl}/product/${data.basketId}/${data.productId}/${data.amount}`;
    return baseApi.delete(url);
};

export const marketOrderClient = createApolloClient({
    uri: `${BASE_URL}/graphql/market`,
    cache: new InMemoryCache(),
});

export const getMarketOrders = (userId: string, take: string, cursor: string, order: string) => {
    return gql`
    query {
        orderList(
        where: {userId : {eq: \"${userId}\"}}
        ${take}
        ${cursor}
        ${order}
        order: {status:ASC}
        )  {
            edges {
                node {
                    id
                    userId
                    status
                    comment
                    orderProducts {
                        id
                        orderId
                        status
                        amount
                        productId
                        product {
                            id
                            name
                            summary
                            description
                            price
                            remain
                            isAvailable
                            coverUrl
                        }
                    }
                }
            }
        }
    }`;
};

const baseOrderUrl = "/market/orders";

export const addMarketOrder = (data: AddMarketOrderRequestPayload): Promise<AxiosResponse<MarketOrder>> => {
    const url = baseOrderUrl;
    return baseApi.post(url, data);
};

export const editMarketOrder = (data: EditMarketOrderRequestPayload): Promise<AxiosResponse<MarketOrder>> => {
    const url = `${baseOrderUrl}/${data.id}`;
    return baseApi.put(url, data.data);
};

export const deleteMarketOrder = (orderId: string): Promise<AxiosResponse<MarketOrder>> => {
    const url = `${baseOrderUrl}/${orderId}`;
    return baseApi.delete(url);
};
