import React, { FC, useEffect } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { ReactComponent as Crown } from "assets/svg/crow-icon.svg";
import { getDefaultAvatar } from "Mocks/MockFunctions";
import { CustomFieldItem, getProjectRequest, productSelectors } from "modules/product";
import { UserAvatar } from "Components/UserAvatar";
import ProjectInfoSkeleton from "modules/product/components/ProjectInfo/ProjectInfoSkeleton";

import s from "./ProjectInfo.module.scss";
import { getUserDateString } from "Helpers/GetUserDateString";

interface IProjectInfoProps {
    id: string;
}

const ProjectInfo: FC<IProjectInfoProps> = ({ id }) => {
    const { pending, error } = useAppSelector(productSelectors.getProductState);
    const {
        id: currentId,
        name,
        description,
        startDate,
        members,
        customFields,
    } = useAppSelector(productSelectors.getProjectInfo);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (id !== currentId) {
            dispatch(getProjectRequest(id));
        }
    }, []);

    if (pending) {
        return <ProjectInfoSkeleton />;
    } else if (error) {
        return (
            <Row>
                <Col>
                    <h2>Ошибка: {error}</h2>
                </Col>
            </Row>
        );
    }

    return (
        <Row className={s.project_info}>
            <Col xl={12}>
                <h1 className={s.name}>{name}</h1>
            </Col>
            <Col xl={12}>
                <h2>
                    Дата начала разработки: <span className={s.develop_duration}>{getUserDateString(startDate)}</span>
                </h2>
            </Col>
            <Col xl={12}>
                <Card>
                    <CardBody className={s.description}>{description}</CardBody>
                </Card>
            </Col>
            {customFields && customFields.length > 0 && (
                <Col xl={12}>
                    {customFields.map(f => (
                        <CustomFieldItem
                            key={f.id}
                            editable={false}
                            {...f}
                        />
                    ))}
                </Col>
            )}
            <Col xl={12}>
                <h2>Команда</h2>
            </Col>
            <Col xl={12}>
                <Card>
                    <CardBody className={s.group_container}>
                        {members.map((p, i) => {
                            return (
                                <div
                                    key={`${p.userId}-${p.username}`}
                                    className={s.developer_container}
                                >
                                    <div className={s.avatar_container}>
                                        <UserAvatar
                                            className={s.develop_avatar}
                                            avatarUrl={p.avatarUrl ?? getDefaultAvatar()}
                                        />
                                        {p.isManager && <Crown className={s.manager_crown} />}
                                    </div>
                                    <div className={s.develop_info_container}>
                                        <a
                                            className={s.link}
                                            href={`/profile/${p.username}`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {p.name} {p.surname}
                                        </a>
                                        <span className={s.role}>{p.role}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default ProjectInfo;
