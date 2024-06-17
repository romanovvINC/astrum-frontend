import React, { FC, useCallback, useEffect, useState } from "react";
import { useAppSelector } from "Redux/hooks";
import { profileSelectors } from "modules/profile";
import { Controller, useForm } from "react-hook-form";
import { SuccessCallback } from "models/AliasTypes";
import { InputMain } from "ui/Input";
import { ButtonMain } from "ui/Button";
import { Spinner } from "reactstrap";
import { MainInformation } from "ui/MainInformation";

import s from "./CustomFieldItem.module.scss";

interface ICustomFieldItemProps {
    name: string;
    value: string;
    onEdit?: (newValue: { name: string; value: string }, successCallback: SuccessCallback) => void;
    onDelete?: () => void;
}

const CustomFieldItem: FC<ICustomFieldItemProps> = ({ name, value, onEdit, onDelete }) => {
    const { pendingCustomFieldChange } = useAppSelector(profileSelectors.getProfileState);
    const [editMode, setEditMode] = useState(false);

    const {
        control,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm<{ name: string; value: string }>({
        values: {
            name,
            value,
        },
    });

    const successCallback = useCallback(() => {
        setEditMode(false);
        reset();
    }, []);

    const toggleEditMode = useCallback(() => setEditMode(prev => !prev), []);

    const cancelEditHandler = useCallback(() => {
        reset();
        toggleEditMode();
    }, []);

    const saveChangesHandler = useCallback(
        (data: { name: string; value: string }) => onEdit?.(data, successCallback),
        [onEdit]
    );

    return editMode ? (
        <form
            className={s.form__container}
            onSubmit={handleSubmit(saveChangesHandler)}
        >
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
                        disabled={pendingCustomFieldChange}
                        value={value}
                        onChange={onChange}
                    />
                )}
            />
            <Controller
                control={control}
                name={"value"}
                rules={{
                    required: true,
                }}
                render={({ field: { value, onChange } }) => (
                    <InputMain
                        inputClassName={s.input_content}
                        placeholder="Текст поля"
                        type={"textarea"}
                        disabled={pendingCustomFieldChange}
                        rows={3}
                        value={value}
                        onChange={onChange}
                    />
                )}
            />
            <div className={s.actions__container}>
                {!pendingCustomFieldChange && (
                    <ButtonMain
                        variant={"invert"}
                        type={"button"}
                        onClick={cancelEditHandler}
                    >
                        Отменить
                    </ButtonMain>
                )}
                <ButtonMain disabled={pendingCustomFieldChange}>
                    {pendingCustomFieldChange && (
                        <div className={s.save_button_loading_content}>
                            <Spinner size="sm" /> сохранение...
                        </div>
                    )}
                    {!pendingCustomFieldChange && "Сохранить"}
                </ButtonMain>
            </div>
        </form>
    ) : (
        <MainInformation
            label={name}
            value={value}
            onDelete={onDelete}
            onClickEdit={onEdit ? toggleEditMode : undefined}
        />
    );
};

export default CustomFieldItem;
