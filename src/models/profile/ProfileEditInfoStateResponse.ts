import { SocialNetworks } from "./SocialNetworks";
import { ProfileTimelineResponse, TimelineType } from "./ProfileTimeline";

export type ProfileEditInfoStateResponse = {
    name: string;
    surname: string;
    position: string;
    avatarUrl: string | null;
    username: string;
    address: string | null;
    competencies: string[] | null;
    contacts: {
        email: string;
        phoneNumber: string;
    };
    socialNetworks: SocialNetworks;
    activeTimeline: ProfileTimelineResponse;
    timelines: ProfileTimelineResponse[];
};
