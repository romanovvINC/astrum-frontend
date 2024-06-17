import React, { FC } from "react";
import { Card, CardBody, Col } from "reactstrap";
import ProfileAttendanceSkeleton from "modules/profile/components/ProfileAttendance/ProfileAttendanceSkeleton";
import ProfileAttendanceTime, {
    EmployeeOfficeStatus,
} from "modules/profile/components/ProfileAttendance/ProfileAttendanceStatus/ProfileAttendanceTime";
import s from "./ProfileAttendance.module.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ButtonMain } from "ui/Button";

const ProfileAttendance: FC = () => {
    const pending = false;
    const id = useParams();

    if (pending) {
        return <ProfileAttendanceSkeleton />;
    }

    return (
        <Card>
            <CardBody className={s.profile_attendance__container}>
                <div>
                    <h4>Посещаемость</h4>
                    <div className={s.attendance_time__container}>
                        <ProfileAttendanceTime
                            status={EmployeeOfficeStatus.IN_OFFICE}
                            time={new Date()}
                        />
                    </div>
                </div>
                <div>
                    <Link
                        className={s.attendance__link_button}
                        to={`profile/${id.username}/attendance`}
                    >
                        <h4>подробнее</h4>
                    </Link>
                </div>
            </CardBody>
        </Card>
    );
};

export default ProfileAttendance;
