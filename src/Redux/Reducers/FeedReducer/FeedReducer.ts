import { createSlice } from "@reduxjs/toolkit";
import { GetNewsSuccess } from "./Types/ActionTypes/GetNewsTypes";
import { FeedState } from "./Types/FeedState";

const initialState: FeedState = {
    pending: false,
    createPostPending: false,
    deletePostPending: false,
    state: {
        posts: [],
        banners: [],
        widgets: [],
    },
    error: null,
    createPostError: null,
};

export const feedReducer = createSlice({
    name: "feed",
    initialState,
    reducers: {
        getNewsRequest(state) {
            state.pending = true;
        },
        getNewsSuccess(state, action: GetNewsSuccess) {
            state.pending = false;
            state.state.posts = action.payload.posts;
            state.state.banners = action.payload.banners;
            state.state.widgets = action.payload.widgets;
        },
        getNewsFailure(state, action) {
            state.pending = false;
            state.error = action.payload;
        },
    },
});

export const { getNewsRequest, getNewsSuccess, getNewsFailure } = feedReducer.actions;

export default feedReducer.reducer;
