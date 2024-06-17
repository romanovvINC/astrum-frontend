import { ArticleAuthor } from "./ArticleAuthor";
import { Category } from "./Category";
import { ArticleTag } from "./ArticleTag";

export type ArticleInfo = {
    id: string;
    name: string;
    description: string;
    author: ArticleAuthor;
    category: Category;
    dateCreated: Date;
    readingTime: number;
    coverUrl: string;
    tags: ArticleTag[];
    content: string;
    slug: string;
};
