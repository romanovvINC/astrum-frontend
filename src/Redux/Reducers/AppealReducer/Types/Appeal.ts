import { AppealCategory } from "./AppealCategory";

export type Appeal = {
    id: string;
    title: string;
    request: string;
    categories: AppealCategory[];
    from: string;
    fromName: string;
    to: string;
    toName: string;
    status: AppealStatus;
    answer: string;
    dateCreated: Date;
    closed: Date;
    coverUrl: string;
    cursor: string;
};

export enum AppealStatus {
    Requested,
    Applied,
    Completed,
    Rejected,
}
