import { SocialNetworks } from "./SocialNetworks";
import { ProfileTimelineResponse } from "./ProfileTimeline";

export type ProfileEditInfoRequest = {
    username?: string;
    address?: string;
    competencies?: string[];
    contacts?: {
        email?: string;
        phoneNumber?: string;
    };
    socialNetworks?: SocialNetworks;
    activeTimeline?: ProfileTimelineResponse;
    timelines?: ProfileTimelineResponse[];
};
