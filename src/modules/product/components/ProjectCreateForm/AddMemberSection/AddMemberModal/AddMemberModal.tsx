import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { FormGroup, Label, Modal, ModalBody, ModalHeader } from "reactstrap";
import { ProjectMember } from "models/product/ProjectMember";
import { ShortProfileInfo } from "models/profile/ShortProfileInfo";
import { ButtonMain } from "ui/Button";
import { Select } from "ui/Select";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { getProfilePositionListRequest, productSelectors } from "modules/product";
import { ProfilePositionInfo } from "models/profile/ProfilePositionInfo";

const roleOptions = [
    "Frontend developer",
    "Backend developer",
    "Designer",
    "Fullstack developer",
    "Analyst",
    "Manager",
];

interface IAddMemberModalProps {
    isOpen: boolean;
    toggle: () => void;
    profiles: ShortProfileInfo[];
    selectedMembers: ProjectMember[];
    onSaveMember: (member: ProjectMember) => void;
}

const AddMemberModal: FC<IAddMemberModalProps> = ({ isOpen, toggle, profiles, selectedMembers, onSaveMember }) => {
    const options = profiles
        .filter(p => selectedMembers.length === 0 || !selectedMembers.some(m => m.userId === p.userId))
        .map(p => ({ name: `${p.name} ${p.surname}`, value: p.userId }));
    const { profilePositions } = useAppSelector(productSelectors.getProductState);
    const [selectedMember, setSelectedMember] = useState<{ name: string; value: string }>({ name: "", value: "" });
    const [role, setRole] = useState<ProfilePositionInfo>({ id: "", name: "" });
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getProfilePositionListRequest());
    }, []);

    const changeMemberIdHandler = useCallback(
        (newValue: { name: string; value: string }) => setSelectedMember(newValue),
        []
    );

    const changeRoleHandler = useCallback((newPosition: ProfilePositionInfo) => setRole(newPosition), []);

    const clickSaveMemberHandler = () => {
        const member = profiles.find(m => m.userId === selectedMember.value);
        onSaveMember({ ...member!, role: role.name, isManager: role?.name === "Менеджер" });
        setSelectedMember({ name: "", value: "" });
        setRole({ id: "", name: "" });
    };

    return (
        <Modal
            isOpen={isOpen}
            toggle={toggle}
            centered={true}
        >
            <ModalHeader toggle={toggle}>Добавить участника в команду</ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Label>Участник</Label>
                    <Select
                        value={selectedMember}
                        options={options}
                        placeholder={"Не выбрано"}
                        //eslint-disable-next-line
                        //@ts-ignore
                        onChange={changeMemberIdHandler}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Роль</Label>
                    <Select
                        value={role}
                        options={profilePositions}
                        placeholder={"Не выбрано"}
                        //eslint-disable-next-line
                        //@ts-ignore
                        onChange={changeRoleHandler}
                    />
                </FormGroup>
                <ButtonMain
                    onClick={clickSaveMemberHandler}
                    disabled={selectedMember.value === "" || role.id === ""}
                >
                    Добавить
                </ButtonMain>
            </ModalBody>
        </Modal>
    );
};

export default AddMemberModal;
