import { Achievement } from "./Achivement";
import { Contacts } from "./Contacts";
import { SocialNetworks } from "./SocialNetworks";
import { ProjectResponse } from "./ProjectResponse";
import { CustomField } from "models/CustomField";
import { Post } from "models/post/Post";

export type ProfileResponse = {
    userId: string;
    name: string;
    surname: string;
    position: string;
    avatarUrl?: string | null;
    coverUrl: string | null;
    birthDate: string | null;
    address?: string | null;
    contacts: Contacts;
    achievements: Achievement[] | null;
    socialNetworks?: SocialNetworks | null;
    competencies: string[] | null;
    projects: ProjectResponse[];
    posts: Post[] | null; //(UserPost | Article)[] | null;
    patronymic?: string | null;
    userName: string;
    customFields?: CustomField[] | null;
    timeline: {
        intervals: {
            startTime: string;
            endTime: string;
            intervalType: number;
        }[];
    };
    money: number;
};
