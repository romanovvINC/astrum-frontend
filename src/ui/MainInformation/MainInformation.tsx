import { FC } from "react";
import { ReactComponent as TrashIcon } from "../../assets/svg/trash-icon.svg";
import { ReactComponent as EditIcon } from "../../assets/svg/editable-icon.svg";
import classNames from "classnames";
import s from "./MainInformation.module.scss";

interface IMainInformationProps {
    labelClassName?: string;
    valueClassName?: string;
    label: string;
    value: string;
    onClickEdit?: () => void;
    onDelete?: () => void;
}

const MainInformation: FC<IMainInformationProps> = ({
    labelClassName,
    valueClassName,
    label,
    value,
    onClickEdit,
    onDelete,
}) => {
    return (
        <div className={classNames(s.main_information_container, { [s.has_padding]: onDelete || onClickEdit })}>
            <div className={s.main_information}>
                <span className={classNames(s.label, labelClassName)}>{label}:</span>
                <span className={classNames(s.value, valueClassName)}>{value}</span>
            </div>
            {(onDelete || onClickEdit) && (
                <div className={s.controls__container}>
                    {onClickEdit && (
                        <EditIcon
                            className={s.icon}
                            onClick={onClickEdit}
                        />
                    )}
                    {onDelete && (
                        <TrashIcon
                            className={s.icon}
                            onClick={onDelete}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default MainInformation;
