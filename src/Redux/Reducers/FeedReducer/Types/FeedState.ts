import { Banner } from "./Banner";
import { Widget } from "./Widget";
import { Post } from "models/post/Post";

export type FeedState = {
    pending: boolean;
    createPostPending: boolean;
    deletePostPending: boolean;
    state: {
        banners: Banner[];
        posts: Post[];
        widgets: Widget[];
    };
    createPostError: string | null;
    error: string | null;
};
