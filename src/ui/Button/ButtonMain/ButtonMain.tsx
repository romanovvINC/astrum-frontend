import React, { FC, ReactNode } from "react";
import classNames from "classnames";
import s from "./ButtonMain.module.scss";

interface IButtonMainProps
    extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    className?: string;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    variant?: "default" | "invert" | "secondary";
    children?: ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ButtonMain: FC<IButtonMainProps> = props => {
    const { className, variant = "default", ...rest } = props;

    return (
        <button
            className={classNames(s.button, s[variant], className)}
            {...rest}
        />
    );
};

export default ButtonMain;
