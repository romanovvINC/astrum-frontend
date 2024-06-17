import { RootState } from "Redux/store";
import { PostInfoState } from "models/post/PostInfoState";

export const postSelectors = {
    getPostInfoState: (state: RootState): PostInfoState => state.PostReducer,
} as const;
