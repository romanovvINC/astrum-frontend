import React, { FC, useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Card, CardBody, Col, Row, Spinner } from "reactstrap";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { profileSelectors, saveChangesRequest, checkProfileUsernameRequest } from "modules/profile";
import { ProfileEditInformation } from "models/profile/ProfileTypes";
import { ProfileTimeline } from "models/profile/ProfileTimeline";
import { emailValidate } from "Utils/EmailValidate";
import { ProfileEditTimelineSection } from "./ProfileEditTimelineSection";
import { ProfileEditSocialNetworksSection } from "./ProfileEditSocialNetworksSection";
import ProfileEditContactsSkeleton from "./ProfileEditContactInfoSkeleton";
import { ButtonMain } from "ui/Button";
import { InputMain } from "ui/Input";

import s from "./ProfileEditContactInfo.module.scss";
import { changeStringField, validateStringField } from "Helpers/stringHelpers";

const ProfileEditContactInfo: FC = () => {
    const {
        pending,
        pendingChange,
        profileEditInfo: {
            username,
            usernameIsExist,
            contacts: { phoneNumber, email },
            socialNetworks,
            address,
            activeTimeline,
            timelines,
        },
    } = useAppSelector(profileSelectors.getProfileState);
    const {
        control,
        reset,
        formState: { errors, isDirty },
        handleSubmit,
        getValues,
        setValue,
    } = useForm<ProfileEditInformation>({
        values: {
            username: username,
            phoneNumber: phoneNumber ?? "",
            email: email ?? "",
            address: address,
            socialNetworks,
            activeTimeline,
            timelines,
        },
    });
    const [timer, setTimer] = useState<NodeJS.Timer | null>(null);
    const dispatch = useAppDispatch();

    const checkProfileUsernameHandler = (newVal: string) => {
        if (timer) {
            clearTimeout(timer);
        }
        if (newVal.length > 0) {
            const newTimer = setTimeout(() => dispatch(checkProfileUsernameRequest(newVal)), 500);
            setTimer(newTimer);
        }
    };

    const changeArticleNameHandler = (e: { target: { value: string } }) => {
        changeStringField(setValue, "name", checkProfileUsernameHandler)(e);
    };

    const changeProfileTimelineTypeHandler = useCallback((timeline: ProfileTimeline) => {
        const currentActiveTimeline = getValues().activeTimeline;
        const timelines = getValues().timelines;
        const currentTimelineIndex = timelines.findIndex(t => t.timelineType === currentActiveTimeline.timelineType);
        timelines[currentTimelineIndex].intervals = timeline.intervals;
        setValue("timelines", timelines);
        const newActiveTimelineIndex = timelines.findIndex(t => t.timelineType === timeline.timelineType);
        setValue("activeTimeline", timelines[newActiveTimelineIndex]);
    }, []);

    const changeProfileTimelineHandler = useCallback((timelineChangeEvent: { target: { value: ProfileTimeline } }) => {
        const newTimeline = timelineChangeEvent.target.value;
        const timelines = getValues().timelines;
        const currentTimelineIndex = timelines.findIndex(t => t.timelineType === newTimeline.timelineType);
        timelines[currentTimelineIndex].intervals = newTimeline.intervals;
        setValue("timelines", timelines);
    }, []);

    const submitHandler = useCallback((data: ProfileEditInformation) => dispatch(saveChangesRequest(data)), []);

    const resetHandler = useCallback(() => reset(), []);

    if (pending) {
        return <ProfileEditContactsSkeleton />;
    }

    return (
        <Card>
            <CardBody>
                <h2 className={s.details__header}>Изменить профиль</h2>
                <form
                    className={s.details__body}
                    onSubmit={handleSubmit(submitHandler)}
                >
                    <Row>
                        <Col xl={4}>
                            <Controller
                                control={control}
                                name={"username"}
                                rules={{
                                    onChange: changeArticleNameHandler,
                                    validate: validateStringField(3, 20, () => !usernameIsExist),
                                }}
                                render={({ field: { value, onChange } }) => (
                                    <InputMain
                                        label={"Имя пользователя"}
                                        value={value}
                                        placeholder="username"
                                        invalid={!!errors.username || usernameIsExist}
                                        errorMessage={usernameIsExist ? "Данный username уже занят" : ""}
                                        onChange={onChange}
                                    />
                                )}
                            />
                        </Col>
                        <Col xl={4}>
                            <Controller
                                control={control}
                                name={"phoneNumber"}
                                rules={{
                                    validate: value => !value.includes("_"),
                                }}
                                render={({ field: { value, onChange } }) => (
                                    <InputMain
                                        label={"Телефон"}
                                        type={"phone"}
                                        placeholder="+7 (123)-456-78-90"
                                        invalid={!!errors.phoneNumber}
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            />
                        </Col>
                        <Col xl={4}>
                            <Controller
                                control={control}
                                name={"email"}
                                rules={{
                                    validate: emailValidate,
                                }}
                                render={({ field: { value, onChange } }) => (
                                    <InputMain
                                        label={"Электронная почта"}
                                        value={value}
                                        placeholder="user@mail.ru"
                                        type="email"
                                        invalid={!!errors.email}
                                        errorMessage={"Неверный формат почты"}
                                        onChange={onChange}
                                    />
                                )}
                            />
                        </Col>
                    </Row>
                    <Col xl={12}>
                        <Controller
                            control={control}
                            name={"address"}
                            render={({ field: { value, onChange } }) => (
                                <InputMain
                                    label={"Домашний адрес"}
                                    value={value}
                                    placeholder="Адрес"
                                    onChange={onChange}
                                />
                            )}
                        />
                    </Col>
                    <Col xl={12}>
                        <Controller
                            control={control}
                            name={"socialNetworks"}
                            render={({ field: { value, onChange } }) => (
                                <ProfileEditSocialNetworksSection
                                    value={value}
                                    onChange={onChange}
                                />
                            )}
                        />
                    </Col>
                    <Col xl={12}>
                        <Controller
                            control={control}
                            name={"activeTimeline"}
                            rules={{
                                onChange: changeProfileTimelineHandler,
                            }}
                            render={({ field: { value, onChange } }) => (
                                <ProfileEditTimelineSection
                                    value={value}
                                    onChange={onChange}
                                    onChangeTimelineType={changeProfileTimelineTypeHandler}
                                />
                            )}
                        />
                    </Col>
                    <Col
                        xl={2}
                        className={s.actions__container}
                    >
                        <ButtonMain
                            className={s.save_button}
                            disabled={pendingChange}
                        >
                            {pendingChange ? (
                                <div className={s.save_button_loading_content}>
                                    <Spinner size="sm" /> сохранение...
                                </div>
                            ) : (
                                "Сохранить "
                            )}
                        </ButtonMain>
                        {isDirty && (
                            <ButtonMain
                                className={s.save_button}
                                variant={"invert"}
                                type={"button"}
                                onClick={resetHandler}
                            >
                                Очистить
                            </ButtonMain>
                        )}
                    </Col>
                </form>
            </CardBody>
        </Card>
    );
};

export default ProfileEditContactInfo;
