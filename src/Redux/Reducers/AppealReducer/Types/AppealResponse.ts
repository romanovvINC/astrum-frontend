import { AppealCategory } from "./AppealCategory";
import { AppealStatus } from "./Appeal";

export type AppealResponse = {
    id: string;
    title: string;
    request: string;
    categories: AppealCategory[];
    from: string;
    to: string;
    status: AppealStatus;
    answer: string;
    created: Date;
    closed: Date;
};
