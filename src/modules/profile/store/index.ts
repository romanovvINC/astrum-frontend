import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetProfileFailure, GetProfileRequest, GetProfileSuccess } from "./actionTypes/GetProfileTypes";
import {
    CreateProfileCustomFieldFailure,
    CreateProfileCustomFieldRequest,
    CreateProfileCustomFieldSuccess,
} from "./actionTypes/CreateProfileCustomFieldTypes";
import {
    EditProfileCustomFieldFailure,
    EditProfileCustomFieldRequest,
    EditProfileCustomFieldSuccess,
} from "./actionTypes/EditProfileCustomFieldTypes";
import {
    DeleteProfileCustomFieldFailure,
    DeleteProfileCustomFieldRequest,
    DeleteProfileCustomFieldSuccess,
} from "./actionTypes/DeleteProfileCustomFieldTypes";
import {
    CreateProfileCompetenceFailure,
    CreateProfileCompetenceRequest,
    CreateProfileCompetenceSuccess,
} from "./actionTypes/CreateProfileCompetenceTypes";
import {
    DeleteProfileCompetenceFailure,
    DeleteProfileCompetenceRequest,
    DeleteProfileCompetenceSuccess,
} from "./actionTypes/DeleteProfileCompetenceTypes";
import { GetEditableInfoFailure, GetEditableInfoSuccess } from "./actionTypes/GetEditableInfoTypes";
import { SaveChangeFailure, SaveChangesRequest, SaveChangesSuccess } from "./actionTypes/SaveChangesTypes";
import {
    ChangeProfileAvatarFailure,
    ChangeProfileAvatarRequest,
    ChangeProfileAvatarSuccess,
} from "./actionTypes/ChangeProfileAvatarTypes";
import { ProfileState } from "models/profile/ProfileState";
import {
    GetProfilePostsAsyncRequest,
    GetProfilePostsFailure,
    GetProfilePostsRequest,
    GetProfilePostsSuccess,
} from "./actionTypes/GetProfilePostsTypes";
import {
    ChangeProfileCoveImageSuccess,
    ChangeProfileCoverImageFailure,
    ChangeProfileCoverImageRequest,
} from "./actionTypes/ChangeProfileCoverImageTypes";
import { GetProfileListFailure, GetProfileListRequest, GetProfileListSuccess } from "./actionTypes/GetProfileListTypes";
import {
    GetProfileAchievementListFailure,
    GetProfileAchievementListRequest,
    GetProfileAchievementListSuccess,
} from "modules/profile/store/actionTypes/GetProfileAchievementListTypes";
import {
    GetProfileAchievementListInfoFailure,
    GetProfileAchievementListInfoRequest,
    GetProfileAchievementListInfoSuccess,
} from "modules/profile/store/actionTypes/GetProfileAchievementListInfoTypes";
import { ProfileTimeline, TimelineType } from "models/profile/ProfileTimeline";
import {
    CheckProfileUsernameFailure,
    CheckProfileUsernameRequest,
    CheckProfileUsernameSuccess,
} from "modules/profile/store/actionTypes/CheckProfileUsernameTypes";

const initialState: ProfileState = {
    pending: false,
    pendingChange: false,
    pendingCheckUsername: false,
    pendingList: false,
    pendingFilter: false,
    pendingAchievementListInfo: false,
    pendingAchievements: false,
    pendingCustomFieldChange: false,
    pendingCompetenceChange: false,
    pendingPosts: false,
    pendingPostsAsync: false,
    pageIndex: 0,
    count: 10,
    profileInfo: {
        userId: "",
        username: "",
        name: "",
        surname: "",
        position: "",
        patronymic: "",
        avatarUrl: null,
        coverUrl: null,
        address: null,
        birthDate: new Date(),
        achievements: [],
        contacts: {
            phoneNumber: "",
            email: "",
        },
        socialNetworks: {},
        projects: [],
        customFields: [],
        competencies: [],
        posts: [],
        activeTimeline: {
            timelineType: TimelineType.Available,
            intervals: [],
        },
        timelines: [],
    },
    profileAchievementListInfo: {
        username: "",
        name: "",
        surname: "",
        achievements: [],
    },
    profileEditInfo: {
        username: "",
        usernameIsExist: false,
        address: "",
        name: "",
        surname: "",
        position: "",
        avatarUrl: "",
        contacts: {
            phoneNumber: "",
            email: "",
        },
        socialNetworks: {},
        competencies: [],
        activeTimeline: {
            timelineType: TimelineType.Available,
            intervals: [],
        },
        timelines: [],
    },
    profileList: {
        users: [],
        filter: {
            predicate: "",
            filterParams: {},
        },
        filterVariants: [],
    },
    error: null,
    errorChange: null,
    errorCheckUsername: null,
    errorList: null,
    errorFilter: null,
    errorAchievementListInfo: null,
    errorAchievements: null,
    errorCompetenceChange: null,
    errorCustomFieldChange: null,
    errorPosts: null,
};

export const profileReducer = createSlice({
    name: "profile",
    initialState,
    reducers: {
        getProfileRequest(state, action: GetProfileRequest) {
            state.pending = true;
            state.error = null;
        },
        getProfileSuccess(state, action: GetProfileSuccess) {
            state.pending = false;
            state.profileInfo = {
                ...action.payload,
                posts: state.profileInfo.posts,
            };
        },
        getProfileFailure(state, action: GetProfileFailure) {
            state.pending = false;
            state.error = action.payload;
        },

        getProfilePostsRequest(state, action: GetProfilePostsRequest) {
            state.pendingPosts = true;
            state.errorPosts = null;
        },
        getProfilePostsAsyncRequest(state, action: GetProfilePostsAsyncRequest) {
            state.pendingPostsAsync = true;
            state.errorPosts = null;
        },
        getProfilePostsSuccess(state, action: GetProfilePostsSuccess) {
            state.pendingPosts = false;
            state.pendingPostsAsync = false;
            state.profileInfo.posts = action.payload;
        },
        getProfilePostsFailure(state, action: GetProfilePostsFailure) {
            state.pendingPosts = false;
            state.pendingPostsAsync = false;
            state.errorPosts = action.payload;
        },

        getProfileAchievementListInfoRequest(state, action: GetProfileAchievementListInfoRequest) {
            state.pendingAchievementListInfo = true;
            state.errorAchievementListInfo = null;
        },
        getProfileAchievementListInfoSuccess(state, action: GetProfileAchievementListInfoSuccess) {
            state.pendingAchievementListInfo = false;
            state.profileAchievementListInfo = {
                ...action.payload,
                achievements: state.profileAchievementListInfo.achievements,
            };
        },
        getProfileAchievementListInfoFailure(state, action: GetProfileAchievementListInfoFailure) {
            state.pendingAchievementListInfo = false;
            state.errorAchievementListInfo = action.payload;
        },
        getProfileAchievementListRequest(state, action: GetProfileAchievementListRequest) {
            state.pendingAchievements = true;
            state.errorAchievements = null;
        },
        getProfileAchievementListSuccess(state, action: GetProfileAchievementListSuccess) {
            state.pendingAchievements = false;
            state.profileAchievementListInfo.achievements = action.payload;
        },
        getProfileAchievementListFailure(state, action: GetProfileAchievementListFailure) {
            state.pendingAchievements = false;
            state.errorAchievements = action.payload;
        },

        getProfileListRequest(state, action: GetProfileListRequest) {
            state.pendingList = true;
            state.errorList = null;
        },
        getProfileListSuccess(state, action: GetProfileListSuccess) {
            state.pendingList = false;
            state.profileList.users = action.payload;
        },
        getProfileListFailure(state, action: GetProfileListFailure) {
            state.pendingList = false;
            state.errorList = action.payload;
        },

        getProfileListFilterRequest(state) {
            state.pendingFilter = true;
            state.errorFilter = null;
        },
        getProfileListFilterSuccess(state, action) {
            state.pendingFilter = false;
            state.profileList.filterVariants = action.payload;
        },
        getProfileListFilterFailure(state, action) {
            state.pendingFilter = false;
            state.errorFilter = action.payload;
        },
        setFilter(state, action) {
            const filterKeys = Object.keys(state.profileList.filter.filterParams);
            const payloadFilterKey = Object.keys(action.payload)[0];
            if (filterKeys.includes(payloadFilterKey)) {
                delete state.profileList.filter.filterParams[payloadFilterKey];
            } else {
                state.profileList.filter.filterParams[payloadFilterKey] = action.payload[payloadFilterKey];
            }
        },
        setPredicate(state, action) {
            state.profileList.filter.predicate = action.payload.predicate;
        },

        createProfileCustomFieldRequest(state, action: CreateProfileCustomFieldRequest) {
            state.pendingCustomFieldChange = true;
            state.errorCustomFieldChange = null;
        },
        createProfileCustomFieldSuccess(state, action: CreateProfileCustomFieldSuccess) {
            state.pendingCustomFieldChange = false;
            state.profileInfo.customFields.push(action.payload);
        },
        createProfileCustomFieldFailure(state, action: CreateProfileCustomFieldFailure) {
            state.pendingCustomFieldChange = false;
            state.errorCustomFieldChange = action.payload;
        },

        editProfileCustomFieldRequest(state, action: EditProfileCustomFieldRequest) {
            state.pendingCustomFieldChange = true;
            state.errorCustomFieldChange = null;
        },
        editProfileCustomFieldSuccess(state, action: EditProfileCustomFieldSuccess) {
            state.pendingCustomFieldChange = false;
            state.profileInfo.customFields = action.payload;
        },
        editProfileCustomFieldFailure(state, action: EditProfileCustomFieldFailure) {
            state.pendingCustomFieldChange = false;
            state.errorCustomFieldChange = action.payload;
        },

        deleteProfileCustomFieldRequest(state, action: DeleteProfileCustomFieldRequest) {
            state.pendingCustomFieldChange = true;
            state.errorCustomFieldChange = null;
        },
        deleteProfileCustomFieldSuccess(state, action: DeleteProfileCustomFieldSuccess) {
            state.pendingCustomFieldChange = false;
            state.profileInfo.customFields = action.payload;
        },
        deleteProfileCustomFieldFailure(state, action: DeleteProfileCustomFieldFailure) {
            state.pendingCustomFieldChange = false;
            state.errorCustomFieldChange = action.payload;
        },

        createProfileCompetenceRequest(state, action: CreateProfileCompetenceRequest) {
            state.pendingCompetenceChange = true;
            state.errorCompetenceChange = null;
        },
        createProfileCompetenceSuccess(state, action: CreateProfileCompetenceSuccess) {
            state.pendingCompetenceChange = false;
            state.profileInfo.competencies = action.payload;
        },
        createProfileCompetenceFailure(state, action: CreateProfileCompetenceFailure) {
            state.pendingCompetenceChange = false;
            state.errorCompetenceChange = action.payload;
        },

        deleteProfileCompetenceRequest(state, action: DeleteProfileCompetenceRequest) {
            state.pendingCompetenceChange = true;
            state.errorCompetenceChange = null;
        },
        deleteProfileCompetenceSuccess(state, action: DeleteProfileCompetenceSuccess) {
            state.pendingCompetenceChange = false;
            state.profileInfo.competencies = action.payload;
        },
        deleteProfileCompetenceFailure(state, action: DeleteProfileCompetenceFailure) {
            state.pendingCompetenceChange = false;
            state.errorCompetenceChange = action.payload;
        },

        getProfileEditInfoRequest(state) {
            state.pending = true;
            state.error = null;
        },
        getProfileEditInfoSuccess(state, action: GetEditableInfoSuccess) {
            state.pending = false;
            state.profileEditInfo = action.payload;
        },
        getProfileEditInfoFailure(state, action: GetEditableInfoFailure) {
            state.pending = false;
            state.error = action.payload;
        },

        checkProfileUsernameRequest(state, action: CheckProfileUsernameRequest) {
            state.pendingCheckUsername = true;
            state.errorCheckUsername = null;
        },
        checkProfileUsernameSuccess(state, action: CheckProfileUsernameSuccess) {
            state.pendingCheckUsername = false;
            state.profileEditInfo.usernameIsExist = action.payload;
        },
        checkProfileUsernameFailure(state, action: CheckProfileUsernameFailure) {
            state.pendingCheckUsername = false;
            state.errorCheckUsername = action.payload;
        },

        saveChangesRequest(state, action: SaveChangesRequest) {
            state.pendingChange = true;
            state.errorChange = null;
        },
        saveChangesSuccess(state, action: SaveChangesSuccess) {
            state.pendingChange = false;
            state.profileEditInfo = action.payload;
        },
        saveChangesFailure(state, action: SaveChangeFailure) {
            state.pendingChange = false;
            state.errorChange = action.payload;
        },

        changeAvatarRequest(state, action: ChangeProfileAvatarRequest) {
            state.pendingChange = true;
            state.errorChange = null;
        },
        changeAvatarSuccess(state, action: ChangeProfileAvatarSuccess) {
            state.pendingChange = false;
            state.profileInfo.avatarUrl = action.payload;
            state.profileEditInfo.avatarUrl = action.payload;
        },
        changeAvatarFailure(state, action: ChangeProfileAvatarFailure) {
            state.pendingChange = false;
            state.errorChange = action.payload;
        },

        changeProfileBackgroundImageRequest(state, action: ChangeProfileCoverImageRequest) {
            state.pendingChange = true;
            state.errorChange = null;
        },
        changeProfileBackgroundImageSuccess(state, action: ChangeProfileCoveImageSuccess) {
            state.pendingChange = false;
            state.profileInfo.coverUrl = action.payload;
        },
        changeProfileBackgroundImageFailure(state, action: ChangeProfileCoverImageFailure) {
            state.pendingChange = false;
            state.errorChange = action.payload;
        },

        changeTimeline(state, action: { type: string; payload: ProfileTimeline }) {
            const currentActiveTimeline = state.profileEditInfo.activeTimeline;
            const timelines = state.profileEditInfo.timelines;
            const currentTimelineIndex = timelines.findIndex(
                t => t.timelineType === currentActiveTimeline.timelineType
            );
            timelines[currentTimelineIndex].intervals = action.payload.intervals;
            const newActiveTimelineIndex = timelines.findIndex(t => t.timelineType === action.payload.timelineType);
            state.profileEditInfo.activeTimeline = timelines[newActiveTimelineIndex];
        },
    },
});

export const {
    getProfileRequest,
    getProfileSuccess,
    getProfileFailure,

    getProfilePostsRequest,
    getProfilePostsAsyncRequest,
    getProfilePostsSuccess,
    getProfilePostsFailure,

    getProfileAchievementListInfoRequest,
    getProfileAchievementListInfoSuccess,
    getProfileAchievementListInfoFailure,
    getProfileAchievementListRequest,
    getProfileAchievementListSuccess,
    getProfileAchievementListFailure,

    getProfileListRequest,
    getProfileListSuccess,
    getProfileListFailure,

    getProfileListFilterRequest,
    getProfileListFilterSuccess,
    getProfileListFilterFailure,
    setFilter,
    setPredicate,

    createProfileCustomFieldRequest,
    createProfileCustomFieldSuccess,
    createProfileCustomFieldFailure,

    editProfileCustomFieldRequest,
    editProfileCustomFieldSuccess,
    editProfileCustomFieldFailure,

    deleteProfileCustomFieldRequest,
    deleteProfileCustomFieldSuccess,
    deleteProfileCustomFieldFailure,

    createProfileCompetenceRequest,
    createProfileCompetenceSuccess,
    createProfileCompetenceFailure,

    deleteProfileCompetenceRequest,
    deleteProfileCompetenceSuccess,
    deleteProfileCompetenceFailure,

    getProfileEditInfoRequest,
    getProfileEditInfoSuccess,
    getProfileEditInfoFailure,

    checkProfileUsernameRequest,
    checkProfileUsernameSuccess,
    checkProfileUsernameFailure,

    saveChangesRequest,
    saveChangesSuccess,
    saveChangesFailure,

    changeAvatarRequest,
    changeAvatarSuccess,
    changeAvatarFailure,

    changeProfileBackgroundImageRequest,
    changeProfileBackgroundImageSuccess,
    changeProfileBackgroundImageFailure,

    changeTimeline,
} = profileReducer.actions;

export default profileReducer.reducer;
