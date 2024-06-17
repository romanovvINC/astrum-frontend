import React, { FC } from "react";
import s from "./Checkbox.module.css";

interface ICheckboxProps {
    color: string;
    label: string;
    checked: boolean;
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Checkbox: FC<ICheckboxProps> = ({ color, label, checked, onClick }) => {
    return (
        <div
            className={s.container}
            onClick={onClick}
        >
            <div className={s.square}>
                {checked && (
                    <div
                        className={s.background}
                        style={{ backgroundColor: color }}
                    />
                )}
            </div>
            <span className={s.checkbox_label}>{label}</span>
        </div>
    );
};

export default Checkbox;
