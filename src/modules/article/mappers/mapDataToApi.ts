import { ArticleCreateInfo } from "models/article/ArticleCreateInfo";
import { ArticleCreateInfoRequestPayload } from "models/article/ArticleCreateInfoRequestPayload";
import { ArticleEditInfo } from "models/article/ArticleEditInfo";
import { ArticleEditInfoRequestPayload } from "models/article/ArticleEditInfoRequestPayload";
import { getReadingTime } from "modules/article/helpers/getReadingTime";

export const mapArticleCreateToApi = (articleInfo: ArticleCreateInfo): ArticleCreateInfoRequestPayload => {
    const { category, tags, ...rest } = articleInfo;
    const tagsId = tags.map(t => t.id);
    const categoryId = category.id;
    return {
        ...rest,
        userId: articleInfo.author,
        readingTime: getReadingTime(articleInfo.content.text),
        categoryId,
        coverImage: typeof articleInfo.coverImage === "string" ? undefined : articleInfo.coverImage,
        tagsId,
    };
};

export const mapArticleEditToApi = (articleEditInfo: ArticleEditInfo): ArticleEditInfoRequestPayload => {
    const { id, ...rest } = articleEditInfo;
    const subResult = mapArticleCreateToApi(rest);
    return {
        id,
        ...subResult,
    };
};
