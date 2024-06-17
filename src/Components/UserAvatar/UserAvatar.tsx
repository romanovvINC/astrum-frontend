import React, { FC, useCallback } from "react";
import { ReactComponent as EditableIcon } from "assets/svg/editable-icon.svg";
import { getDefaultAvatar } from "Mocks/MockFunctions";
import { Image } from "ui/Image";

import classNames from "classnames";
import s from "./UserAvatar.module.css";

interface IUserAvatarProps {
    avatarUrl: string | null;
    containerClassName?: string;
    containerStyles?: CSSRule;
    avatarRingColor?: string;
    className?: string;
    avatarStyles?: CSSRule;
    canEdit?: boolean;
    width?: number;
    onClick?: () => void;
    onClickEdit?: () => void;
}
const UserAvatar: FC<IUserAvatarProps> = ({
    avatarUrl,
    containerClassName = "",
    containerStyles = {},
    avatarRingColor = "#cbcbef",
    className = "",
    canEdit = false,
    width,
    onClick,
    onClickEdit,
}) => {
    const clickEditHandler = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            onClickEdit?.();
        },
        [onClickEdit]
    );

    return (
        <div
            className={containerClassName}
            style={{ width, height: width }}
            onClick={onClick}
        >
            <div
                className={classNames(s.user_avatar__container, className)}
                style={{ width, height: width, backgroundColor: avatarRingColor }}
            >
                <Image
                    src={avatarUrl ?? getDefaultAvatar()}
                    className={s.user_avatar}
                    alt={""}
                />
                {canEdit && (
                    <div
                        className={s.edit_icon__container}
                        onClick={clickEditHandler}
                    >
                        <EditableIcon />
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserAvatar;
