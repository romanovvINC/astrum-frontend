export type ProfileEditInfoState = {
    mainInformation: {
        avatarUrl: string | null;
        backgroundUrl: string | null;
        name: string;
        lastName: string;
        position: string;
        telegram?: string;
    };
    detailInformation: {
        [key: string]: string | undefined;
        username: string;
        phone: string;
        email: string;
        address: string;
    };
};
