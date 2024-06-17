export type FeedPostRequest = {
    title: string;
    text: string;
    isArticle: boolean;
    from: string;
    dateCreated: string;
    attachments: File[];
};
