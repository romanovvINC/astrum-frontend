import { FC } from "react";
import { Card, CardBody } from "reactstrap";
import { InventoryItem } from "models/inventory/InventoryItem";
import { UserAvatar } from "Components/UserAvatar";
import { InventoryStatusName } from "models/inventory/InventoryStatus";
import { MainInformation } from "ui/MainInformation";

import classNames from "classnames";
import s from "./InventoryCard.module.scss";

const MAX_HP = 100;

const getHpBarClassName = (health: number): string => {
    if (health >= 80) {
        return s.good;
    } else if (health >= 50) {
        return s.normal;
    } else if (health >= 25) {
        return s.low;
    } else {
        return s.danger;
    }
};

const InventoryCard: FC<InventoryItem> = ({ id, template, model, status, serialNumber, state, linkImage, user }) => {
    const hpBarWidth = Math.min(Math.max(0, state), MAX_HP);
    const hpBarClassName = getHpBarClassName(hpBarWidth);
    return (
        <Card>
            <CardBody className={s.body}>
                <div className={s.header}>
                    <UserAvatar
                        avatarUrl={linkImage}
                        avatarRingColor={"#F6F6FD"}
                        width={65}
                    />
                    <div className={s.main_info}>
                        <h4 className={s.title}>{template?.title ?? "DELETED"}</h4>
                        <span className={s.model}>{model}</span>
                    </div>
                </div>
                <div className={s.hp_section}>
                    <span className={s.bold}>HP</span>
                    <div className={s.state}>
                        <div
                            className={classNames(s.hp_bar, hpBarClassName)}
                            style={{ width: `${hpBarWidth}%` }}
                        />
                        <span>
                            {state}/{MAX_HP}
                        </span>
                    </div>
                </div>
                <div className={s.item_info}>
                    <MainInformation
                        labelClassName={s.label}
                        valueClassName={s.value}
                        label={"Серийный №"}
                        value={serialNumber}
                    />
                    <MainInformation
                        labelClassName={s.label}
                        valueClassName={s.value}
                        label={"Статус"}
                        value={InventoryStatusName[status]}
                    />
                    <MainInformation
                        labelClassName={s.label}
                        valueClassName={s.value}
                        label={"Пользователь"}
                        value={user?.nameWithSurname ?? "Не назначен"}
                    />
                </div>
            </CardBody>
        </Card>
    );
};

export default InventoryCard;
