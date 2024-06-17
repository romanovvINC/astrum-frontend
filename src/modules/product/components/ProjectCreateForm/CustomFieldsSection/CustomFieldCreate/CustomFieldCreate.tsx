import React, { FC, useCallback } from "react";
import { Col, Row } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import { CustomFieldRequest } from "models/CustomField";
import { ButtonMain } from "ui/Button";
import { InputMain } from "ui/Input";

import s from "./CustomFieldCreate.module.scss";

interface ICustomFieldItemCreateProps {
    defaultName: string;
    defaultValue: string;
    onSave: (title: string, text: string) => void;
    onCancel: () => void;
}

const CustomFieldCreate: FC<ICustomFieldItemCreateProps> = ({ defaultName, defaultValue, onSave, onCancel }) => {
    const {
        control,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm<CustomFieldRequest>({
        values: {
            name: defaultName,
            value: defaultValue,
        },
    });

    const cancelFieldHandler = useCallback(() => {
        reset();
        onCancel();
    }, [onCancel]);

    const submitHandler = useCallback(
        (data: CustomFieldRequest) => {
            onSave(data.name, data.value);
            reset();
        },
        [onSave]
    );

    return (
        <Row>
            <Col
                xl={12}
                className={s.name_input__container}
            >
                <Controller
                    control={control}
                    name={"name"}
                    render={({ field: { value, onChange } }) => (
                        <InputMain
                            placeholder="Заголовок поля"
                            value={value}
                            invalid={!!errors.name}
                            onChange={onChange}
                        />
                    )}
                />
            </Col>
            <Col
                xl={12}
                className={s.value_input__container}
            >
                <Controller
                    control={control}
                    name={"value"}
                    render={({ field: { value, onChange } }) => (
                        <InputMain
                            type={"textarea"}
                            rows={3}
                            placeholder="Текст поля"
                            value={value}
                            onChange={onChange}
                        />
                    )}
                />
            </Col>
            <Col xl={12}>
                <Col xl={4}>
                    <div className={s.buttons_container}>
                        <ButtonMain onClick={handleSubmit(submitHandler)}>Сохранить</ButtonMain>
                        <ButtonMain
                            onClick={cancelFieldHandler}
                            type={"button"}
                            variant={"invert"}
                        >
                            Отменить
                        </ButtonMain>
                    </div>
                </Col>
            </Col>
        </Row>
    );
};

export default CustomFieldCreate;
