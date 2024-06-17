export type SetImage = {
    type: string;
    payload: string;
};

export type SetCoverImage = {
    type: string;
    payload: File | null;
};
