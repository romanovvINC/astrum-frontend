import React, { FC, useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { TLoginForm } from "models/auth/LoginForm";
import { authSelectors, loginRequest, loginWithGitlabRequest } from "modules/auth";
import { InputMain } from "ui/Input";
import { ButtonMain } from "ui/Button";
import { ModalLoading } from "ui/Modal";

import s from "./LoginForm.module.scss";

const LoginForm: FC = () => {
    const { loginPending } = useAppSelector(authSelectors.getAuthInfo);
    const navigate = useNavigate();
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<TLoginForm>();

    const dispatch = useAppDispatch();

    useEffect(() => {
        return () => reset();
    }, []);

    const loginHandler = useCallback((form: TLoginForm) => dispatch(loginRequest(form)), []);

    const toGitlab = useCallback(() => dispatch(loginWithGitlabRequest()), []);

    const navigateToPasswordRecoveryHandler = useCallback(() => {
        //TODO...
    }, []);

    const navigateToRegistrationHandler = useCallback(() => navigate("/registration"), []);

    return (
        <form
            className={s.login_form}
            onSubmit={handleSubmit(loginHandler)}
        >
            <h1>Вход</h1>
            <Controller
                control={control}
                name={"login"}
                rules={{
                    validate: value => value?.length > 0,
                }}
                render={({ field: { onChange, value } }) => (
                    <InputMain
                        placeholder={"Никнейм"}
                        value={value}
                        invalid={!!errors?.login}
                        disabled={loginPending}
                        onChange={onChange}
                    />
                )}
            />
            <Controller
                control={control}
                name={"password"}
                rules={{
                    validate: value => value?.length > 0,
                }}
                render={({ field: { onChange, value } }) => (
                    <InputMain
                        placeholder={"Пароль"}
                        type={"password"}
                        value={value}
                        invalid={!!errors?.password}
                        disabled={loginPending}
                        onChange={onChange}
                    />
                )}
            />
            <div className={s.actions__container}>
                <ButtonMain
                    className={s.action}
                    disabled={loginPending}
                    variant={"invert"}
                    type={"button"}
                    onClick={navigateToRegistrationHandler}
                >
                    Регистрация
                </ButtonMain>
                <ButtonMain
                    className={s.action}
                    disabled={loginPending}
                >
                    Войти
                </ButtonMain>
                <ButtonMain
                    className={`${s.action} ${s.gitlab}`}
                    type={"button"}
                    onClick={toGitlab}
                >
                    Войти с помощью GitLab
                </ButtonMain>
            </div>
            <ModalLoading isOpen={loginPending} />
        </form>
    );
};

export default LoginForm;
