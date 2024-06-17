import { createSlice } from "@reduxjs/toolkit";
import { PostInfoState } from "models/post/PostInfoState";
import { CreatePostFailure, CreatePostRequest } from "./actionTypes/CreatePostTypes";
import { DeletePostFailure, DeletePostRequest } from "./actionTypes/DeletePostTypes";
import { DeletePostCommentFailure, DeletePostCommentRequest } from "./actionTypes/DeletePostCommentTypes";
import { CreatePostCommentFailure, CreatePostCommentRequest } from "./actionTypes/CreatePostCommentTypes";
import { CreatePostLikeFailure, CreatePostLikeRequest } from "./actionTypes/CreatePostLikeTypes";
import { DeletePostLikeFailure, DeletePostLikeRequest } from "./actionTypes/DeletePostLikeTypes";
import { EditPostCommentFailure, EditPostCommentRequest } from "./actionTypes/EditPostCommentTypes";

const initialState: PostInfoState = {
    pendingComments: false,
    pendingLikes: false,
    pendingCommentChange: false,
    pendingChange: false,
    errorComments: null,
    errorCommentChange: null,
    errorChange: null,
    pendingLikesChange: false,
    errorLikes: null,
    errorLikesChange: null,
};

const PostReducer = createSlice({
    name: "post",
    initialState,
    reducers: {
        createPostRequest(state, action: CreatePostRequest) {
            state.pendingChange = true;
            state.errorChange = null;
        },
        createPostSuccess(state) {
            state.pendingChange = false;
        },
        createPostFailure(state, action: CreatePostFailure) {
            state.pendingChange = false;
            state.errorChange = action.payload;
        },

        deletePostRequest(state, action: DeletePostRequest) {
            state.pendingChange = true;
            state.errorChange = null;
        },
        deletePostSuccess(state) {
            state.pendingChange = false;
        },
        deletePostFailure(state, action: DeletePostFailure) {
            state.pendingChange = false;
            state.errorChange = action.payload;
        },

        createPostCommentRequest(state, action: CreatePostCommentRequest) {
            state.pendingCommentChange = true;
            state.errorCommentChange = null;
        },
        createPostCommentSuccess(state) {
            state.pendingCommentChange = false;
        },
        createPostCommentFailure(state, action: CreatePostCommentFailure) {
            state.pendingCommentChange = false;
            state.errorCommentChange = action.payload;
        },

        editPostCommentRequest(state, action: EditPostCommentRequest) {
            state.pendingCommentChange = true;
            state.errorCommentChange = null;
        },
        editPostCommentSuccess(state) {
            state.pendingCommentChange = false;
        },
        editPostCommentFailure(state, action: EditPostCommentFailure) {
            state.pendingCommentChange = false;
            state.errorCommentChange = action.payload;
        },

        deletePostCommentRequest(state, action: DeletePostCommentRequest) {
            state.pendingCommentChange = true;
            state.errorCommentChange = null;
        },
        deletePostCommentSuccess(state) {
            state.pendingCommentChange = false;
        },
        deletePostCommentFailure(state, action: DeletePostCommentFailure) {
            state.pendingCommentChange = false;
            state.errorCommentChange = action.payload;
        },

        createPostLikeRequest(state, action: CreatePostLikeRequest) {
            state.pendingLikesChange = true;
            state.errorLikesChange = null;
        },
        createPostLikeSuccess(state) {
            state.pendingLikesChange = false;
        },
        createPostLikeFailure(state, action: CreatePostLikeFailure) {
            state.pendingLikesChange = false;
            state.errorLikesChange = action.payload;
        },

        deletePostLikeRequest(state, action: DeletePostLikeRequest) {
            state.pendingLikesChange = true;
            state.errorLikesChange = null;
        },
        deletePostLikeSuccess(state) {
            state.pendingLikesChange = false;
        },
        deletePostLikeFailure(state, action: DeletePostLikeFailure) {
            state.pendingLikesChange = false;
            state.errorLikesChange = action.payload;
        },
    },
});

export const {
    createPostRequest,
    createPostSuccess,
    createPostFailure,

    deletePostRequest,
    deletePostSuccess,
    deletePostFailure,

    createPostCommentRequest,
    createPostCommentSuccess,
    createPostCommentFailure,

    editPostCommentRequest,
    editPostCommentSuccess,
    editPostCommentFailure,

    deletePostCommentRequest,
    deletePostCommentSuccess,
    deletePostCommentFailure,

    createPostLikeRequest,
    createPostLikeSuccess,
    createPostLikeFailure,

    deletePostLikeRequest,
    deletePostLikeSuccess,
    deletePostLikeFailure,
} = PostReducer.actions;

export default PostReducer.reducer;
