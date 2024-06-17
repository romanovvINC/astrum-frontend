import { AbstractPost } from "./AbstractPost";

export type ArticlePost = AbstractPost & {
    isArticle: true;
    title: string;
    readingTime: number;
    description: string;
    likesCount: number;
    likeId: string | null;
};

export type ArticlePostResponse = Omit<ArticlePost, "dateCreated"> & {
    dateCreated: string;
};
