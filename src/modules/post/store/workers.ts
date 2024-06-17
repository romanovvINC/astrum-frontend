import { AxiosResponse } from "axios";
import { call, put, select } from "redux-saga/effects";
import {
    createPost,
    createPostComment,
    deletePost,
    deletePostComment,
    editPostComment,
    createPostLike,
    deletePostLike,
} from "../api";
import {
    createPostCommentFailure,
    createPostCommentSuccess,
    createPostLikeFailure,
    createPostLikeSuccess,
    createPostFailure,
    createPostSuccess,
    deletePostCommentFailure,
    deletePostCommentSuccess,
    deletePostLikeFailure,
    deletePostLikeSuccess,
    deletePostFailure,
    deletePostSuccess,
    editPostCommentFailure,
    editPostCommentSuccess,
} from "./index";
import { notification } from "Utils/Notification";
import { Post, PostResponse } from "models/post/Post";
import { DeletePostRequest } from "./actionTypes/DeletePostTypes";
import { CreatePostRequest } from "./actionTypes/CreatePostTypes";
import { RootState } from "Redux/store";
import { FeedState } from "Redux/Reducers/FeedReducer/Types/FeedState";
import { getNewsSuccess } from "Redux/Reducers/FeedReducer/FeedReducer";
import { profileSelectors, getProfilePostsSuccess } from "modules/profile";
import { ProfileInfoState } from "models/profile/ProfileInfoState";
import { DeletePostCommentRequest } from "./actionTypes/DeletePostCommentTypes";
import { CreatePostCommentRequest } from "./actionTypes/CreatePostCommentTypes";
import { EditPostCommentRequest } from "./actionTypes/EditPostCommentTypes";
import {
    EditPostCommentInfoRequestPayload,
    PostCommentInfo,
    CreatePostCommentInfoRequestPayload,
    PostCommentInfoResponse,
} from "models/post/PostCommentInfo";
import { CreatePostLikeRequest } from "./actionTypes/CreatePostLikeTypes";
import { DeletePostLikeRequest } from "./actionTypes/DeletePostLikeTypes";
import { CreatePostLikeInfoRequestPayload, PostLikeInfo, PostLikeInfoResponse } from "models/post/PostLikeInfo";
import { mapFromPostCommentInfoResponseToData, mapFromPostLikeInfoResponseToData } from "../mappers/mapFromApiToData";
import { buildFormData } from "Redux/Helpers/BuildFormData";

export function* createPostWorker({ payload }: CreatePostRequest) {
    const data = new FormData();
    const { attachments, ...rest } = payload.data;
    buildFormData(data, rest);
    attachments.forEach(attachment => data.append("attachments", attachment));
    const response: AxiosResponse<PostResponse> = yield call(createPost, data);
    if (response) {
        yield put(createPostSuccess());
        const currentPost: Post = { ...response.data, dateCreated: new Date(response.data.dateCreated) };
        const {
            state: { posts, widgets, banners },
        }: FeedState = yield select((state: RootState) => state.feedReducer);
        yield put(getNewsSuccess({ widgets, banners, posts: [currentPost, ...posts] }));
        const { userId, posts: profilePosts }: ProfileInfoState = yield select(profileSelectors.getProfileInfo);
        if (userId === currentPost.user.userId) {
            const newPosts = [currentPost, ...profilePosts];
            yield put(getProfilePostsSuccess(newPosts));
        }
        if (payload.successCallback) {
            yield call(payload.successCallback);
        }
    } else {
        yield put(createPostFailure("error"));
    }
}

export function* deletePostWorker({ payload }: DeletePostRequest) {
    const response: AxiosResponse<PostResponse> = yield call(deletePost, payload.id);
    if (response) {
        const {
            state: { posts, widgets, banners },
        }: FeedState = yield select((state: RootState) => state.feedReducer);
        const index = posts.findIndex(p => p.id === payload.id);
        if (index > -1) {
            const resultPosts = [...posts];
            resultPosts.splice(index, 1);
            yield put(getNewsSuccess({ widgets, banners, posts: resultPosts }));
        }
        const { userId, posts: profilePosts }: ProfileInfoState = yield select(profileSelectors.getProfileInfo);
        const profileIndex = profilePosts.findIndex(p => p.id === payload.id);
        if (userId === posts[profileIndex]?.user?.userId) {
            const profilePostIndex = profilePosts.findIndex(p => p.id === payload.id);
            const newPosts = [...profilePosts];
            newPosts.splice(profilePostIndex, 1);
            yield put(getProfilePostsSuccess(newPosts));
        }
        yield put(deletePostSuccess());
        if (payload.successCallback) {
            yield call(payload.successCallback);
        }
        yield call(notification, "Успех", "Пост успешно удалён", "success");
    } else {
        yield put(deletePostFailure("error"));
        yield call(notification, null, "Не получилось удалить пост");
    }
}

export function* createPostCommentWorker({ payload }: CreatePostCommentRequest) {
    const data: CreatePostCommentInfoRequestPayload = {
        ...payload.data,
        dateCreated: new Date().toJSON(),
    };
    const res: AxiosResponse<PostCommentInfoResponse> = yield call(createPostComment, data);
    if (res) {
        const result: PostCommentInfo = yield call(mapFromPostCommentInfoResponseToData, res.data);
        const { posts }: ProfileInfoState = yield select(profileSelectors.getProfileInfo);
        const postIndex = posts.findIndex(p => p.id === data.postId);
        if (postIndex !== -1) {
            const copyPosts = posts.map(p => ({
                ...p,
                comments: p.comments.map(c => ({ ...c, childComments: [...c.childComments] })),
            }));
            const postComments = copyPosts[postIndex].comments;
            if (result.replyCommentId === null) copyPosts[postIndex].comments = [result, ...postComments];
            else {
                const replyCommentIndex = postComments.findIndex(p => p.id === result.replyCommentId);
                const replyCommentsChilds = postComments[replyCommentIndex].childComments;
                postComments[replyCommentIndex].childComments = [result, ...replyCommentsChilds];
            }
            yield put(getProfilePostsSuccess(copyPosts));
        }
        const {
            state: { banners, widgets, posts: feedPosts },
        }: FeedState = yield select((state: RootState) => state.feedReducer);
        const feedPostIndex = feedPosts.findIndex(p => p.id === data.postId);
        if (feedPostIndex !== -1) {
            const copyFeedPosts = feedPosts.map(p => ({
                ...p,
                comments: p.comments.map(c => ({ ...c, childComments: [...c.childComments] })),
            }));
            const postComments = copyFeedPosts[feedPostIndex].comments;
            if (result.replyCommentId === null) copyFeedPosts[feedPostIndex].comments = [result, ...postComments];
            else {
                const replyCommentIndex = postComments.findIndex(p => p.id === result.replyCommentId);
                const replyCommentsChilds = postComments[replyCommentIndex].childComments;
                postComments[replyCommentIndex].childComments = [result, ...replyCommentsChilds];
            }
            yield put(getNewsSuccess({ banners, widgets, posts: copyFeedPosts }));
        }
        yield put(createPostCommentSuccess());
        if (payload.successCallback) {
            yield call(payload.successCallback);
        }
    } else {
        yield put(createPostCommentFailure("Ошибка"));
    }
}

export function* editPostCommentWorker({ payload }: EditPostCommentRequest) {
    const data: EditPostCommentInfoRequestPayload = {
        ...payload.data,
        dateCreated: payload.data.dateCreated.toJSON(),
    };
    const res: AxiosResponse<PostCommentInfoResponse> = yield call(editPostComment, data);
    if (res) {
        const result: PostCommentInfo = yield call(mapFromPostCommentInfoResponseToData, res.data);
        const { posts }: ProfileInfoState = yield select(profileSelectors.getProfileInfo);
        const postIndex = posts.findIndex(p => p.id === payload.postId);
        if (postIndex !== -1) {
            const copyPosts = posts.map(p => ({ ...p, comments: [...p.comments] }));
            const postComments = copyPosts[postIndex].comments;
            const commentIndex = postComments.findIndex(c => c.id === payload.id);
            copyPosts[postIndex].comments[commentIndex] = result;
            yield put(getProfilePostsSuccess(copyPosts));
        }
        const {
            state: { banners, widgets, posts: feedPosts },
        }: FeedState = yield select((state: RootState) => state.feedReducer);
        const feedPostIndex = feedPosts.findIndex(p => p.id === payload.postId);
        if (feedPostIndex !== -1) {
            const copyFeedPosts = feedPosts.map(p => ({ ...p, comments: [...p.comments] }));
            const postComments = copyFeedPosts[feedPostIndex].comments;
            const commentIndex = postComments.findIndex(c => c.id === payload.id);
            copyFeedPosts[postIndex].comments[commentIndex] = result;
            yield put(getNewsSuccess({ banners, widgets, posts: copyFeedPosts }));
        }
        yield put(editPostCommentSuccess());
        if (payload.successCallback) {
            yield call(payload.successCallback);
        }
        yield call(notification, "Успех", "Комментарий успешно изменён", "success");
    } else {
        yield put(editPostCommentFailure("Ошибка"));
    }
}

export function* deletePostCommentWorker({ payload }: DeletePostCommentRequest) {
    const res: AxiosResponse<void> = yield call(deletePostComment, payload.commentId);
    if (res) {
        const { posts }: ProfileInfoState = yield select(profileSelectors.getProfileInfo);
        const postIndex = posts.findIndex(p => p.id === payload.postId);
        if (postIndex !== -1) {
            const copyPosts = posts.map(p => ({ ...p, comments: [...p.comments] }));
            const postComments = copyPosts[postIndex].comments;
            const commentIndex = postComments.findIndex(c => c.id === payload.commentId);
            postComments.splice(commentIndex, 1);
            yield put(getProfilePostsSuccess(copyPosts));
        }
        const {
            state: { banners, widgets, posts: feedPosts },
        }: FeedState = yield select((state: RootState) => state.feedReducer);
        const feedPostIndex = feedPosts.findIndex(p => p.id === payload.postId);
        if (feedPostIndex !== -1) {
            const copyFeedPosts = feedPosts.map(p => ({ ...p, comments: [...p.comments] }));
            const postComments = copyFeedPosts[feedPostIndex].comments;
            const commentIndex = postComments.findIndex(c => c.id === payload.commentId);
            postComments.splice(commentIndex, 1);
            yield put(getNewsSuccess({ banners, widgets, posts: copyFeedPosts }));
        }
        yield put(deletePostCommentSuccess());
        yield call(notification, "Успех", "Комментарий успешно удалён", "success");
    } else {
        yield put(deletePostCommentFailure("Ошибка"));
    }
}

export function* createPostLikeWorker({ payload }: CreatePostLikeRequest) {
    const data: CreatePostLikeInfoRequestPayload = {
        ...payload.data,
        dateCreated: new Date().toJSON(),
    };
    const res: AxiosResponse<PostLikeInfoResponse> = yield call(createPostLike, data);
    if (res) {
        const result: PostLikeInfo = yield call(mapFromPostLikeInfoResponseToData, res.data);
        const { posts }: ProfileInfoState = yield select(profileSelectors.getProfileInfo);
        const postIndex = posts.findIndex(p => p.id === data.postId);
        if (postIndex !== -1) {
            const copyPosts = posts.map(p => ({ ...p, likes: [...p.likes] }));
            const postLikes = copyPosts[postIndex].likes;
            copyPosts[postIndex].likes = [result, ...postLikes];
            copyPosts[postIndex].likeId = res.data.id;
            copyPosts[postIndex].likesCount++;
            yield put(getProfilePostsSuccess(copyPosts));
        }
        const {
            state: { banners, widgets, posts: feedPosts },
        }: FeedState = yield select((state: RootState) => state.feedReducer);
        const feedPostIndex = feedPosts.findIndex(p => p.id === data.postId);
        if (feedPostIndex !== -1) {
            const copyFeedPosts = feedPosts.map(p => ({ ...p, likes: [...p.likes] }));
            const postLikes = copyFeedPosts[feedPostIndex].likes;
            copyFeedPosts[feedPostIndex].likes = [result, ...postLikes];
            copyFeedPosts[feedPostIndex].likeId = res.data.id;
            copyFeedPosts[feedPostIndex].likesCount++;
            yield put(getNewsSuccess({ banners, widgets, posts: copyFeedPosts }));
        }
        yield put(createPostLikeSuccess());
        if (payload.successCallback) {
            yield call(payload.successCallback);
        }
    } else {
        yield put(createPostLikeFailure("Ошибка"));
    }
}

export function* deletePostLikeWorker({ payload }: DeletePostLikeRequest) {
    const res: AxiosResponse<void> = yield call(deletePostLike, payload.likeId);
    if (res) {
        const { posts }: ProfileInfoState = yield select(profileSelectors.getProfileInfo);
        const postIndex = posts.findIndex(p => p.id === payload.postId);
        if (postIndex !== -1) {
            const copyPosts = posts.map(p => ({ ...p, likes: [...p.likes] }));
            const postLikes = copyPosts[postIndex].likes;
            const likeIndex = postLikes.findIndex(c => c.id === payload.likeId);
            if (likeIndex !== -1) postLikes.splice(likeIndex, 1);
            copyPosts[postIndex].likeId = null;
            copyPosts[postIndex].likesCount--;
            yield put(getProfilePostsSuccess(copyPosts));
        }
        const {
            state: { banners, widgets, posts: feedPosts },
        }: FeedState = yield select((state: RootState) => state.feedReducer);
        const feedPostIndex = feedPosts.findIndex(p => p.id === payload.postId);
        if (feedPostIndex !== -1) {
            const copyFeedPosts = feedPosts.map(p => ({ ...p, likes: [...p.likes] }));
            const postLikes = copyFeedPosts[feedPostIndex].likes;
            const likeIndex = postLikes.findIndex(c => c.id === payload.likeId);
            if (likeIndex !== -1) postLikes.splice(likeIndex, 1);
            copyFeedPosts[feedPostIndex].likeId = null;
            copyFeedPosts[feedPostIndex].likesCount--;
            yield put(getNewsSuccess({ banners, widgets, posts: copyFeedPosts }));
        }
        yield put(deletePostLikeSuccess());
    } else {
        yield put(deletePostLikeFailure("Ошибка"));
    }
}
