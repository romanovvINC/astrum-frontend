import React, { FC } from "react";

import classNames from "classnames";
import s from "./PostImageGrid.module.scss";

interface IImagesGridProps {
    children: JSX.Element[];
}

const PostImageGrid: FC<IImagesGridProps> = ({ children }) => {
    return (
        <div className={classNames(s.images_preview__container, s[`images_preview__container_${children.length}`])}>
            {children}
        </div>
    );
};

export default PostImageGrid;
