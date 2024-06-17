import { FC } from "react";
import { ReactComponent as CrossIcon } from "assets/svg/cross-gray-icon.svg";
import { ReactComponent as EmptyFile } from "assets/svg/empty-file-icon.svg";
import { getFileSizeString } from "Helpers/FileHelpers";
import s from "./FilePreview.module.scss";

interface IFilePreviewProps {
    file: File;
    onClickDelete: (file: File) => void;
}
const FilePreview: FC<IFilePreviewProps> = ({ file, onClickDelete }) => {
    const fileFormat = file.name.split(".").pop();
    const deleteFileHandler = () => onClickDelete(file);

    return (
        <div className={s.file_preview}>
            <div className={s.file_info__container}>
                <EmptyFile />
                <div className={s.file_info}>
                    <a
                        className={s.file_link}
                        href={URL.createObjectURL(file)}
                        target={"_blank"}
                        rel={"noreferrer"}
                    >
                        {file.name}
                    </a>
                    <span className={s.file_size}>{getFileSizeString(file.size)}</span>
                </div>
            </div>
            <CrossIcon
                className={s.delete_icon}
                onClick={deleteFileHandler}
            />
        </div>
    );
};

export default FilePreview;
