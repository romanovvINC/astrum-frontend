import { AxiosResponse } from "axios";
import { NewsResponse } from "Redux/Reducers/FeedReducer/Types/NewsResponse";
import baseApi from "Api/BaseApi";
import { Post } from "models/post/Post";

const baseUrl = "/news";

export const getNewsFetch = (): Promise<AxiosResponse<NewsResponse>> => {
    const url = `${baseUrl}/get-news`;
    return baseApi.get(url);
};

export const createPost = (data: FormData): Promise<AxiosResponse<Post>> => {
    const url = `${baseUrl}`;
    return baseApi.post(url, data);
};

export const deletePost = (id: string): Promise<AxiosResponse<Post>> => {
    const url = `${baseUrl}/${id}`;
    return baseApi.delete(url);
};
