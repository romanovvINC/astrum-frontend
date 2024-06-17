import { SocialNetworks } from "models/profile/SocialNetworks";

export type YoutrackProjectMember = {
    userId: string;
    username: string;
    avatarImageId: string | null;
    avatarUrl: string | null;
    name: string;
    surname: string;
    patronymic: string;
    nameWithSurname: string;
    roles: number[];
    positionId: string;
    positionName: string;
    email: string;
    birthDate: Date | null;
    address: string;
    primaryPhone: string;
    secondaryPhone: string;
    isActive: boolean;
    socialNetworks: SocialNetworks;
    competencies: string[];
    money: number;
    role: string;
};

export type YoutrackProjectMemberResponse = Omit<YoutrackProjectMember, "birthDate"> & {
    birthDate: string | null;
};
