import { FC, useEffect, useMemo, useState } from "react";
import { Media, Modal, ModalBody } from "reactstrap";
import PostHeader from "modules/post/components/PostCard/PostHeader/PostHeader";
import { getPublishDateString } from "Helpers/GetPublishDateString";
import { ReactComponent as CloseIcon } from "assets/svg/cross-gray-icon.svg";
import { ReactComponent as PrevIcon } from "assets/angle-left.svg";
import { ReactComponent as NextIcon } from "assets/angle-right.svg";
import { PostAuthorInfo } from "models/post/PostAuthorInfo";

import classNames from "classnames";
import s from "./PhotoPreviewModal.module.scss";

interface IPhotoPreviewModalProps {
    isOpen: boolean;
    defaultImageUrl: string;
    images: string[];
    publishDate: Date | null;
    user: PostAuthorInfo;
    onToggle: () => void;
}

export const PhotoPreviewModal: FC<IPhotoPreviewModalProps> = ({
    isOpen,
    defaultImageUrl,
    images,
    publishDate,
    user,
    onToggle,
}) => {
    const [currentImage, setCurrentImage] = useState(defaultImageUrl);
    const closeButton = useMemo(
        () => (
            <div
                className={s.close_icon__container}
                onClick={onToggle}
            >
                <CloseIcon className={s.close_icon} />
            </div>
        ),
        []
    );

    useEffect(() => {
        setCurrentImage(defaultImageUrl);
    }, [defaultImageUrl]);

    const goToNextImageHandler = () => {
        setCurrentImage(prev => {
            const index = images.findIndex(i => i === prev);
            if (index === images.length - 1) return images[0];
            return images[index + 1];
        });
    };

    const goToPrevImageHandler = () => {
        setCurrentImage(prev => {
            const index = images.findIndex(i => i === prev);
            if (index === 0) return images[images.length - 1];
            return images[index - 1];
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            toggle={onToggle}
            size={"xl"}
            centered={true}
            external={closeButton}
        >
            <ModalBody className={s.modal_body}>
                <div className={s.image_container}>
                    <Media
                        className={s.image}
                        src={currentImage}
                    />
                </div>
                <div>
                    <PostHeader
                        userId={user.userId}
                        username={user.username}
                        nameWithSurname={user.nameWithSurname}
                        avatarUrl={user.avatarUrl}
                        dateCreated={publishDate}
                    />
                </div>
            </ModalBody>
            {images.length > 1 && (
                <>
                    <div
                        className={classNames(s.action__container, s.prev)}
                        onClick={goToPrevImageHandler}
                    >
                        <PrevIcon className={s.action_icon} />
                    </div>
                    <div
                        className={classNames(s.action__container, s.next)}
                        onClick={goToNextImageHandler}
                    >
                        <NextIcon className={s.action_icon} />
                    </div>
                </>
            )}
        </Modal>
    );
};
