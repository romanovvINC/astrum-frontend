import { gql } from "@apollo/client/core";
import { AxiosResponse } from "axios";
import { Appeal } from "../Redux/Reducers/AppealReducer/Types/Appeal";
import { EditAppealCategoryRequestPayload } from "../Redux/Reducers/AppealReducer/Types/ActionTypes/EditAppealCategoryTypes";
import { AddAppealCategoryRequestPayload } from "../Redux/Reducers/AppealReducer/Types/ActionTypes/AddAppealCategoryTypes";
import { DeleteAppealRequestPayload } from "../Redux/Reducers/AppealReducer/Types/ActionTypes/DeleteAppealTypes";
import { DeleteAppealCategoryRequestPayload } from "../Redux/Reducers/AppealReducer/Types/ActionTypes/DeleteAppealCategoryTypes";
import { AddAppealRequestPayload } from "../Redux/Reducers/AppealReducer/Types/ActionTypes/AddAppealTypes";
import { EditAppealRequestPayload } from "../Redux/Reducers/AppealReducer/Types/ActionTypes/EditAppealTypes";
import baseApi, { BASE_URL } from "./BaseApi";
import { InMemoryCache } from "@apollo/client";
import { createApolloClient } from "../baseApolloClient";

export const appealClient = createApolloClient({
    uri: `${BASE_URL}/graphql/appeal`,
    cache: new InMemoryCache(),
});

export const getAppeals = (viewer: string, order: string, cursor: string, take: string) => {
    if (order) order = `order:${order}`;
    return gql`
    query{
      appeals
      (
      where:{${viewer}} 
      ${take}
      ${cursor}
      ${order}
      order: {appealStatus:ASC dateCreated:DESC}
      )
      {
        edges{
          node{
            id
            title
            request
            to
            toName
            from
            fromName
            appealStatus
            dateCreated
            closed
            answer
            coverUrl
            categories{
              id
              category
            }
          }
          cursor
        }
        totalCount
      }
    }
`;
};

export const getMyAppeals = (from: string, cursor: string, order: string, take: string) => {
    let viewer = `from:{eq:"${from}"}`;
    return getAppeals(viewer, order, cursor, take);
};

export const getInboxAppeals = (to: string, cursor: string, order: string, take: string) => {
    let viewer = `to:{eq:"${to}"}`;
    return getAppeals(viewer, order, cursor, take);
};

const baseApiUrl = "/appeal";

export const addAppeal = async (data: AddAppealRequestPayload): Promise<AxiosResponse<Appeal>> => {
    return await baseApi.post(baseApiUrl, data);
};

export const editAppeal = async (data: EditAppealRequestPayload): Promise<AxiosResponse<Appeal>> => {
    const url = baseApiUrl + `/${data.id}`;
    return await baseApi.put(url, data);
};

export const deleteAppeal = async (data: DeleteAppealRequestPayload): Promise<AxiosResponse<Appeal>> => {
    const url = baseApiUrl + `/${data.id}`;
    return await baseApi.delete(url);
};

export const addAppealCategory = async (data: AddAppealCategoryRequestPayload): Promise<AxiosResponse<Appeal>> => {
    const url = baseApiUrl + "/category" + `/${data.name}`;
    return await baseApi.post(url);
};

export const editAppealCategory = async (data: EditAppealCategoryRequestPayload): Promise<AxiosResponse<Appeal>> => {
    const url = baseApiUrl + "/category" + `/${data.id}/${data.name}`;
    return await baseApi.put(url);
};

export const deleteAppealCategory = async (
    data: DeleteAppealCategoryRequestPayload
): Promise<AxiosResponse<Appeal>> => {
    const url = baseApiUrl + "/category" + `/${data.id}`;
    return await baseApi.delete(url);
};

export const getAppealCreatePage = async (): Promise<AxiosResponse<Appeal>> => {
    const url = baseApiUrl;
    return await baseApi.get(url);
};
