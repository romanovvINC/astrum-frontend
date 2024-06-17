import { Contacts } from "./Contacts";
import { SocialNetworks } from "./SocialNetworks";
import { ProfileTimeline, TimelineType } from "./ProfileTimeline";

export type ProfileEditInfo = {
    username: string;
    usernameIsExist: boolean;
    address: string;
    name: string;
    surname: string;
    position: string;
    avatarUrl: string | null;
    contacts: Contacts;
    socialNetworks: SocialNetworks;
    competencies: string[];
    activeTimeline: ProfileTimeline;
    timelines: ProfileTimeline[];
};
