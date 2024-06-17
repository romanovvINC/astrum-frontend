import React, { FC, useCallback, useState } from "react";
import { Card, Col } from "reactstrap";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { authSelectors } from "modules/auth";
import { changeProfileBackgroundImageRequest, profileSelectors } from "modules/profile";
import { InfoBox } from "./InfoBox";
import ProfileInfoHeaderSkeleton from "./ProfileInfoHeaderSkeleton";
import { ChangeImageModal } from "Components/ChangeImageModal";
import { ButtonMain } from "ui/Button";
import { ModalLoading } from "ui/Modal";

import s from "./ProfileInfoHeader.module.scss";

const ProfileInfoHeader: FC = () => {
    const [changeCoverImageModalIsOpen, setChangeCoverImageModalOpen] = useState(false);
    const { username: accountUsername } = useAppSelector(authSelectors.getBasicInfo);
    const {
        pending,
        profileInfo: { username, coverUrl },
        pendingChange,
    } = useAppSelector(profileSelectors.getProfileState);
    const dispatch = useAppDispatch();

    const saveCoverImageHandler = useCallback((image: Blob) => {
        dispatch(changeProfileBackgroundImageRequest(image));
        setChangeCoverImageModalOpen(false);
    }, []);

    const cancelChangeCoverImageHandler = useCallback(() => setChangeCoverImageModalOpen(false), []);

    const clickChangeCoverImageHandler = useCallback(() => setChangeCoverImageModalOpen(true), []);

    return (
        <Col sm="12">
            {pending ? (
                <ProfileInfoHeaderSkeleton />
            ) : (
                <Card className={`profile-header bg-image ${s.profile_background}`}>
                    <img
                        className={s.background_image}
                        src={coverUrl ?? require("assets/images/user-profile/bg-profile.png")}
                        alt=""
                    />
                    <div className="profile-img-wrrap">
                        <img
                            className={`img-fluid bg-img-cover ${s.background_image} ${s.little}`}
                            src={coverUrl ?? require("assets/images/user-profile/bg-profile.png")}
                            alt=""
                        />
                    </div>
                    {accountUsername === username && (
                        <ButtonMain
                            className={s.change_background__button}
                            variant={"secondary"}
                            onClick={clickChangeCoverImageHandler}
                        >
                            Изменить обложку
                        </ButtonMain>
                    )}
                    <InfoBox />
                </Card>
            )}
            <ChangeImageModal
                isOpen={changeCoverImageModalIsOpen}
                imageAspectRatio={3}
                title={"Изменение обложки"}
                onSave={saveCoverImageHandler}
                onClose={cancelChangeCoverImageHandler}
            />
            <ModalLoading isOpen={pendingChange} />
        </Col>
    );
};

export default ProfileInfoHeader;
