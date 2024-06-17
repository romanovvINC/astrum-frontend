import React, { FC, useCallback, useEffect, useState } from "react";
import { Card, CardBody, Col } from "reactstrap";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { getProfileShortInfoListRequest, productSelectors } from "modules/product";
import { ProjectMember } from "models/product/ProjectMember";
import { AddMemberModal } from "./AddMemberModal";
import { AddMemberItem, MemberItem } from "./MemberItem";

import classNames from "classnames";
import s from "./AddMemberSection.module.scss";

interface IAddMemberSectionProps {
    value: ProjectMember[];
    invalid?: boolean;
    onChange: (newValue: ProjectMember[]) => void;
}

const AddMemberSection: FC<IAddMemberSectionProps> = ({ value, invalid, onChange }) => {
    const { profileShortInfoList } = useAppSelector(productSelectors.getProductState);
    const [addMemberModalIsOpen, setAddMemberModalIsOpen] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getProfileShortInfoListRequest());
    }, []);

    const clickAddMemberHandler = useCallback(() => setAddMemberModalIsOpen(true), []);

    const addMemberHandler = (member: ProjectMember) => {
        const copy = [...value, member];
        onChange(copy);
        setAddMemberModalIsOpen(false);
    };

    const removeMemberHandler = useCallback(
        (userId: string) => {
            const copy = [...value];
            const index = copy.findIndex(m => m.userId === userId);
            copy.splice(index, 1);
            onChange(copy);
        },
        [value]
    );

    const toggleModal = useCallback(() => setAddMemberModalIsOpen(prev => !prev), []);

    return (
        <Col>
            <Card className={classNames({ [s.invalid]: invalid })}>
                <CardBody className={s.group_container}>
                    <AddMemberItem onClick={clickAddMemberHandler} />
                    {value.map(m => (
                        <MemberItem
                            key={m.userId}
                            {...m}
                            onClickRemove={removeMemberHandler}
                        />
                    ))}
                </CardBody>
            </Card>
            <AddMemberModal
                isOpen={addMemberModalIsOpen}
                toggle={toggleModal}
                profiles={profileShortInfoList}
                selectedMembers={value}
                onSaveMember={addMemberHandler}
            />
        </Col>
    );
};

export default AddMemberSection;
