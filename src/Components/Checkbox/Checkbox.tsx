import { FC, ChangeEvent } from "react";

import s from "./Checkbox.module.scss";

type CheckboxProps = {
    isChecked: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    label: string | JSX.Element;
    id: string;
};

const Checkbox: FC<CheckboxProps> = ({ isChecked, label, onChange, id }) => {
    return (
        <>
            <input
                className={s.checkbox}
                type="checkbox"
                checked={isChecked}
                onChange={onChange}
                id={id}
            />
            <label
                className={s.label}
                htmlFor={id}
            >
                <div className={`${s.check} ${isChecked && s.show}`}></div>
                {label}
            </label>
        </>
    );
};

export default Checkbox;
