export type ProjectMember = {
    userId: string;
    username: string;
    avatarUrl?: string | null;
    name: string;
    surname: string;
    isManager: boolean;
    role: string;
};

export type ProjectMemberRequestPayload = {
    userId: string;
    isManager: boolean;
    role: string;
};
