import { SocialNetworks } from "./SocialNetworks";

export type ProfileShortInfo = {
    userId: string;
    avatarUrl: string | null;
    username: string;
    name: string;
    surname: string;
    position: string;
    birthDate: Date | null;
    socialNetworks: SocialNetworks;
    competencies: string[];
    role: string;
};

export type ProfileShortInfoResponse = Omit<ProfileShortInfo, "birthDate" | "position"> & {
    avatarImageId: string;
    patronymic: string;
    nameWithSurname: string;
    roles: number[];
    positionId: string;
    positionName: string;
    email: string;
    birthDate: string | null;
    address: string;
    primaryPhone: string;
    secondaryPhone: string;
    isActive: boolean;
    money: number;
};
