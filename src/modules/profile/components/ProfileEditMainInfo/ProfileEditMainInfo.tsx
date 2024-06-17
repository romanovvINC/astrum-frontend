import React, { FC, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardBody, Col, Spinner } from "reactstrap";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { getDefaultAvatar } from "Mocks/MockFunctions";
import { ProfilePasswordRecovery } from "models/profile/ProfileTypes";
import { authSelectors, changePasswordRequest } from "modules/auth";
import { changeAvatarRequest, profileSelectors } from "modules/profile";
import ProfileEditMainInfoSkeleton from "./ProfileEditMainInfoSkeleton";
import { ChangeImageModal } from "Components/ChangeImageModal";
import { UserAvatar } from "Components/UserAvatar";

import s from "./ProfileEditMainInfo.module.scss";

const ProfileEditMainInfo: FC = () => {
    const [avatarModalIsOpen, setAvatarModalOpen] = useState(false);
    const { passwordRecoveryPending, error } = useAppSelector(authSelectors.getAuthInfo);
    const {
        pending,
        profileEditInfo: { avatarUrl, name, surname, position },
    } = useAppSelector(profileSelectors.getProfileState);
    const {
        control,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm<ProfilePasswordRecovery>({
        values: {
            password: "",
            newPassword: "",
        },
    });
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!passwordRecoveryPending && !error) {
            reset();
        }
    }, [passwordRecoveryPending, error]);

    const submitHandler = useCallback((data: ProfilePasswordRecovery) => dispatch(changePasswordRequest(data)), []);

    const saveNewAvatarHandler = useCallback((image: Blob) => {
        dispatch(changeAvatarRequest({ image }));
        setAvatarModalOpen(false);
    }, []);

    const toggleAvatarModal = useCallback(() => setAvatarModalOpen(prev => !prev), []);

    if (pending) {
        return <ProfileEditMainInfoSkeleton />;
    }

    return (
        <Card>
            <CardBody>
                <h2 className={s.header}>Основная информация</h2>
                <Col style={{ marginBottom: 15 }}>
                    <UserAvatar
                        canEdit={true}
                        avatarUrl={avatarUrl ?? getDefaultAvatar()}
                        onClickEdit={toggleAvatarModal}
                    />
                </Col>
                <Col>
                    <span className={s.profile_name}>
                        {name} {surname}
                    </span>
                </Col>
                <Col>
                    <span className={s.position}>{position}</span>
                </Col>
                {/*<Col>*/}
                {/*    <hr style={{ marginTop: 20 }} />*/}
                {/*</Col>*/}
                {/*<form onSubmit={handleSubmit(submitHandler)}>*/}
                {/*    <Col style={{ marginBottom: 20 }}>*/}
                {/*        <h3>Изменить пароль</h3>*/}
                {/*    </Col>*/}
                {/*    <Col style={{ marginBottom: 25 }}>*/}
                {/*        <Controller*/}
                {/*            control={control}*/}
                {/*            name={"password"}*/}
                {/*            rules={{*/}
                {/*                required: true,*/}
                {/*            }}*/}
                {/*            render={({ field: { value, onChange } }) => {*/}
                {/*                return (*/}
                {/*                    <InputMain*/}
                {/*                        label={"Старый пароль"}*/}
                {/*                        type={"password"}*/}
                {/*                        value={value}*/}
                {/*                        placeholder={"Старый пароль"}*/}
                {/*                        disabled={passwordRecoveryPending}*/}
                {/*                        invalid={!!errors.newPassword}*/}
                {/*                        onChange={onChange}*/}
                {/*                    />*/}
                {/*                );*/}
                {/*            }}*/}
                {/*        />*/}
                {/*    </Col>*/}
                {/*    <Col>*/}
                {/*        <Controller*/}
                {/*            control={control}*/}
                {/*            name={"newPassword"}*/}
                {/*            rules={{*/}
                {/*                required: true,*/}
                {/*            }}*/}
                {/*            render={({ field: { value, onChange } }) => (*/}
                {/*                <InputMain*/}
                {/*                    label={"Новый пароль"}*/}
                {/*                    type={"password"}*/}
                {/*                    value={value}*/}
                {/*                    placeholder={"Новый пароль"}*/}
                {/*                    disabled={passwordRecoveryPending}*/}
                {/*                    invalid={!!errors.newPassword}*/}
                {/*                    onChange={onChange}*/}
                {/*                />*/}
                {/*            )}*/}
                {/*        />*/}
                {/*    </Col>*/}
                {/*    <Col className={s.submit_button_container}>*/}
                {/*        <ButtonMain*/}
                {/*            className={s.save_button}*/}
                {/*            disabled={passwordRecoveryPending}*/}
                {/*        >*/}
                {/*            {passwordRecoveryPending && (*/}
                {/*                <div className={s.save_button_loading_content}>*/}
                {/*                    <Spinner size="sm" /> сохранение...*/}
                {/*                </div>*/}
                {/*            )}*/}
                {/*            {!passwordRecoveryPending && "Изменить пароль"}*/}
                {/*        </ButtonMain>*/}
                {/*    </Col>*/}
                {/*</form>*/}
            </CardBody>
            <ChangeImageModal
                isOpen={avatarModalIsOpen}
                imageAspectRatio={1}
                title={"Изменение аватара"}
                onSave={saveNewAvatarHandler}
                onClose={toggleAvatarModal}
            />
        </Card>
    );
};

export default ProfileEditMainInfo;
