import React, { FC, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonMain } from "../index";
import { ReactComponent as ArrowBackIcon } from "assets/svg/arrow-back-icon.svg";
import { Breadcrumbs } from "ui/BreadCrumbs";

import s from "./ButtonBack.module.scss";

interface IButtonBackProps {
    breadcrumbsPaths: string[];
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ButtonBack: FC<IButtonBackProps> = ({ breadcrumbsPaths, onClick }) => {
    const navigate = useNavigate();

    const clickBackHandler = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            if (onClick) {
                onClick(e);
            } else {
                navigate(-1);
            }
        },
        [onClick]
    );

    return (
        <div className={s.container}>
            <ButtonMain
                className={s.button}
                variant={"secondary"}
                onClick={clickBackHandler}
            >
                <ArrowBackIcon />
            </ButtonMain>
            <Breadcrumbs paths={breadcrumbsPaths} />
        </div>
    );
};

export default memo(ButtonBack);
