import React, { FC, useCallback } from "react";
import { ProjectShortInfo } from "models/product/ProjectShortInfo";
import { ProjectEditInfo } from "models/product/ProjectEditInfo";
import { ReactComponent as DeleteIcon } from "assets/svg/trash-icon.svg";

import s from "./ProjectItem.module.scss";

interface IProjectItemProps {
    number: number;
    projectInfo: ProjectShortInfo | ProjectEditInfo;
    onClick: (project: ProjectShortInfo | ProjectEditInfo) => void;
    onClickDeleteProject: (projectId: string) => void;
}

const ProjectItem: FC<IProjectItemProps> = ({ number, projectInfo, onClick, onClickDeleteProject }) => {
    const clickProjectHandler = useCallback(() => {
        onClick(projectInfo);
    }, [projectInfo, onClick]);

    const clickDeleteProjectHandler = useCallback(
        (projectId: string) => {
            return (e: React.MouseEvent<HTMLDivElement>) => {
                e.stopPropagation();
                onClickDeleteProject(projectId);
            };
        },
        [onClickDeleteProject]
    );

    return (
        <div
            className={s.project_item}
            onClick={clickProjectHandler}
        >
            <h3 style={{ margin: 0 }}>
                {number}. {projectInfo.name}
            </h3>
            <div
                className={s.delete_icon}
                onClick={clickDeleteProjectHandler(projectInfo.id)}
            >
                <DeleteIcon />
            </div>
        </div>
    );
};

export default ProjectItem;
