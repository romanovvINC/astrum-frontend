import React, { FC, useCallback, useState } from "react";
import { Col, Row } from "reactstrap";
import { CustomField } from "models/CustomField";
import { CustomFieldItem } from "./CustomFieldItem";
import { CustomFieldCreate } from "./CustomFieldCreate";
import { ReactComponent as PlusIcon } from "assets/svg/plus-icon.svg";
import { v4 } from "uuid";

import s from "./CustomFieldsSection.module.scss";

interface ICustomFieldsSectionProps {
    fields: CustomField[];
    editable?: boolean;
    onChange: (newValue: CustomField[]) => void;
}

const CustomFieldsSection: FC<ICustomFieldsSectionProps> = ({ fields, editable = true, onChange }) => {
    const [isCreateMode, setCreateMode] = useState(false);

    const clickCreateCustomFieldHandler = useCallback(() => {
        setCreateMode(true);
    }, []);

    const saveCustomFieldHandler = useCallback(
        (name: string, value: string) => {
            const id = v4();
            const newCustomField = { id, name, value };
            const result = [...fields, newCustomField];
            setCreateMode(false);
            onChange(result);
        },
        [fields, onChange]
    );

    const deleteCustomFieldHandler = useCallback(
        (id: string) => {
            const result = [...fields];
            const index = result.findIndex(f => f.id === id);
            result.splice(index, 1);
            onChange(result);
        },
        [fields, onChange]
    );

    const cancelCreateCustomFieldHandler = useCallback(() => setCreateMode(false), []);

    return (
        <Row>
            <Col xl={12}>
                {fields.map(f => (
                    <CustomFieldItem
                        key={f.id}
                        {...f}
                        editable={editable}
                        onClickDelete={deleteCustomFieldHandler}
                    />
                ))}
                {editable &&
                    (isCreateMode ? (
                        <CustomFieldCreate
                            defaultName={""}
                            defaultValue={""}
                            onSave={saveCustomFieldHandler}
                            onCancel={cancelCreateCustomFieldHandler}
                        />
                    ) : (
                        <div className={s.add_field_button_container}>
                            <button
                                className={s.add_field_button}
                                onClick={clickCreateCustomFieldHandler}
                            >
                                <PlusIcon className={s.plus} />
                            </button>
                        </div>
                    ))}
            </Col>
        </Row>
    );
};

export default CustomFieldsSection;
