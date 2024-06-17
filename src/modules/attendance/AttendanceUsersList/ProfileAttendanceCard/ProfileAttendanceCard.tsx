import { FC } from "react";
import { Card, CardFooter, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";
import { ProfileShortInfo } from "models/profile/ProfileShortInfo";
import { socialNetworkIcons, socialNetworkUrl } from "Constants/SocialNetworkConstants";
import { getDefaultAvatar } from "Mocks/MockFunctions";
import { SocialNetworkLink } from "ui/SocialNetworkLink";

import classNames from "classnames";
import s from "./ProfileAttendanceCard.module.scss";
import { UserAvatar } from "Components/UserAvatar";
import { AttendanceUserShortInfo } from "models/attendance/AttendanceUserShortInfo";

const ProfileAttendanceCard: FC<AttendanceUserShortInfo> = (user: AttendanceUserShortInfo) => {
    return (
        <div
            className={s.employee_card}
            style={{ height: "100%" }}
        >
            <Card
                className={classNames("custom-card", s.card_body)}
                style={{ height: "100%" }}
            >
                <CardHeader></CardHeader>
                <UserAvatar
                    containerClassName={s.employee_avatar__container}
                    className={s.employee_avatar}
                    avatarUrl={getDefaultAvatar()}
                />
                <Link to={`/attendance/${user.id}`}>
                    <div className="text-center profile-details">
                        <h4>{`${user.name}`}</h4>
                        <h6>{user.function}</h6>
                    </div>
                </Link>
            </Card>
        </div>
    );
};

export default ProfileAttendanceCard;
