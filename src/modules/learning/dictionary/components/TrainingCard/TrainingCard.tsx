import { FC } from "react";
import { Col } from "reactstrap";
import { TrainingCardItem } from "models/learning/dictionary/TrainingCardItem";

import s from "./TrainingCard.module.scss";

const TrainingCard: FC<TrainingCardItem> = ({ header, items, icon, className, text, onClick }) => {
    return (
        <Col md={3}>
            <div
                className={s.training_card}
                onClick={onClick}
            >
                <h2>{header}</h2>
                <div className={s.text}>{text}</div>
                <div className={className ? s[className] : s.items}>
                    {items &&
                        items.map((item, idx) => (
                            <div
                                className={s.item}
                                key={idx}
                            >
                                {item}
                            </div>
                        ))}
                    {icon && <div className={s.redo_icon}>{icon}</div>}
                </div>
            </div>
        </Col>
    );
};

export default TrainingCard;
