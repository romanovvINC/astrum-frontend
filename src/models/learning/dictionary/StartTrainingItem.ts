import { MouseEvent } from "react";

export type StartTrainingItem = {
    onStartClick: (e: MouseEvent<HTMLButtonElement>) => void;
    onEditClick: (e: MouseEvent<HTMLDivElement>) => void;
    header: string;
    text: string;
};
