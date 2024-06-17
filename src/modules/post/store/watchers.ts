import { all, call, takeEvery } from "redux-saga/effects";
import {
    createPostCommentRequest,
    createPostRequest,
    deletePostCommentRequest,
    deletePostRequest,
    editPostCommentRequest,
    createPostLikeRequest,
    deletePostLikeRequest,
} from "./index";
import {
    createPostCommentWorker,
    createPostWorker,
    deletePostCommentWorker,
    deletePostWorker,
    editPostCommentWorker,
    createPostLikeWorker,
    deletePostLikeWorker,
} from "./workers";

function* watchCreatePost() {
    yield takeEvery(createPostRequest, createPostWorker);
}

function* watchDeletePost() {
    yield takeEvery(deletePostRequest, deletePostWorker);
}

function* watchCreatePostComment() {
    yield takeEvery(createPostCommentRequest, createPostCommentWorker);
}

function* watchEditPostComment() {
    yield takeEvery(editPostCommentRequest, editPostCommentWorker);
}

function* watchDeletePostComment() {
    yield takeEvery(deletePostCommentRequest, deletePostCommentWorker);
}

function* watchCreatePostLike() {
    yield takeEvery(createPostLikeRequest, createPostLikeWorker);
}

function* watchDeletePostLike() {
    yield takeEvery(deletePostLikeRequest, deletePostLikeWorker);
}

export function* watchPost() {
    yield all([
        call(watchCreatePost),
        call(watchDeletePost),
        call(watchCreatePostComment),
        call(watchEditPostComment),
        call(watchDeletePostComment),
        call(watchCreatePostLike),
        call(watchDeletePostLike),
    ]);
}
