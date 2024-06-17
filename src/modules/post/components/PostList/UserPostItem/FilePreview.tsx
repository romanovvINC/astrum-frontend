import { FC } from "react";
import { ReactComponent as EmptyFile } from "assets/svg/empty-file-icon.svg";

import s from "./FilePreview.module.scss";

interface IFilePreviewProps {
    url: string;
    name: string;
}

const FilePreview: FC<IFilePreviewProps> = ({ url, name }) => {
    return (
        <div className={s.file_preview}>
            <div className={s.file_info__container}>
                <EmptyFile />
                <div className={s.file_info}>
                    <a
                        className={s.file_link}
                        download
                        rel={"noreferrer"}
                        target={"_blank"}
                        href={url}
                    >
                        {name}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FilePreview;
