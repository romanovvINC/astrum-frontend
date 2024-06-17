import { FC, ReactNode } from "react";

import s from "./Reaction.module.css";

interface IReactionProps {
    iconElement: ReactNode;
    reactionCount: number | string;
    onClick: () => void;
}

const Reaction: FC<IReactionProps> = ({ iconElement, reactionCount, onClick }) => {
    return (
        <div
            className={s.reaction_container}
            onClick={onClick}
        >
            {iconElement}
            <span>{reactionCount}</span>
        </div>
    );
};

export default Reaction;
