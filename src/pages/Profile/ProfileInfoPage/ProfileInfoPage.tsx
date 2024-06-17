import { FC, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "Redux/hooks";
import {
    getProfileRequest,
    ProfileCardTimeline,
    ProfileContacts,
    ProfileInfoDetails,
    ProfileInfoHeader,
    ProfilePostList,
} from "modules/profile";
import ProfileAttendance from "modules/profile/components/ProfileAttendance/ProflieAttendance";

const ProfileInfoPage: FC = () => {
    const { username } = useParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getProfileRequest(username!));
    }, [username]);

    return (
        <Container fluid={false}>
            <div className="user-profile">
                <Row>
                    <ProfileInfoHeader />
                    <Col
                        xl="4"
                        md="5"
                        lg="12"
                        className="xl-35"
                    >
                        <ProfileAttendance />
                        <ProfileContacts />
                        <ProfileInfoDetails />
                    </Col>
                    <Col
                        xl="8"
                        lg="12"
                        md="7"
                        className="xl-65"
                    >
                        <ProfileCardTimeline />
                        <ProfilePostList username={username!} />
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

export default ProfileInfoPage;
