import { AbstractPost } from "./AbstractPost";

export type UserPost = Omit<AbstractPost, "text" | "isArticle"> & {
    isArticle: false;
    text: string;
    likesCount: number;
    likeId: string | null;
};

export type UserPostResponse = Omit<UserPost, "dateCreated"> & {
    dateCreated: string;
};
