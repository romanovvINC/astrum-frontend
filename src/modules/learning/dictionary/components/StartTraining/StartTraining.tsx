import { FC, useEffect } from "react";
import { Row, Col } from "reactstrap";
import Skeleton from "react-loading-skeleton";
import { ButtonMain } from "ui/Button";
import { StartTrainingItem } from "models/learning/dictionary/StartTrainingItem";
import { useAppSelector, useAppDispatch } from "Redux/hooks";
import { dictionarySelectors, getConstructorSelectedRequest } from "modules/learning/dictionary";
import EditIcon from "ui/icons/EditIcon";
import { getRightDeclensionTerm } from "Helpers/GetRightDeclension";
import { authSelectors } from "modules/auth";

import s from "./StartTraining.module.scss";

const StartTraining: FC<StartTrainingItem> = ({ onStartClick, onEditClick, header, text }) => {
    const dispatch = useAppDispatch();

    const { checkedValues, pending } = useAppSelector(dictionarySelectors.getConstructor);
    const { userId } = useAppSelector(authSelectors.getBasicInfo);

    useEffect(() => {
        dispatch(getConstructorSelectedRequest(userId));
    }, [dispatch, userId]);

    return (
        <Row>
            <Col md={{ offset: 2, size: 8 }}>
                <div className={s.start_training}>
                    <Row>
                        <div className={s.header}>{header}</div>
                        <div className={s.text}>{text}</div>
                    </Row>
                    <Row>
                        <div className={s.words}>
                            <div className={s.amount}>
                                {pending ? (
                                    <Skeleton className={s.skeleton} />
                                ) : (
                                    `Для тренировки выбрано ${checkedValues.length}
                                    ${getRightDeclensionTerm(checkedValues.length)}`
                                )}
                            </div>
                            <div
                                className={s.edit}
                                onClick={onEditClick}
                            >
                                <EditIcon color="#6362E7" />
                                Редактировать
                            </div>
                        </div>
                    </Row>
                    <Row>
                        <div style={{ display: "flex" }}>
                            <ButtonMain
                                className={s.start_training_button}
                                onClick={onStartClick}
                            >
                                Начать тренировку
                            </ButtonMain>
                        </div>
                    </Row>
                </div>
            </Col>
        </Row>
    );
};

export default StartTraining;
