import { FC, ChangeEvent, ReactElement } from "react";

import s from "./ToggleSwitcher.module.scss";

type ToggleSwitcherProps = {
    isChecked: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    label: string | JSX.Element;
    id: string;
};

const ToggleSwitcher: FC<ToggleSwitcherProps> = ({ isChecked, label, onChange, id }) => {
    return (
        <>
            <div className={s.switcher_container}>
                <input
                    className={`${s.switcher} ${isChecked && s.show}`}
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
                </label>
                <h4>{label}</h4>
            </div>
        </>
    );
};

export default ToggleSwitcher;
