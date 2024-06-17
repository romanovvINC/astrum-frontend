import { ArticleAuthor } from "./ArticleAuthor";
import { Category } from "./Category";
import { ArticleTag } from "./ArticleTag";

export type ArticleShortInfoResponse = {
    id: string;
    name: string;
    description: string;
    author: ArticleAuthor;
    category: Category;
    dateCreated: string;
    readingTime: number;
    coverUrl: string;
    tags: ArticleTag[];
    content: string;
    slug: string;
};
