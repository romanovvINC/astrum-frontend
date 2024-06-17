import { GetProfileRequest } from "modules/profile/store/actionTypes/GetProfileTypes";
import { AxiosResponse } from "axios";
import { call, put, select } from "redux-saga/effects";
import {
    changeAvatar,
    changeProfileBackgroundImage,
    checkProfileUsername,
    createProfileCustomField,
    deleteProfileCustomField,
    editProfileCustomField,
    getProfile,
    getProfileAchievementList,
    getProfileAchievementListInfo,
    getProfileEditInfo,
    getProfileListFilter,
    getProfilePosts,
    getProfileShortInfoList,
    saveEditedProfile,
} from "../api";
import {
    createProfileCompetenceFailure,
    createProfileCompetenceSuccess,
    createProfileCustomFieldFailure,
    createProfileCustomFieldSuccess,
    deleteProfileCompetenceFailure,
    deleteProfileCustomFieldFailure,
    deleteProfileCustomFieldSuccess,
    editProfileCustomFieldFailure,
    editProfileCustomFieldSuccess,
    getProfileFailure,
    getProfileSuccess,
    changeAvatarFailure,
    changeAvatarSuccess,
    changeProfileBackgroundImageFailure,
    getProfileEditInfoFailure,
    getProfileEditInfoSuccess,
    saveChangesFailure,
    saveChangesSuccess,
    getProfilePostsSuccess,
    getProfilePostsFailure,
    deleteProfileCompetenceSuccess,
    getProfileListSuccess,
    getProfileListFilterSuccess,
    getProfileListFailure,
    getProfileListFilterFailure,
    getProfileAchievementListInfoFailure,
    getProfileAchievementListInfoSuccess,
    getProfileAchievementListSuccess,
    getProfileAchievementListFailure,
    checkProfileUsernameSuccess,
    checkProfileUsernameFailure,
} from "../store";
import { CreateProfileCustomFieldRequest } from "./actionTypes/CreateProfileCustomFieldTypes";
import { notification } from "Utils/Notification";
import { EditProfileCustomFieldRequest } from "./actionTypes/EditProfileCustomFieldTypes";
import { DeleteProfileCustomFieldRequest } from "./actionTypes/DeleteProfileCustomFieldTypes";
import { CreateProfileCompetenceRequest } from "./actionTypes/CreateProfileCompetenceTypes";
import { ProfileEditInfoStateResponse } from "models/profile/ProfileEditInfoStateResponse";
import { DeleteProfileCompetenceRequest } from "./actionTypes/DeleteProfileCompetenceTypes";
import { authSelectors, setAvatarUrl, setUsername } from "modules/auth";
import { SaveChangesRequest } from "./actionTypes/SaveChangesTypes";
import { ChangeProfileAvatarRequest } from "./actionTypes/ChangeProfileAvatarTypes";
import { ChangeProfileAvatarResponse } from "models/profile/ChangeProfileAvatarResponse";
import { CustomField } from "models/CustomField";
import { ProfileInfo, ProfileInfoResponse } from "models/profile/ProfileInfo";
import {
    mapPostResponseListToData,
    mapProfileEditInfoResponseToData,
    mapProfileInfoResponseToData,
    mapProfileShortInfoResponseListToData,
} from "../mappers/mapFromApiToData";
import { ProfileState } from "models/profile/ProfileState";
import { profileSelectors } from "modules/profile";
import { ProfileInfoState } from "models/profile/ProfileInfoState";
import {
    GetProfilePostsAsyncRequest,
    GetProfilePostsRequest,
} from "modules/profile/store/actionTypes/GetProfilePostsTypes";
import { ProfileEditInfo } from "models/profile/ProfileEditInfo";
import { ChangeProfileCoverImageRequest } from "modules/profile/store/actionTypes/ChangeProfileCoverImageTypes";
import { ProfileEditInfoRequest } from "models/profile/ProfileEditInfoRequest";
import { FilterVariantResponse } from "models/filter/FilterVariant";
import { mapFilterToApi } from "Helpers/filterHelpers";
import { FilterRequest } from "models/filter/FilterRequest";
import { GetProfileListRequest } from "modules/profile/store/actionTypes/GetProfileListTypes";
import { ProfileShortInfo, ProfileShortInfoResponse } from "models/profile/ProfileShortInfo";
import { GetProfileAchievementListInfoRequest } from "modules/profile/store/actionTypes/GetProfileAchievementListInfoTypes";
import { GetProfileAchievementListRequest } from "modules/profile/store/actionTypes/GetProfileAchievementListTypes";
import { ProfileAchievementListInfo } from "models/profile/ProfileAchievementListInfoState";
import { Achievement } from "models/profile/Achivement";
import { Post, PostResponse } from "models/post/Post";
import { mapTimelineFromDataToApi } from "modules/profile/mappers/mapFromDataToApi";
import { CheckProfileUsernameRequest } from "modules/profile/store/actionTypes/CheckProfileUsernameTypes";

export function* getProfileWorker({ payload }: GetProfileRequest) {
    const res: AxiosResponse<ProfileInfoResponse> = yield call(getProfile, payload);
    if (res) {
        const profile: ProfileInfo = yield call(mapProfileInfoResponseToData, res.data);
        yield put(getProfileSuccess(profile));
    } else {
        yield put(getProfileFailure("Нет данных"));
    }
}

export function* getProfilePostsWorker({ payload }: GetProfilePostsRequest) {
    const { count }: ProfileState = yield select(profileSelectors.getProfileState);
    const params = { username: payload, paginationParams: { count, startIndex: 0 } };
    const res: AxiosResponse<PostResponse[]> = yield call(getProfilePosts, params);
    if (res) {
        const result: Post[] = yield call(mapPostResponseListToData, res.data);
        yield put(getProfilePostsSuccess(result));
    } else {
        yield put(getProfilePostsFailure("Ошибка"));
    }
}

export function* getProfilePostsAsyncWorker({ payload }: GetProfilePostsAsyncRequest) {
    const { count, pageIndex }: ProfileState = yield select(profileSelectors.getProfileState);
    const params = { username: payload, paginationParams: { count, startIndex: pageIndex } };
    const res: AxiosResponse<PostResponse[]> = yield call(getProfilePosts, params);
    if (res) {
        const { posts }: ProfileInfoState = yield select(profileSelectors.getProfileInfo);
        const data: Post[] = yield call(mapPostResponseListToData, res.data);
        const result = [...posts, ...data];
        yield put(getProfilePostsSuccess(result));
    } else {
        yield put(getProfilePostsFailure("Ошибка"));
    }
}

export function* getProfileAchievementListInfoWorker({ payload }: GetProfileAchievementListInfoRequest) {
    const res: AxiosResponse<ProfileAchievementListInfo> = yield call(getProfileAchievementListInfo, payload);
    if (res) {
        yield put(getProfileAchievementListInfoSuccess(res.data));
    } else {
        yield put(getProfileAchievementListInfoFailure("Ошибка"));
    }
}

export function* getProfileAchievementListWorker({ payload }: GetProfileAchievementListRequest) {
    const res: AxiosResponse<Achievement[]> = yield call(getProfileAchievementList, payload);
    if (res) {
        yield put(getProfileAchievementListSuccess(res.data));
    } else {
        yield put(getProfileAchievementListFailure("Ошибка"));
    }
}

export function* getProfileListWorker({ payload }: GetProfileListRequest) {
    const filterParams: FilterRequest = yield call(mapFilterToApi, payload);
    const res: AxiosResponse<ProfileShortInfoResponse[]> = yield call(getProfileShortInfoList, filterParams);
    if (res) {
        const result: ProfileShortInfo[] = yield call(mapProfileShortInfoResponseListToData, res.data);
        yield put(getProfileListSuccess(result));
    } else {
        yield put(getProfileListFailure("Ошибка"));
    }
}

export function* getProfileListFilterWorker() {
    const res: AxiosResponse<FilterVariantResponse> = yield call(getProfileListFilter);
    if (res) {
        yield put(getProfileListFilterSuccess(res.data.blocks));
    } else {
        yield put(getProfileListFilterFailure("Ошибка"));
    }
}

export function* createProfileCustomFieldWorker({ payload }: CreateProfileCustomFieldRequest) {
    const { userId } = yield select(authSelectors.getBasicInfo);
    const data = { userId, ...payload.data };
    const res: AxiosResponse<CustomField> = yield call(createProfileCustomField, data);
    if (res) {
        yield put(createProfileCustomFieldSuccess(res.data));
        if (payload.successCallback) {
            yield call(payload.successCallback);
        }
        yield call(notification, "Успех", "Свободное поле успешно добавлено", "success");
    } else {
        yield put(createProfileCustomFieldFailure("Ошибка"));
    }
}

export function* editProfileCustomFieldWorker({ payload }: EditProfileCustomFieldRequest) {
    const { userId } = yield select(authSelectors.getBasicInfo);
    const res: AxiosResponse<CustomField> = yield call(editProfileCustomField, { userId, ...payload.data });
    if (res) {
        const { customFields }: ProfileInfoState = yield select(profileSelectors.getProfileInfo);
        const data = res.data;
        const result: CustomField[] = [...customFields];
        const index = result.findIndex(f => f.id === data.id);
        result[index] = { ...data };
        yield put(editProfileCustomFieldSuccess(result));
        if (payload.successCallback) {
            yield call(payload.successCallback);
        }
        yield call(notification, "Успех", "Свободное поле успешно изменено", "success");
    } else {
        yield put(editProfileCustomFieldFailure("Ошибка"));
    }
}

export function* deleteProfileCustomFieldWorker({ payload }: DeleteProfileCustomFieldRequest) {
    const res: AxiosResponse<CustomField> = yield call(deleteProfileCustomField, payload);
    if (res) {
        const { customFields }: ProfileInfoState = yield select(profileSelectors.getProfileInfo);
        const newFields = customFields.filter(f => f.id !== payload);
        yield put(deleteProfileCustomFieldSuccess(newFields));
        yield call(notification, "Успех", "Свободное поле успешно удалено", "success");
    } else {
        yield put(deleteProfileCustomFieldFailure("ошибка"));
    }
}

export function* createProfileCompetenceWorker({ payload }: CreateProfileCompetenceRequest) {
    const { username, competencies }: ProfileInfoState = yield select(profileSelectors.getProfileInfo);
    const newCompetencies = [...competencies, payload.data];
    const res: AxiosResponse<ProfileEditInfoStateResponse> = yield call(saveEditedProfile, {
        username,
        data: {
            competencies: newCompetencies,
        },
    });
    if (res) {
        yield put(createProfileCompetenceSuccess(res.data.competencies ?? []));
        if (payload.successCallback) {
            yield call(payload.successCallback);
        }
        yield call(notification, "Успех", "Компетенция успешно создана", "success");
    } else {
        yield put(createProfileCompetenceFailure("Ошибка"));
    }
}

export function* deleteProfileCompetenceWorker({ payload }: DeleteProfileCompetenceRequest) {
    const { username, competencies }: ProfileInfoState = yield select(profileSelectors.getProfileInfo);
    const newCompetencies = [...competencies];
    const index = newCompetencies.findIndex(c => c === payload);
    newCompetencies.splice(index, 1);
    const res: AxiosResponse<ProfileEditInfoStateResponse> = yield call(saveEditedProfile, {
        username,
        data: {
            competencies: newCompetencies,
        },
    });
    if (res) {
        yield put(deleteProfileCompetenceSuccess(res.data.competencies ?? []));
        yield call(notification, "Успех", "Компетенция успешно удалена", "success");
    } else {
        yield put(deleteProfileCompetenceFailure("Ошибка"));
    }
}

export function* getProfileEditInfoWorker() {
    const { username } = yield select(authSelectors.getBasicInfo);
    const res: AxiosResponse<ProfileEditInfoStateResponse> = yield call(getProfileEditInfo, username);
    if (res) {
        const result: ProfileEditInfo = yield call(mapProfileEditInfoResponseToData, res.data);
        yield put(getProfileEditInfoSuccess(result));
    } else {
        yield put(getProfileEditInfoFailure("Ошибка"));
    }
}

export function* checkProfileUsernameWorker({ payload }: CheckProfileUsernameRequest) {
    const { username }: ProfileEditInfo = yield select(profileSelectors.getProfileEditInfo);
    if (username === payload) {
        yield put(checkProfileUsernameSuccess(false));
    } else {
        const res: AxiosResponse<boolean> = yield call(checkProfileUsername, payload);
        if (res) {
            yield put(checkProfileUsernameSuccess(res.data));
        } else {
            yield put(checkProfileUsernameFailure("Ощибка"));
        }
    }
}

export function* saveProfileChangesWorker({ payload }: SaveChangesRequest) {
    const { username } = yield select(authSelectors.getBasicInfo);
    const { username: currentProfileUsername, ...restProfile }: ProfileInfoState = yield select(
        profileSelectors.getProfileInfo
    );
    const { phoneNumber, email, activeTimeline, timelines, ...rest } = payload;
    const resultTimelines = timelines.map(mapTimelineFromDataToApi);
    const data: ProfileEditInfoRequest = {
        contacts: {
            phoneNumber,
            email,
        },
        activeTimeline: mapTimelineFromDataToApi(activeTimeline),
        timelines: resultTimelines,
        ...rest,
    };
    const res: AxiosResponse<ProfileEditInfoStateResponse> = yield call(saveEditedProfile, { username, data });
    if (res) {
        const result: ProfileEditInfo = yield call(mapProfileEditInfoResponseToData, res.data);
        yield put(saveChangesSuccess(result));
        if (username === currentProfileUsername) {
            const resultProfile: ProfileInfoState = {
                ...restProfile,
                username: result.username,
                address: result.address,
                contacts: { ...result.contacts },
                socialNetworks: { ...result.socialNetworks },
                timelines: [...result.timelines],
            };
            yield put(getProfileSuccess(resultProfile));
        }
        if (result.username != username) {
            yield put(setUsername(result.username));
        }
        yield call(notification, "Успех", "Данные успешно обновлены", "success");
    } else {
        yield put(saveChangesFailure("Ошибка"));
    }
}

export function* changeProfileAvatarWorker(action: ChangeProfileAvatarRequest) {
    const data = new FormData();
    data.append("image", action.payload.image);
    const { username } = yield select(authSelectors.getBasicInfo);
    const res: AxiosResponse<ChangeProfileAvatarResponse> = yield call(changeAvatar, data, username);
    if (res) {
        const currentProfile: ProfileInfoState = yield select(profileSelectors.getProfileInfo);
        let posts = currentProfile.posts.filter(p => p.user.userId === currentProfile.userId);
        posts = posts.map(p => ({ ...p, user: { ...p.user, avatarUrl: res.data.fileUrl } }));
        yield put(changeAvatarSuccess(res.data.fileUrl));
        yield put(setAvatarUrl(res.data.fileUrl));
        yield put(getProfileSuccess({ ...currentProfile, avatarUrl: res.data.fileUrl }));
        yield put(getProfilePostsSuccess(posts));
    } else {
        yield put(changeAvatarFailure("Ошибка"));
    }
}

export function* changeProfileBackgroundImageWorker({ payload }: ChangeProfileCoverImageRequest) {
    const data = new FormData();
    data.append("image", payload);
    const { username } = yield select(authSelectors.getBasicInfo);
    const response: AxiosResponse<ChangeProfileAvatarResponse> = yield call(changeProfileBackgroundImage, {
        data,
        username,
    });
    if (response) {
        const currentProfile: ProfileInfoState = yield select(profileSelectors.getProfileInfo);
        yield put(changeAvatarSuccess(response.data.fileUrl));
        yield put(getProfileSuccess({ ...currentProfile, coverUrl: response.data.fileUrl }));
    } else {
        yield put(changeProfileBackgroundImageFailure("Ошибка"));
    }
}
