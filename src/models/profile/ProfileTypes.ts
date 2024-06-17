import { TimelineInterval } from "models/profile/TimelineInterval";
import { ProfileTimeline, TimelineType } from "models/profile/ProfileTimeline";
import { SocialNetworks } from "models/profile/SocialNetworks";

export type ProfileEditInformation = {
    username: string;
    phoneNumber: string;
    email: string;
    address: string;
    socialNetworks: SocialNetworks;
    activeTimeline: ProfileTimeline;
    timelines: ProfileTimeline[];
};

export type ProfilePasswordRecovery = {
    password: string;
    newPassword: string;
};
