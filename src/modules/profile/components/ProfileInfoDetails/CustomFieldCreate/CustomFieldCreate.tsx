import React, { FC, useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Spinner } from "reactstrap";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { ReactComponent as PlusIcon } from "assets/svg/plus-icon.svg";
import { createProfileCustomFieldRequest, profileSelectors } from "modules/profile";
import { ButtonMain } from "ui/Button";
import { InputMain } from "ui/Input";

import classNames from "classnames";
import s from "./CustomFieldCreate.module.scss";

const CustomFieldCreate: FC = () => {
    const { pendingCustomFieldChange } = useAppSelector(profileSelectors.getProfileState);
    const dispatch = useAppDispatch();
    const [editMode, setEditMode] = useState(false);

    const {
        control,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm<{ name: string; value: string }>({
        values: {
            name: "",
            value: "",
        },
    });

    const clickHandler = useCallback(() => {
        setEditMode(prev => {
            if (!prev) {
                reset();
            }
            return !prev;
        });
    }, []);

    const successCallback = useCallback(() => {
        setEditMode(false);
        reset();
    }, []);

    const saveHandler = useCallback(
        (data: { name: string; value: string }) => dispatch(createProfileCustomFieldRequest({ data, successCallback })),
        []
    );

    return (
        <form
            className={s.add_field}
            onSubmit={handleSubmit(saveHandler)}
        >
            <header className={classNames(s.header, s.grid)}>
                <div
                    className={s.icon_container}
                    onClick={clickHandler}
                >
                    <PlusIcon className={classNames(s.plus, { [s.rotate_45]: editMode })} />
                </div>
                {editMode ? (
                    <Controller
                        control={control}
                        name={"name"}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { value, onChange } }) => (
                            <InputMain
                                inputClassName={s.input_title}
                                placeholder="Заголовок"
                                invalid={!!errors.name}
                                value={value}
                                onChange={onChange}
                            />
                        )}
                    />
                ) : (
                    <span onClick={clickHandler}>Добавить поле</span>
                )}
            </header>
            {editMode && (
                <>
                    <div className={classNames(s.grid, s.content)}>
                        <div className={classNames(s.icon_container, s.display_hidden)} />
                        <Controller
                            control={control}
                            name={"value"}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { value, onChange } }) => (
                                <InputMain
                                    inputClassName={s.input_content}
                                    placeholder="Значение"
                                    invalid={!!errors.value}
                                    type={"textarea"}
                                    rows={3}
                                    value={value}
                                    onChange={onChange}
                                />
                            )}
                        />
                    </div>
                    <div className={s.save_button_container}>
                        <ButtonMain disabled={pendingCustomFieldChange}>
                            {pendingCustomFieldChange ? (
                                <div className={s.save_button_loading_content}>
                                    <Spinner size="sm" /> сохранение...
                                </div>
                            ) : (
                                "Добавить"
                            )}
                        </ButtonMain>
                    </div>
                </>
            )}
        </form>
    );
};

export default CustomFieldCreate;
