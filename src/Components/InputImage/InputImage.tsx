import React, { FC, useCallback, useRef, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { notification } from "Utils/Notification";
import { ImageCrop } from "Components/ImageCrop";
import { ButtonMain } from "ui/Button";
import { Image } from "ui/Image";

import classNames from "classnames";
import s from "./ImputImage.module.scss";

interface IInputImage {
    value: string | File | null;
    invalid?: boolean;
    onChange: (newImage: Blob | File) => void;
}

const acceptFormats = ["image/jpeg", "image/jpg", "image/png"];

const InputImage: FC<IInputImage> = ({ value, invalid, onChange }) => {
    const [modalIsOpen, setModalOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const imageUrl = typeof value === "string" ? value : value ? URL.createObjectURL(value) : "";

    const changeImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        if (file && acceptFormats.some(f => file.type.includes(f))) {
            setFile(file);
            setModalOpen(true);
        } else {
            notification("Ошибка", `Можно загружать только файлы формата ${acceptFormats.join(", ")}`);
        }
        if (inputRef.current) {
            const dt = new DataTransfer();
            inputRef.current.files = dt.files;
        }
    }, []);

    const clickUploadImageHandler = useCallback(() => inputRef.current?.click(), []);

    const changeHandler = useCallback(
        (image: Blob | null) => {
            if (image) {
                onChange(image);
                setModalOpen(false);
            }
        },
        [onChange]
    );

    const cancelHandler = useCallback(() => {
        setModalOpen(false);
        const dt = new DataTransfer();
        if (inputRef.current) {
            inputRef.current.files = dt.files;
        }
    }, []);

    return (
        <>
            {imageUrl && (
                <Image
                    className={s.image_preview}
                    src={imageUrl}
                />
            )}
            <input
                ref={inputRef}
                hidden={true}
                type="file"
                accept={acceptFormats.join(",")}
                onChange={changeImage}
            />
            <ButtonMain
                className={classNames(s.upload_button, { [s.invalid]: invalid })}
                type={"button"}
                variant={invalid ? "invert" : "default"}
                onClick={clickUploadImageHandler}
            >
                Загрузить фотографию
            </ButtonMain>
            <Modal
                isOpen={modalIsOpen}
                toggle={cancelHandler}
                size={"lg"}
                centered={true}
            >
                <ModalHeader
                    tag={"h3"}
                    toggle={cancelHandler}
                >
                    Обрезка картинки обложки
                </ModalHeader>
                <ModalBody>
                    {file && (
                        <ImageCrop
                            imageSrc={URL.createObjectURL(file)}
                            asyncDrawPreview={true}
                            aspect={4 / 3}
                            onSave={changeHandler}
                            onCancel={cancelHandler}
                        />
                    )}
                </ModalBody>
            </Modal>
        </>
    );
};

export default InputImage;
