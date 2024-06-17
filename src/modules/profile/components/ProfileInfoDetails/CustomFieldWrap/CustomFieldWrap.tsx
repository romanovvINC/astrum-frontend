import React, { FC, ReactNode } from "react";

import classNames from "classnames";
import s from "./CustomFieldWrap.module.scss";

interface ICustomFieldWrapProps {
    className?: string;
    iconElement: ReactNode;
    title: string;
    children?: ReactNode;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const CustomFieldWrap: FC<ICustomFieldWrapProps> = ({ className, iconElement, title, children, onClick }) => {
    return (
        <div
            className={classNames(s.custom_field, className)}
            onClick={onClick}
        >
            <header className={s.header}>
                <div className={s.icon_container}>{iconElement}</div>
                <span>{title}</span>
            </header>
            {children}
        </div>
    );
};

export default CustomFieldWrap;
