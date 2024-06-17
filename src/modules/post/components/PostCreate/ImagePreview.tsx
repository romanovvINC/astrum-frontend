import { FC, memo } from "react";
import { ReactComponent as CrossIcon } from "assets/svg/cross-gray-icon.svg";
import { getFileSizeString } from "Helpers/FileHelpers";
import s from "./FilePreview.module.scss";

interface IImagePreviewProps {
    file: File;
    onClickDelete: (file: File) => void;
}
const ImagePreview: FC<IImagePreviewProps> = ({ file, onClickDelete }) => {
    const deleteFileHandler = () => onClickDelete(file);

    return (
        <div className={s.image_preview__container}>
            <img
                className={s.image_preview}
                src={URL.createObjectURL(file)}
            />
            <CrossIcon
                className={s.delete_icon}
                onClick={deleteFileHandler}
            />
            <span className={s.image_size}>{getFileSizeString(file.size)}</span>
        </div>
    );
};

export default memo(ImagePreview);
