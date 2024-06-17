import React, { FC, memo, useCallback, useId } from "react";
import InputMask from "react-input-mask";
import DatePicker, { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";

import classNames from "classnames";
import s from "./Input.module.scss";

registerLocale("ru", ru);

const isTextarea = (props: IInputMainProps): props is IInputTextareaProps => {
    return props.type === "textarea";
};

const isPhone = (props: IInputMainProps): props is IInputPhoneProps => {
    return props.type === "phone";
};

const isDate = (props: IInputMainProps): props is IInputDateProps => {
    return props.type === "date";
};

export type InputMainOnChangeArgumentType = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | (Date | null);

interface IInputMainProps {
    containerClassName?: string;
    labelClassName?: string;
    inputClassName?: string;
    errorMessageClassName?: string;
    value: string | Date;
    label?: string;
    type?: "phone" | "email" | "number" | "text" | "date" | "password" | "textarea";
    rows?: number;
    placeholder?: string;
    suffix?: string;
    prefix?: string;
    invalid?: boolean;
    disabled?: boolean;
    errorMessage?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | Date | null) => void;
    onBlur?: () => void;
}

interface IInputProps extends IInputMainProps {
    type?: "email" | "text" | "password" | "number";
    value: string;
}

interface IInputPhoneProps extends IInputMainProps {
    type?: "phone";
    value: string;
}

interface IInputTextareaProps extends IInputMainProps {
    type: "textarea";
    value: string;
}

interface IInputDateProps extends IInputMainProps {
    type: "date";
    value: Date;
}

const InputMain: FC<IInputProps | IInputTextareaProps | IInputPhoneProps | IInputDateProps> = props => {
    const {
        containerClassName,
        labelClassName,
        inputClassName,
        errorMessageClassName,
        label,
        type,
        rows,
        invalid,
        errorMessage,
        value,
        prefix = "",
        ...rest
    } = props;
    const id = useId();

    const getPrefixedValue = useCallback(
        (value: string) => (value?.length > 0 && !value.includes(prefix) ? `${prefix}${value}` : value),
        []
    );

    return (
        <div className={classNames(s.input__container, containerClassName)}>
            {label && (
                <label
                    className={classNames(s.label, labelClassName)}
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            {isTextarea(props) ? (
                <textarea
                    id={id}
                    className={classNames(s.input, s.textarea, { [s.invalid]: invalid }, inputClassName)}
                    rows={rows}
                    {...rest}
                    value={getPrefixedValue(props.value)}
                />
            ) : isPhone(props) ? (
                <InputMask
                    id={id}
                    className={classNames(s.input, { [s.invalid]: invalid }, inputClassName)}
                    mask="+7 (999)-999-99-99"
                    maskPlaceholder="+7 (999)-999-99-99"
                    {...rest}
                    value={getPrefixedValue(props.value)}
                />
            ) : isDate(props) ? (
                <DatePicker
                    id={id}
                    className={classNames(s.input, { [s.invalid]: invalid }, inputClassName)}
                    selected={props.value}
                    locale={"ru"}
                    {...rest}
                />
            ) : (
                <input
                    id={id}
                    className={classNames(s.input, { [s.invalid]: invalid }, inputClassName)}
                    type={type}
                    {...rest}
                    value={getPrefixedValue(props.value)}
                />
            )}
            {errorMessage && invalid && (
                <span className={classNames(s.error_message, errorMessageClassName)}>{errorMessage}</span>
            )}
        </div>
    );
};

export default memo(InputMain);
