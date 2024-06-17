import { ProfileInfo } from "./ProfileInfo";
import { Post } from "models/post/Post";

export type ProfileInfoState = ProfileInfo & {
    posts: Post[];
};
