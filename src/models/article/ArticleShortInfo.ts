import { ArticleAuthor } from "./ArticleAuthor";
import { Category } from "./Category";
import { ArticleTag } from "./ArticleTag";

export type ArticleShortInfo = {
    id: string;
    name: string;
    description: string;
    author: ArticleAuthor;
    category: Category;
    dateCreated: Date;
    readingTime: number;
    coverUrl: string | null;
    tags: ArticleTag[];
    content: string;
    slug: string;
};
