import { MouseEvent } from "react";

export type TrainingCardItem = {
    header: string;
    items?: string[];
    icon?: JSX.Element;
    className?: string;
    text?: string;
    onClick: (e: MouseEvent<HTMLDivElement>) => void;
};
