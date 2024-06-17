import React, { FC } from "react";
import { ReactComponent as PlusIcon } from "assets/svg/plus-icon.svg";

import s from "./MemberItem.module.scss";

interface IAddMemberItemProps {
    onClick: () => void;
}

const AddMemberItem: FC<IAddMemberItemProps> = ({ onClick }) => {
    return (
        <div
            className={`${s.developer_container} ${s.add_member_item}`}
            onClick={onClick}
        >
            <div className={s.avatar_container}>
                <div className={`${s.develop_avatar} ${s.add_member_avatar}`}>
                    <PlusIcon />
                </div>
            </div>
            <span className={s.add_member_text}>Добавить участника</span>
        </div>
    );
};

export default AddMemberItem;
