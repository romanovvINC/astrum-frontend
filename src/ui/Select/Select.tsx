import { FC, useCallback, useRef, useState } from "react";
import { useOnClickOutside } from "Helpers/Hooks/useClickOutside";
import { SelectArrowIcon } from "ui/icons";

import classNames from "classnames";
import s from "./Select.module.scss";

const isSelectOption = (item: string | SelectOption | UserSelectOption): item is UserSelectOption => {
    return typeof item === "object" && Object.hasOwn(item, "name") && Object.hasOwn(item, "value");
};

type UserSelectOption = {
    [key: string]: string | null;
};

type SelectOption = {
    name: string;
    value: string;
};

interface ISelectProps {
    value: string | SelectOption | UserSelectOption;
    options: string[] | SelectOption[] | UserSelectOption[];
    optionNameField?: string;
    containerClassName?: string;
    labelClassName?: string;
    selectClassName?: string;
    selectArrow?: JSX.Element;
    label?: string;
    invalid?: boolean;
    placeholder?: string;
    onChange: (newValue: string | SelectOption | UserSelectOption) => void;
    onBlur?: () => void;
}

const Select: FC<ISelectProps> = ({
    value,
    options,
    optionNameField = "name",
    containerClassName,
    labelClassName,
    selectClassName,
    label,
    invalid = false,
    placeholder,
    onChange,
    onBlur,
}) => {
    const [isFocus, setFocus] = useState(false);
    const ref = useRef<HTMLInputElement>(null);
    const resultPlaceholder = placeholder ?? "Не выбрано";
    const title =
        typeof value === "string"
            ? value === ""
                ? resultPlaceholder
                : value
            : isSelectOption(value)
            ? value.name === ""
                ? resultPlaceholder
                : value.name
            : value && Object.hasOwn(value, optionNameField)
            ? value[optionNameField] === ""
                ? resultPlaceholder
                : value[optionNameField]
            : resultPlaceholder;

    useOnClickOutside(ref, () => setFocus(false));

    const changeHandler = useCallback(
        (value: string | SelectOption | UserSelectOption) => {
            return () => {
                onChange(value);
                setFocus(false);
            };
        },
        [onChange]
    );

    const clickViewHandler = useCallback(() => {
        ref.current?.focus();
        setFocus(prev => !prev);
    }, []);

    return (
        <div
            ref={ref}
            className={classNames(s.root, containerClassName)}
        >
            {label && <label className={classNames(s.label, labelClassName)}>{label}</label>}
            <div className={s.wrap}>
                <div
                    className={classNames(s.input, selectClassName, { [s.invalid]: invalid, [s.focus]: isFocus })}
                    onClick={clickViewHandler}
                >
                    {title}
                    <div className={s.icon__container}>
                        <SelectArrowIcon
                            className={classNames(s.icon, { [s.rotated]: isFocus })}
                            width={14}
                            height={9}
                        />
                    </div>
                </div>
                <ul className={classNames(s.options__container, { [s.invalid]: invalid, [s.opened]: isFocus })}>
                    {options.map((o, i) => (
                        <li
                            key={i}
                            className={s.options__item}
                            onClick={changeHandler(o)}
                        >
                            {typeof o === "object"
                                ? isSelectOption(o)
                                    ? o.name
                                    : Object.hasOwn(o, optionNameField)
                                    ? o[optionNameField]
                                    : ""
                                : o}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Select;
