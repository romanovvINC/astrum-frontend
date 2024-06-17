import { SocialNetworks } from "./SocialNetworks";

export type ShortProfileInfoResponse = {
    userId: string;
    username: string;
    avatarUrl: string | null;
    name: string;
    surname: string;
    position: string;
    birthDate: string | null;
    socialNetworks: SocialNetworks;
    competencies: string[];
    role: string;
};
