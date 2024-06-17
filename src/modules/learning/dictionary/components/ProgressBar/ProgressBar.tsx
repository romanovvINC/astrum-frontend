import { FC } from "react";
import { ProgressBarItem } from "models/learning/dictionary/ProgressBarItem";

import s from "./ProgressBar.module.scss";

const ProgressBar: FC<ProgressBarItem> = ({ value = 0 }) => {
    return (
        <div className={s.progressbar}>
            <h4>Изучено</h4>
            <div className={s.progress_container}>
                <div
                    className={`${s.progress} ${value < 30 ? s.red : value < 60 ? s.yellow : s.green}`}
                    style={{ height: `${value}%`, opacity: value === 0 ? "0" : "1" }}
                ></div>
            </div>
        </div>
    );
};

export default ProgressBar;
