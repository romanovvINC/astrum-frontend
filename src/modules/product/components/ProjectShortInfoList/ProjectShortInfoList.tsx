import React, { FC, useCallback } from "react";
import { Link } from "react-router-dom";
import { ProjectShortInfo } from "models/product/ProjectShortInfo";

import classNames from "classnames";
import s from "./ProjectShortInfoList.module.scss";

interface IProjectShortInfoListProps {
    projectItemClassName?: string;
    projects: ProjectShortInfo[];
    deletable?: boolean;
    onClickProjectItem?: (projectId: string) => void;
}

const ProjectShortInfoList: FC<IProjectShortInfoListProps> = ({
    projectItemClassName,
    projects,
    deletable = false,
    onClickProjectItem,
}) => {
    const clickProjectItemHandler = useCallback(
        (projectId: string) => {
            if (onClickProjectItem) {
                return (e: React.MouseEvent) => {
                    e.preventDefault();
                    onClickProjectItem(projectId);
                };
            }
            return undefined;
        },
        [onClickProjectItem]
    );

    return (
        <ul className={s.project_list}>
            {projects.map((p, i) => {
                return (
                    <li
                        key={p.id}
                        className={classNames(s.project_info_li, projectItemClassName)}
                    >
                        <Link
                            className={s.project_info}
                            to={`/projects/${p.id}`}
                            onClick={clickProjectItemHandler(p.id)}
                        >
                            <h4>
                                {i + 1}. {p.name}
                            </h4>
                            <span>{p.startDate.getFullYear()}</span>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default ProjectShortInfoList;
