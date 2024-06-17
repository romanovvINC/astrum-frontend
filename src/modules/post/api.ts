import { AxiosResponse } from "axios";
import baseApi from "Api/BaseApi";
import { PostResponse } from "models/post/Post";
import {
    EditPostCommentInfoRequestPayload,
    CreatePostCommentInfoRequestPayload,
    PostCommentInfoResponse,
} from "models/post/PostCommentInfo";
import { CreatePostLikeInfoRequestPayload, PostLikeInfoResponse } from "models/post/PostLikeInfo";

const baseUrl = "/news";
const baseCommentUrl = "/comments";
const baseLikesUrl = "/likes";

export const createPost = (data: FormData): Promise<AxiosResponse<PostResponse>> => {
    const url = `${baseUrl}`;
    return baseApi.post(url, data);
};

export const deletePost = (id: string): Promise<AxiosResponse<PostResponse>> => {
    const url = `${baseUrl}/${id}`;
    return baseApi.delete(url);
};

export const createPostComment = (
    data: CreatePostCommentInfoRequestPayload
): Promise<AxiosResponse<PostCommentInfoResponse>> => {
    const url = `${baseCommentUrl}`;
    return baseApi.post(url, data);
};

export const editPostComment = (
    data: EditPostCommentInfoRequestPayload
): Promise<AxiosResponse<PostCommentInfoResponse>> => {
    const url = `${baseCommentUrl}/${data.id}`;
    return baseApi.put(url, data);
};

export const deletePostComment = (id: string): Promise<AxiosResponse<PostCommentInfoResponse>> => {
    const url = `${baseCommentUrl}/${id}`;
    return baseApi.delete(url);
};

export const createPostLike = (
    data: CreatePostLikeInfoRequestPayload
): Promise<AxiosResponse<PostLikeInfoResponse>> => {
    const url = `${baseLikesUrl}`;
    return baseApi.post(url, data);
};

export const deletePostLike = (id: string): Promise<AxiosResponse<PostLikeInfoResponse>> => {
    const url = `${baseLikesUrl}/${id}`;
    return baseApi.delete(url);
};
