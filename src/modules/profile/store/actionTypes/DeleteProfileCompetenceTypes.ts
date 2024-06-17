export type DeleteProfileCompetenceRequest = {
    type: string;
    payload: string;
};

export type DeleteProfileCompetenceSuccess = {
    type: string;
    payload: string[];
};

export type DeleteProfileCompetenceFailure = {
    type: string;
    payload: string;
};
