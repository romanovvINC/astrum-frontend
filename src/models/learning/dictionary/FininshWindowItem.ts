import { MouseEvent } from "react";
import { PracticeType } from "./Practice";

export type FinishWindowItem = {
    againClick: (e: MouseEvent<HTMLButtonElement>) => void;
    practiceType: PracticeType;
};
