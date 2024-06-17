export type ArticleCreateInfoRequestPayload = {
    name: string;
    description: string;
    userId: string;
    readingTime: number;
    content: {
        text: string;
        html: string;
    };
    categoryId: string;
    coverImage?: File;
    tagsId: string[];
};
