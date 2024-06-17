import React, { FC, ReactNode } from "react";
import s from "./ButtonSecondary.module.scss";

interface IButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: (e: React.MouseEvent) => void;
}

const ButtonSecondary: FC<IButtonProps> = ({ className, children, onClick }) => {
    return (
        <button
            className={`${s.button} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default ButtonSecondary;
