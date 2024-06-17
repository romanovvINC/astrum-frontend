import { ArticleCreateInfoRequestPayload } from "./ArticleCreateInfoRequestPayload";

export type ArticleEditInfoRequestPayload = ArticleCreateInfoRequestPayload & { id: string };
