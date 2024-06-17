import React, { FC, useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import InputMask from "react-input-mask";
import { EMAIL_REGEXP } from "Utils/EmailValidate";
import { useNavigate } from "react-router-dom";
import { TRegistrationForm } from "models/auth/RegistrationForm";
import { authSelectors, registrationRequest } from "modules/auth";
import { InputMain } from "ui/Input";
import { ButtonMain } from "ui/Button";
import { ModalLoading } from "ui/Modal";
import s from "./RegistrationForm.module.scss";

const RegistrationForm: FC = () => {
    const { registrationPending } = useAppSelector(authSelectors.getAuthInfo);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<TRegistrationForm>();

    useEffect(() => {
        return () => reset();
    }, []);

    const goBackHandler = useCallback(() => navigate(-1), []);

    const clickBackHandler = useCallback(() => goBackHandler(), []);

    const registrationHandler = useCallback(
        (data: TRegistrationForm) => dispatch(registrationRequest({ data, successCallback: goBackHandler })),
        []
    );

    return (
        <form
            className={s.form}
            onSubmit={handleSubmit(registrationHandler)}
        >
            <h2>Регистрация</h2>
            <Controller
                control={control}
                name={"name"}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, value } }) => (
                    <InputMain
                        placeholder={"Имя"}
                        value={value}
                        invalid={!!errors.name}
                        disabled={registrationPending}
                        onChange={onChange}
                    />
                )}
            />
            <Controller
                control={control}
                name={"surname"}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, value } }) => (
                    <InputMain
                        placeholder={"Фамилия"}
                        value={value}
                        invalid={!!errors.surname}
                        disabled={registrationPending}
                        onChange={onChange}
                    />
                )}
            />
            <Controller
                control={control}
                name={"patronymic"}
                render={({ field: { onChange, value } }) => (
                    <InputMain
                        placeholder={"Отчество"}
                        value={value}
                        invalid={!!errors.patronymic}
                        disabled={registrationPending}
                        onChange={onChange}
                    />
                )}
            />
            <Controller
                control={control}
                name={"username"}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, value } }) => (
                    <InputMain
                        placeholder={"Никнейм"}
                        value={value}
                        invalid={!!errors.username}
                        disabled={registrationPending}
                        onChange={onChange}
                    />
                )}
            />
            <Controller
                control={control}
                name={"phoneNumber"}
                render={({ field: { onChange, onBlur, value } }) => (
                    <InputMask
                        className={"form-control"}
                        mask={"+7 (999) 999-99-99"}
                        placeholder={"Номер телефона"}
                        value={value}
                        disabled={registrationPending}
                        onChange={onChange}
                        onBlur={onBlur}
                    />
                )}
            />
            <Controller
                control={control}
                name={"email"}
                rules={{
                    required: true,
                    pattern: EMAIL_REGEXP,
                }}
                render={({ field: { onChange, value } }) => (
                    <InputMain
                        placeholder={"Email"}
                        value={value}
                        invalid={!!errors.email}
                        disabled={registrationPending}
                        onChange={onChange}
                    />
                )}
            />
            <div className={s.actions__container}>
                <ButtonMain
                    className={s.action}
                    variant={"invert"}
                    type={"button"}
                    disabled={registrationPending}
                    onClick={clickBackHandler}
                >
                    Назад
                </ButtonMain>
                <ButtonMain
                    className={s.action}
                    disabled={registrationPending}
                >
                    Отправить заявку
                </ButtonMain>
            </div>
            <ModalLoading isOpen={registrationPending} />
        </form>
    );
};

export default RegistrationForm;
