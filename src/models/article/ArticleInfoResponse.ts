import { ArticleAuthor } from "./ArticleAuthor";
import { Category } from "./Category";
import { ArticleTag } from "./ArticleTag";

export type ArticleInfoResponse = {
    id: string;
    name: string;
    description: string;
    author: ArticleAuthor;
    category: Category;
    dateCreated: string;
    readingTime: number;
    coverImageId: string;
    coverUrl: string;
    tags: ArticleTag[];
    content: string;
    slug: string;
};
