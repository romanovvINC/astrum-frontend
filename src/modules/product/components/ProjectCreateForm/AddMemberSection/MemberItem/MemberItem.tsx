import React, { FC, memo } from "react";
import { getDefaultAvatar } from "Mocks/MockFunctions";
import { ReactComponent as DeleteIcon } from "assets/svg/trash-icon.svg";
import { UserAvatar } from "Components/UserAvatar";
import { ProjectMember } from "models/product/ProjectMember";
import s from "./MemberItem.module.scss";

interface IMemberItemProps extends ProjectMember {
    onClickRemove: (id: string) => void;
}

const MemberItem: FC<IMemberItemProps> = ({
    userId,
    name,
    surname,
    avatarUrl,
    username,
    role,
    isManager,
    onClickRemove,
}) => {
    const clickRemoveHandler = () => onClickRemove(userId);
    return (
        <div className={s.developer_container}>
            <div className={s.avatar_container}>
                <UserAvatar
                    className={s.develop_avatar}
                    avatarUrl={avatarUrl ?? getDefaultAvatar()}
                />
                <DeleteIcon
                    className={s.delete_member_icon}
                    onClick={clickRemoveHandler}
                />
            </div>
            <div className={s.develop_info_container}>
                <a
                    className={s.link}
                    href={`/profile/${username}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    {name} {surname}
                </a>
                <span className={s.role}>{role}</span>
            </div>
        </div>
    );
};

export default memo(MemberItem);
