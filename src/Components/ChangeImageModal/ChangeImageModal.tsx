import { ChangeEvent, FC, useCallback, useRef, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { ImageCrop } from "Components/ImageCrop";
import { ButtonMain } from "ui/Button";

interface IChangeImageModalProps {
    isOpen: boolean;
    imageAspectRatio: number;
    title: string;
    previewWidth?: number;
    onSave: (image: Blob) => void;
    onClose: () => void;
}

const ChangeImageModal: FC<IChangeImageModalProps> = ({
    isOpen,
    imageAspectRatio,
    previewWidth = 200,
    title,
    onSave,
    onClose,
}) => {
    const [file, setFile] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const uploadPhotoHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length) {
            setFile(files[0]);
        }
    }, []);

    const clickUploadPhotoHandler = useCallback(() => {
        inputRef.current?.click();
    }, []);

    const saveNewImageHandler = useCallback((data: Blob | null) => {
        if (data) onSave(data);
    }, []);

    const cancelCropImageHandler = useCallback(() => {
        setFile(null);
    }, []);

    const closeModalHandler = useCallback(() => {
        onClose();
        cancelCropImageHandler();
    }, []);
    return (
        <Modal
            isOpen={isOpen}
            centered={true}
            toggle={closeModalHandler}
            size={"lg"}
        >
            <ModalHeader
                tag={"h3"}
                toggle={closeModalHandler}
            >
                {title}
            </ModalHeader>
            <ModalBody>
                {file ? (
                    <ImageCrop
                        aspect={imageAspectRatio}
                        imageSrc={URL.createObjectURL(file)}
                        previewWidth={previewWidth}
                        onSave={saveNewImageHandler}
                        onCancel={cancelCropImageHandler}
                    />
                ) : (
                    <>
                        <input
                            ref={inputRef}
                            hidden={true}
                            type={"file"}
                            accept={"image/jpeg, image/png, image/jpg, image/svg"}
                            onChange={uploadPhotoHandler}
                        />
                        <ButtonMain onClick={clickUploadPhotoHandler}>Загрузить фотографию</ButtonMain>
                    </>
                )}
            </ModalBody>
        </Modal>
    );
};

export default ChangeImageModal;
