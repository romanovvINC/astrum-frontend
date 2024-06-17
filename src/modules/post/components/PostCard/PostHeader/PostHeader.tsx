import { FC, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "Redux/hooks";
import { getDefaultAvatar } from "Mocks/MockFunctions";
import { getPublishDateString } from "Helpers/GetPublishDateString";
import { isValidDate } from "Helpers/DateTimeHelpers";
import { ReactComponent as TrashIcon } from "assets/svg/trash-icon.svg";
import { authSelectors } from "modules/auth";
import { UserAvatar } from "Components/UserAvatar";

import classNames from "classnames";
import s from "./PostHeader.module.scss";

interface IPostHeaderProps {
    className?: string;
    userId: string;
    username: string;
    avatarUrl?: string | null;
    avatarWidth?: number;
    nameWithSurname: string | null;
    dateCreated: Date | null;
    onClickDelete?: () => void;
}

const PostHeader: FC<IPostHeaderProps> = ({
    className,
    userId,
    avatarUrl,
    avatarWidth = 80,
    nameWithSurname,
    dateCreated,
    username,
    onClickDelete,
}) => {
    const { userId: accountUserId } = useAppSelector(authSelectors.getBasicInfo);
    const navigate = useNavigate();
    const redirectToProfileUrl = username ? `/profile/${username}` : "";

    const clickAvatarHandler = useCallback(() => {
        navigate(redirectToProfileUrl);
    }, [redirectToProfileUrl]);

    return (
        <div className={classNames(s.header, className)}>
            <div className={s.media}>
                <UserAvatar
                    className={s.avatar}
                    width={avatarWidth}
                    avatarUrl={avatarUrl ?? getDefaultAvatar()}
                    onClick={clickAvatarHandler}
                />
                <div className={`${s.media_body} align-self-center`}>
                    <Link to={redirectToProfileUrl}>
                        <h5 className={s.user_name}>{nameWithSurname ?? "DELETED"}</h5>
                    </Link>
                    {isValidDate(dateCreated) && (
                        <h6 className={s.publish_date}>{getPublishDateString(dateCreated)}</h6>
                    )}
                </div>
            </div>
            {accountUserId === userId && onClickDelete && (
                <div className={s.action_menu}>
                    <div className={s.post_settings__container}>
                        <div className={s.post_settings}>
                            <div />
                            <div />
                            <div />
                        </div>
                    </div>
                    <ul className={s.post_menu}>
                        {/*<li>*/}
                        {/*    <EditIcon />*/}
                        {/*    Редактировать*/}
                        {/*</li>*/}
                        <li onClick={onClickDelete}>
                            <TrashIcon />
                            Удалить
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PostHeader;
