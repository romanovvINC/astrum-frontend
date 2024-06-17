import { CustomField } from "models/CustomField";
import { Contacts } from "./Contacts";
import { SocialNetworks } from "./SocialNetworks";
import { ProfileProjectInfo } from "./ProfileProjectInfo";
import { Achievement } from "./Achivement";
import { ProfileTimeline, ProfileTimelineResponse, TimelineType } from "./ProfileTimeline";

export type ProfileInfo = {
    userId: string;
    username: string;
    position: string | null;
    name: string;
    surname: string;
    patronymic: string;
    avatarUrl: string | null;
    coverUrl: string | null;
    address: string | null;
    birthDate: Date | null;
    achievements: Achievement[];
    contacts: Contacts;
    socialNetworks: SocialNetworks;
    projects: ProfileProjectInfo[];
    customFields: CustomField[];
    competencies: string[];
    activeTimeline: ProfileTimeline;
    timelines: ProfileTimeline[];
};

export type ProfileInfoResponse = Omit<ProfileInfo, "username" | "birthDate" | "activeTimeline" | "timelines"> & {
    birthDate: string | null;
    userName: string;
    activeTimeline: ProfileTimelineResponse;
    timelines: ProfileTimelineResponse[];
};
