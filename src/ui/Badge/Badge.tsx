import React, { FC } from "react";
import s from "./Badge.module.scss";
import classNames from "classnames";

interface IBadgeProps {
    className?: string;
    text: string | number;
    invert?: boolean;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Badge: FC<IBadgeProps> = ({ className, text, invert = false, onClick }) => {
    return (
        <div
            className={classNames(s.badge, { [s.invert]: invert }, className)}
            onClick={onClick}
        >
            {text}
        </div>
    );
};

export default Badge;
