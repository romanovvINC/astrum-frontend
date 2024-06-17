import React, { FC, FormEvent, useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { ArticleTag } from "models/article/ArticleTag";
import { ReactComponent as CrossIcon } from "assets/svg/cross-icon.svg";
import { ReactComponent as CheckIcon } from "assets/svg/check-icon.svg";
import { changeStringField, validateStringField } from "Helpers/stringHelpers";
import { ButtonMain } from "ui/Button";
import { InputMain } from "ui/Input";

import s from "./TagsSection.module.scss";

interface ITagCreateProps {
    onCreate: (value: string) => void;
    onCancel: () => void;
}

export const TagCreate: FC<ITagCreateProps> = ({ onCreate, onCancel }) => {
    const {
        control,
        reset,
        formState: { errors },
        handleSubmit,
        setValue,
    } = useForm<Omit<ArticleTag, "id">>({
        values: {
            name: "",
        },
    });

    const cancelAddNewTagHandler = useCallback(() => onCancel(), [onCancel]);

    const submitHandler = useCallback((data: Omit<ArticleTag, "id">) => onCreate(data.name), [onCreate]);

    const wrapHandleSubmit = useCallback(
        (e: FormEvent) => {
            e.preventDefault();
            e.stopPropagation();
            return handleSubmit(submitHandler)();
        },
        [submitHandler]
    );

    const validateTag = useCallback((tag: string) => {
        const result = validateStringField(0, 20)(tag);
        if (result) {
            setValue("name", tag);
        } else {
            setValue("name", tag.substring(0, 21));
        }
        return result;
    }, []);

    return (
        <div className={s.new_tag_container}>
            <Controller
                control={control}
                name={"name"}
                rules={{
                    onChange: changeStringField(setValue, "name", validateTag, true),
                    validate: validateTag,
                }}
                render={({ field: { value, onChange } }) => (
                    <InputMain
                        value={value}
                        prefix={"#"}
                        placeholder="#новыйтег"
                        invalid={!!errors.name}
                        errorMessage={"Тег не может быть пустым"}
                        onChange={onChange}
                    />
                )}
            />
            <ButtonMain
                className={s.action}
                type={"button"}
                variant={"invert"}
                onClick={wrapHandleSubmit}
            >
                <CheckIcon className={s.icon} />
            </ButtonMain>
            <ButtonMain
                className={s.action}
                type={"button"}
                variant={"invert"}
                onClick={cancelAddNewTagHandler}
            >
                <CrossIcon className={s.icon} />
            </ButtonMain>
        </div>
    );
};
