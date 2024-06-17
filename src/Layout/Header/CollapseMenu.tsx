import React, { FC, useCallback } from "react";
import { UserAvatar } from "../../Components/UserAvatar";
import { getDefaultAvatar } from "../../Mocks/MockFunctions";
import { EnterToAdminIcon, ExitIcon, SettingsOutLineIcon } from "ui/icons";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { authSelectors, logoutRequest } from "modules/auth";
import { encode } from "base-64";
import { useNavigate } from "react-router-dom";
import s from "./Header.module.scss";
import { AccountRoles } from "models/auth/AccountRoles";

interface ICollapseMenuProps {
    onClose: () => void;
}

const CollapseMenu: FC<ICollapseMenuProps> = ({ onClose }) => {
    const { username, avatarUrl, name, surname, roles } = useAppSelector(authSelectors.getBasicInfo);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const clickGoToProfileHandler = useCallback(() => {
        onClose();
        navigate(`/profile/${username}`);
    }, [username]);

    const clickGoToProfileEditHandler = useCallback(() => {
        onClose();
        navigate(`/profile/edit`);
    }, []);

    const clickGoToAdminPanelHandler = useCallback(
        () => (document.location.href = `/api/auth/admin-login?data=${encode(localStorage.getItem("@ACCESS_TOKEN")!)}`),
        []
    );

    const clickLogoutHandler = useCallback(() => dispatch(logoutRequest()), []);

    return (
        <>
            <div className={s.information__container}>
                <UserAvatar
                    className={s.user_profile}
                    avatarUrl={avatarUrl ?? getDefaultAvatar()}
                    onClick={clickGoToProfileHandler}
                />
                <div className={s.information}>
                    <span
                        className={s.name}
                        onClick={clickGoToProfileHandler}
                    >
                        {name} {surname}
                    </span>
                    <span className={s.username}>@{username}</span>
                </div>
            </div>
            <div onClick={clickGoToProfileEditHandler}>
                <SettingsOutLineIcon />
                <span>Настройки</span>
            </div>
            {roles && (roles.includes(AccountRoles.SuperAdmin) || roles.includes(AccountRoles.Admin)) ? (
                <div onClick={clickGoToAdminPanelHandler}>
                    <EnterToAdminIcon />
                    <span>Войти в админку</span>
                </div>
            ) : (
                ""
            )}

            <div onClick={clickLogoutHandler}>
                <ExitIcon />
                <span>Выйти</span>
            </div>
        </>
    );
};

export default CollapseMenu;
