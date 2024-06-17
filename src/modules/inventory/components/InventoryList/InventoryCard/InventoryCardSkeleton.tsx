import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import { Card, CardBody } from "reactstrap";

import classNames from "classnames";
import s from "./InventoryCard.module.scss";

const InventoryCardSkeleton: FC = () => {
    return (
        <Card>
            <CardBody className={s.body}>
                <div className={s.header}>
                    <Skeleton
                        circle={true}
                        width={65}
                        height={65}
                    />
                    <div className={s.main_info}>
                        <Skeleton className={classNames(s.skeleton, s.title)} />
                        <Skeleton className={classNames(s.skeleton, s.model)} />
                    </div>
                </div>
                <Skeleton className={classNames(s.skeleton, s.hp)} />
                <div className={s.item_info}>
                    <Skeleton
                        className={classNames(s.skeleton, s.info)}
                        count={3}
                    />
                </div>
            </CardBody>
        </Card>
    );
};

export default InventoryCardSkeleton;
