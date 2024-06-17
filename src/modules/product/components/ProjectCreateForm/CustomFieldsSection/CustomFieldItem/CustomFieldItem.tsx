import React, { FC } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { ReactComponent as DeleteIcon } from "assets/svg/trash-gray-icon.svg";

import s from "./CustomFieldItem.module.scss";

interface ICustomFieldItemProps {
    id: string;
    name: string;
    value: string;
    editable?: boolean;
    onClickDelete?: (id: string) => void;
}

const CustomFieldItem: FC<ICustomFieldItemProps> = ({ id, name, value, editable = true, onClickDelete }) => {
    return (
        <Row>
            <Col className={s.custom_field__item}>
                <div className={s.header}>
                    <h3>{name}</h3>
                    {editable && onClickDelete && (
                        <DeleteIcon
                            className={s.delete_icon}
                            onClick={() => onClickDelete(id)}
                        />
                    )}
                </div>
                <Card>
                    <CardBody className={s.value}>{value}</CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default CustomFieldItem;
