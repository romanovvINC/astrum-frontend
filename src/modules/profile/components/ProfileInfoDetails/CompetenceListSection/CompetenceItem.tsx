import { FC } from "react";
import { ReactComponent as TrashGrayIcon } from "assets/svg/trash-gray-icon.svg";

import classNames from "classnames";
import s from "./CompetenceListSection.module.scss";

interface ICompetenceItemProps {
    value: string;
    onDelete?: (competence: string) => void;
}

const CompetenceItem: FC<ICompetenceItemProps> = ({ value, onDelete }) => {
    return (
        <div className={classNames(s.skill, { [s.relative]: onDelete })}>
            {value}
            <div
                className={s.delete_competence_container}
                onClick={() => onDelete?.(value)}
            >
                <TrashGrayIcon className={s.delete_competence_icon} />
            </div>
        </div>
    );
};

export default CompetenceItem;
