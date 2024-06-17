import { AxiosResponse } from "axios";
import { NewsResponse } from "Redux/Reducers/FeedReducer/Types/NewsResponse";
import baseApi from "./BaseApi";

const baseUrl = "/news";

export const getNewsFetch = (): Promise<AxiosResponse<NewsResponse>> => {
    const url = `${baseUrl}/get-news`;
    return baseApi.get(url);
};
