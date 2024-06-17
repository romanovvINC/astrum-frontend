import { FC, useCallback } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import { ReactComponent as ProjectIcon } from "assets/svg/profileFreeFiledsIcons/projects_icon.svg";
import { MainInformation } from "ui/MainInformation";
import { getUserDateString } from "Helpers/GetUserDateString";
import { CustomFieldCreate } from "./CustomFieldCreate";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { SuccessCallback } from "models/AliasTypes";
import { deleteProfileCustomFieldRequest, editProfileCustomFieldRequest, profileSelectors } from "modules/profile";
import { authSelectors } from "modules/auth";
import ProfileInfoDetailsSkeleton from "./ProfileInfoDetailsSkeleton";
import { CustomFieldItem } from "./CustomFieldItem";
import { CustomFieldWrap } from "./CustomFieldWrap";
import { CompetenceListSection } from "./CompetenceListSection";

import s from "./ProfileInfoDetails.module.scss";

const ProfileInfoDetails: FC = () => {
    const {
        pending,
        profileInfo: { username, birthDate, position, address, projects, customFields },
    } = useAppSelector(profileSelectors.getProfileState);
    const { username: accountUsername } = useAppSelector(authSelectors.getBasicInfo);
    const dispatch = useAppDispatch();
    const isPersonalAccount = accountUsername === username;

    const changeCustomFieldHandler = useCallback((id: string) => {
        return (data: { name: string; value: string }, successCallback: SuccessCallback) =>
            dispatch(editProfileCustomFieldRequest({ data: { id, ...data }, successCallback }));
    }, []);

    const deleteCustomFieldHandler = useCallback((id: string) => {
        return () => dispatch(deleteProfileCustomFieldRequest(id));
    }, []);

    if (pending) {
        return <ProfileInfoDetailsSkeleton />;
    }

    return (
        <Card className={s.card}>
            <CardHeader className={s.header}>
                <h5
                    style={{ display: "flex", fontSize: "16px" }}
                    className={`p-0`}
                >
                    Обо мне
                </h5>
            </CardHeader>
            <CardBody
                style={{ padding: 0, marginTop: 20 }}
                className={"post-about"}
            >
                <ul className={s.custom_fields__list}>
                    {birthDate && (
                        <li>
                            <MainInformation
                                label="Дата Рождения"
                                value={getUserDateString(birthDate)}
                            />
                        </li>
                    )}
                    {position && (
                        <li>
                            <MainInformation
                                label="Должность"
                                value={position}
                            />
                        </li>
                    )}
                    {address && (
                        <li>
                            <MainInformation
                                label="Домашний адрес"
                                value={address}
                            />
                        </li>
                    )}
                    {customFields.map(f => {
                        return (
                            <li key={f.id}>
                                <CustomFieldItem
                                    name={f.name}
                                    value={f.value}
                                    onEdit={isPersonalAccount ? changeCustomFieldHandler(f.id) : undefined}
                                    onDelete={isPersonalAccount ? deleteCustomFieldHandler(f.id) : undefined}
                                />
                            </li>
                        );
                    })}
                    {isPersonalAccount && (
                        <li>
                            <CustomFieldCreate />
                        </li>
                    )}
                </ul>
                {projects && projects.length !== 0 && (
                    <CustomFieldWrap
                        iconElement={<ProjectIcon />}
                        title="Проекты"
                    >
                        <ul className={s.project_list}>
                            {projects.map(p => {
                                return (
                                    <li
                                        key={`project-${p.projectId}`}
                                        className={s.project}
                                    >
                                        <Link
                                            to={`/projects/${p.projectId}`}
                                            className={s.project_link}
                                        >
                                            <span className={s.label}>{p.projectName}</span>
                                            <span className={s.value}>{p.role}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </CustomFieldWrap>
                )}
                <CompetenceListSection />
            </CardBody>
        </Card>
    );
};

export default ProfileInfoDetails;
