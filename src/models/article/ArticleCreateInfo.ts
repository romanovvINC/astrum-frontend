import { Category } from "models/article/Category";
import { ArticleTag } from "models/article/ArticleTag";

export type ArticleCreateInfo = {
    id?: string;
    name: string;
    description: string;
    author: string;
    content: {
        text: string;
        html: string;
    };
    category: Category;
    coverImage: File | string;
    tags: ArticleTag[];
};
