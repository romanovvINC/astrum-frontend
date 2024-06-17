export type BasicInfo = {
    userId: string;
    username: string;
    avatarUrl: string | null;
    money: number;
    name: string;
    surname: string;
    roles: number[];
};

export type BasicInfoResponse = Omit<BasicInfo, "username"> & {
    userName: string;
};
