import { AxiosResponse } from "axios";
import baseApi from "Api/BaseApi";
import { ProfileResponse } from "models/profile/ProfileResponse";
import { ShortProfileInfoResponse } from "models/profile/ShortProfileInfoResponse";
import { ProfileEditInfoStateResponse } from "models/profile/ProfileEditInfoStateResponse";
import { ProfileEditInfoRequest } from "models/profile/ProfileEditInfoRequest";
import { ChangeProfileAvatarResponse } from "models/profile/ChangeProfileAvatarResponse";
import { CreateProfileCustomFieldRequestPayload } from "modules/profile/store/actionTypes/CreateProfileCustomFieldTypes";
import { BasicInfoResponse } from "models/auth/BasicInfo";
import { CustomField } from "models/CustomField";
import { FilterRequest } from "models/filter/FilterRequest";
import { PaginationParams } from "models/filter/PaginationParams";
import { Achievement } from "models/profile/Achivement";
import { ProfileAchievementListInfo } from "models/profile/ProfileAchievementListInfoState";
import { PostResponse } from "models/post/Post";
import { FilterVariantResponse } from "models/filter/FilterVariant";

const baseUrl = "/account/user-profile";
const baseAchievementUrl = "/account/achievement";

export const getBasicInfoProfile = (id: string): Promise<AxiosResponse<BasicInfoResponse>> => {
    const url = `${baseUrl}/basicinfo/${id}`;
    return baseApi.get(url);
};

export const getProfile = (username: string): Promise<AxiosResponse<ProfileResponse>> => {
    const url = baseUrl + `/${username}`;
    return baseApi.get(url);
};

export const getProfilePosts = ({
    username,
    paginationParams,
}: {
    username: string;
    paginationParams: PaginationParams;
}): Promise<AxiosResponse<PostResponse[]>> => {
    const url = `${baseUrl}/${username}/posts`;
    return baseApi.get(url, { params: paginationParams });
};

export const getProfileShortInfoList = (
    filterParams: FilterRequest
): Promise<AxiosResponse<ShortProfileInfoResponse[]>> => {
    let res = "";

    if (filterParams && filterParams.params) {
        Object.keys(filterParams.params).forEach(p => {
            res += `positionIds=${filterParams.params![p]}&`;
        });
    }
    const url = `${baseUrl}?${res}`;
    return baseApi.get(url, { params: { name: filterParams.predicate ?? "" } });
};

export const getProfileAchievementList = (username: string): Promise<AxiosResponse<Achievement[]>> => {
    const url = `${baseAchievementUrl}/user/${username}`;
    return baseApi.get(url);
};

export const getProfileAchievementListInfo = (username: string): Promise<AxiosResponse<ProfileAchievementListInfo>> => {
    const url = `${baseUrl}/fullname/${username}`;
    return baseApi.get(url);
};

export const getProfileListFilter = (): Promise<AxiosResponse<FilterVariantResponse>> => {
    const url = `${baseUrl}/filters`;
    return baseApi.get(url);
};

export const getProfileEditInfo = (username: string): Promise<AxiosResponse<ProfileEditInfoStateResponse>> => {
    const url = baseUrl + `/edit/${username}`;
    return baseApi.get(url);
};

export const checkProfileUsername = (username: string): Promise<AxiosResponse<boolean>> => {
    const url = `${baseUrl}/exist/${username}`;
    return baseApi.get(url);
};

export const saveEditedProfile = ({
    username,
    data,
}: {
    username: string;
    data: ProfileEditInfoRequest;
}): Promise<AxiosResponse<ProfileEditInfoStateResponse>> => {
    const url = baseUrl + `/edit/${username}`;
    return baseApi.put(url, data);
};

export const changeAvatar = (data: FormData, username: string): Promise<AxiosResponse<ChangeProfileAvatarResponse>> => {
    return baseApi.put(`${baseUrl}/change-avatar/${username}`, data);
};

export const changeProfileBackgroundImage = ({
    data,
    username,
}: {
    data: FormData;
    username: string;
}): Promise<AxiosResponse<ChangeProfileAvatarResponse>> => {
    return baseApi.put(`${baseUrl}/change-cover/${username}`, data);
};

export const createProfileCustomField = (
    data: CreateProfileCustomFieldRequestPayload
): Promise<AxiosResponse<CustomField>> => {
    const url = baseUrl + `/custom-field`;
    return baseApi.post(url, data);
};

export const editProfileCustomField = (data: {
    userId: string;
    id: string;
    name: string;
    value: string;
}): Promise<AxiosResponse<CustomField>> => {
    const url = `${baseUrl}/custom-field`;
    return baseApi.put(url, data);
};

export const deleteProfileCustomField = (id: string): Promise<AxiosResponse<CustomField>> => {
    const url = baseUrl + `/custom-field/${id}`;
    return baseApi.delete(url);
};
