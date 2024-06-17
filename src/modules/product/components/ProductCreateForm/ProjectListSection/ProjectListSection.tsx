import React, { FC, useCallback, useState } from "react";
import { Col } from "reactstrap";
import { ProjectCreateFormFullScreenModal } from "modules/product/components/ProjectCreateForm";
import { ProjectShortInfo } from "models/product/ProjectShortInfo";
import { ProjectCreateInfo } from "models/product/ProjectCreateInfo";
import { ProjectEditInfo } from "models/product/ProjectEditInfo";
import { ProjectItem } from "./ProjectItem";
import { v1 } from "uuid";

import s from "./ProjectListSection.module.scss";
import classNames from "classnames";
import { useAppDispatch } from "Redux/hooks";
import { setProject } from "modules/product/store";
import { isProjectCreateInfo } from "modules/product/helpers/typeHelpers";

interface IProjectListSectionProps {
    projects: (ProjectShortInfo | ProjectEditInfo)[];
    invalid?: boolean;
    onChange: (projects: (ProjectShortInfo | ProjectEditInfo)[]) => void;
}

const ProjectListSection: FC<IProjectListSectionProps> = ({ projects, invalid = false, onChange }) => {
    const [currentProjectId, setCurrentProjectId] = useState("");
    const [needSendRequestToGetProject, setNeedSendRequestToGetProject] = useState(true);
    const [createProjectModalIsOpen, setCreateProjectModalIsOpen] = useState(false);
    const [editProjectModalIsOpen, setEditProjectModalIsOpen] = useState(false);
    const dispatch = useAppDispatch();
    const projectNames = projects.map(p => p.name);

    const saveCreateProjectHandler = (project: ProjectCreateInfo) => {
        const newProject: ProjectEditInfo = { ...project, id: v1() };
        const result: (ProjectShortInfo | ProjectEditInfo)[] = [...projects, newProject];
        onChange(result);
        setCreateProjectModalIsOpen(false);
    };

    const clickAddProjectHandler = useCallback(() => setCreateProjectModalIsOpen(true), []);

    const clickEditProjectHandler = useCallback((project: ProjectShortInfo | ProjectEditInfo) => {
        setCurrentProjectId(project.id);
        setEditProjectModalIsOpen(true);
        const isNewProject = isProjectCreateInfo(project.id);
        if (isNewProject) {
            setNeedSendRequestToGetProject(false);
            const newProject = project as ProjectEditInfo;
            dispatch(setProject({ ...newProject, productName: "", isDeletable: false, productId: "" }));
        } else {
            setNeedSendRequestToGetProject(true);
        }
    }, []);

    const saveEditProjectHandler = (project: ProjectCreateInfo | ProjectEditInfo) => {
        const projectIndex = projects.findIndex(p => p.id === project.id);
        if (projectIndex > -1) {
            const result: (ProjectShortInfo | ProjectEditInfo)[] = [...projects];
            result[projectIndex] = project as ProjectEditInfo;
            onChange(result);
        }
        setEditProjectModalIsOpen(false);
    };

    const deleteProjectHandler = (id: string) => {
        const result = [...projects];
        const index = result.findIndex(p => p.id === id);
        result.splice(index, 1);
        onChange(result);
    };

    const toggleCreateProjectModal = useCallback(() => setCreateProjectModalIsOpen(prev => !prev), []);

    const toggleEditProjectModal = useCallback(() => setEditProjectModalIsOpen(prev => !prev), []);

    return (
        <Col xl={12}>
            <div
                className={classNames(s.add_project__button, { [s.invalid]: invalid })}
                onClick={clickAddProjectHandler}
            >
                Добавить проект +
            </div>
            {projects.map((p, i) => {
                return (
                    <ProjectItem
                        key={p.id}
                        number={i + 1}
                        projectInfo={p}
                        onClick={clickEditProjectHandler}
                        onClickDeleteProject={deleteProjectHandler}
                    />
                );
            })}
            <ProjectCreateFormFullScreenModal
                isOpen={createProjectModalIsOpen}
                needSendRequestToGetProject={false}
                toggle={toggleCreateProjectModal}
                existProjectNames={projectNames}
                onSave={saveCreateProjectHandler}
            />
            <ProjectCreateFormFullScreenModal
                id={currentProjectId}
                needSendRequestToGetProject={needSendRequestToGetProject}
                isOpen={editProjectModalIsOpen}
                toggle={toggleEditProjectModal}
                existProjectNames={projectNames}
                isEdit={true}
                onSave={saveEditProjectHandler}
            />
        </Col>
    );
};

export default ProjectListSection;
