import { all, call, takeEvery, takeLatest } from "redux-saga/effects";
import {
    changeAvatarRequest,
    changeProfileBackgroundImageRequest,
    getProfileEditInfoRequest,
    saveChangesRequest,
    createProfileCompetenceRequest,
    createProfileCustomFieldRequest,
    deleteProfileCompetenceRequest,
    deleteProfileCustomFieldRequest,
    editProfileCustomFieldRequest,
    getProfileRequest,
    getProfilePostsRequest,
    getProfilePostsAsyncRequest,
    getProfileListRequest,
    getProfileListFilterRequest,
    getProfileAchievementListInfoRequest,
    getProfileAchievementListRequest,
    checkProfileUsernameRequest,
} from "./index";
import {
    changeProfileAvatarWorker,
    changeProfileBackgroundImageWorker,
    getProfileEditInfoWorker,
    saveProfileChangesWorker,
    createProfileCompetenceWorker,
    createProfileCustomFieldWorker,
    deleteProfileCompetenceWorker,
    deleteProfileCustomFieldWorker,
    editProfileCustomFieldWorker,
    getProfileWorker,
    getProfilePostsWorker,
    getProfilePostsAsyncWorker,
    getProfileListFilterWorker,
    getProfileListWorker,
    getProfileAchievementListWorker,
    getProfileAchievementListInfoWorker,
    checkProfileUsernameWorker,
} from "./workers";

function* watchGetProfile() {
    yield takeLatest(getProfileRequest, getProfileWorker);
}

function* watchGetProfilePosts() {
    yield takeLatest(getProfilePostsRequest, getProfilePostsWorker);
}

function* watchGetProfilePostsAsync() {
    yield takeLatest(getProfilePostsAsyncRequest, getProfilePostsAsyncWorker);
}

function* watchGetProfileAchievementListInfo() {
    yield takeLatest(getProfileAchievementListInfoRequest, getProfileAchievementListInfoWorker);
}

function* watchGetProfileAchievementList() {
    yield takeLatest(getProfileAchievementListRequest, getProfileAchievementListWorker);
}

function* watchGetProfileList() {
    yield takeLatest(getProfileListRequest, getProfileListWorker);
}

function* watchGetProfileShortInfoListFilter() {
    yield takeLatest(getProfileListFilterRequest, getProfileListFilterWorker);
}

function* watchCreateProfileCustomField() {
    yield takeEvery(createProfileCustomFieldRequest, createProfileCustomFieldWorker);
}

function* watchEditProfileCustomField() {
    yield takeEvery(editProfileCustomFieldRequest, editProfileCustomFieldWorker);
}

function* watchDeleteProfileCustomField() {
    yield takeEvery(deleteProfileCustomFieldRequest, deleteProfileCustomFieldWorker);
}

function* watchCreateProfileCompetence() {
    yield takeEvery(createProfileCompetenceRequest, createProfileCompetenceWorker);
}

function* watchDeleteProfileCompetence() {
    yield takeEvery(deleteProfileCompetenceRequest, deleteProfileCompetenceWorker);
}

function* watchGetProfileEditInfo() {
    yield takeLatest(getProfileEditInfoRequest, getProfileEditInfoWorker);
}

function* watchCheckProfileUsername() {
    yield takeLatest(checkProfileUsernameRequest, checkProfileUsernameWorker);
}

function* watchSaveProfileChanges() {
    yield takeEvery(saveChangesRequest, saveProfileChangesWorker);
}

function* watchChangeProfileAvatar() {
    yield takeEvery(changeAvatarRequest, changeProfileAvatarWorker);
}

function* watchChangeProfileBackgroundImage() {
    yield takeEvery(changeProfileBackgroundImageRequest, changeProfileBackgroundImageWorker);
}

export function* watchProfile() {
    yield all([
        call(watchGetProfile),
        call(watchGetProfilePosts),
        call(watchGetProfilePostsAsync),
        call(watchGetProfileAchievementListInfo),
        call(watchGetProfileAchievementList),
        call(watchGetProfileList),
        call(watchGetProfileShortInfoListFilter),
        call(watchCheckProfileUsername),
        call(watchCreateProfileCustomField),
        call(watchEditProfileCustomField),
        call(watchDeleteProfileCustomField),
        call(watchCreateProfileCompetence),
        call(watchDeleteProfileCompetence),
        call(watchGetProfileEditInfo),
        call(watchSaveProfileChanges),
        call(watchChangeProfileAvatar),
        call(watchChangeProfileBackgroundImage),
    ]);
}
