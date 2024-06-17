import { AxiosResponse } from "axios";
import { call, put } from "redux-saga/effects";
import { Post } from "models/post/Post";
import { NewsResponse } from "./Types/NewsResponse";
import { Banner } from "./Types/Banner";
import { Widget } from "./Types/Widget";
import { getNewsFetch } from "Api/FeedApi";
import { getNewsFailure, getNewsSuccess } from "./FeedReducer";

const convertNews = (newsResponse: NewsResponse): { banners: Banner[]; posts: Post[]; widgets: Widget[] } => {
    const banners: Banner[] = newsResponse.banners.map(b => ({ id: b.id, title: b.title, imageUrl: b.pictureS3Link }));
    const posts: Post[] = newsResponse.posts
        .map(p => ({
            ...p,
            dateCreated: new Date(p.dateCreated),
            comments: p.comments.map(c => ({ ...c, dateCreated: new Date(c.dateCreated) })),
        }))
        .filter(p => p.user);
    const widgets: Widget[] = newsResponse.widgets.map(w => ({ id: w.id, title: w.title, imageUrl: w.pictureS3Link }));
    return {
        banners,
        posts,
        widgets,
    };
};

export function* getNewsWorker() {
    try {
        const response: AxiosResponse<{ data: NewsResponse }> = yield call(getNewsFetch);
        const result: { banners: Banner[]; posts: Post[]; widgets: Widget[] } = yield call(
            convertNews,
            response.data.data
        );
        yield put(getNewsSuccess(result));
    } catch (e) {
        yield put(getNewsFailure((e as Error).message));
    }
}
