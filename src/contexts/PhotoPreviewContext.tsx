import { createContext, FC, useCallback, useState } from "react";
import { PostAuthorInfo } from "models/post/PostAuthorInfo";
import { PhotoPreviewModal } from "Components/PhotoPreviewModal";

export type PhotoPreviewData = {
    currentImage: string;
    images: string[];
    user: PostAuthorInfo;
    dateCreated: Date | null;
};

type PhotoPreviewContextState = {
    openPhotoPreviewModal: () => void;
    closePhotoPreviewModal: () => void;
    setPhotoPreviewModalData: (data: PhotoPreviewData) => void;
};

export const PhotoPreviewContext = createContext<PhotoPreviewContextState>({
    //eslint-disable-next-line
    openPhotoPreviewModal: () => {},
    //eslint-disable-next-line
    closePhotoPreviewModal: () => {},
    //eslint-disable-next-line
    setPhotoPreviewModalData: data => {},
});

interface IPhotoPreviewProvider {
    children: JSX.Element;
}

const PhotoPreviewProvider: FC<IPhotoPreviewProvider> = ({ children }) => {
    const [modalIsOpen, setModalOpen] = useState(false);
    const [modalData, setPhotoPreviewModalData] = useState<PhotoPreviewData>({
        currentImage: "",
        images: [],
        user: { userId: "", nameWithSurname: "", avatarUrl: "", username: "" },
        dateCreated: null,
    });

    const openPhotoPreviewModal = useCallback(() => setModalOpen(true), []);

    const closePhotoPreviewModal = useCallback(() => setModalOpen(false), []);

    const toggleModalHandler = useCallback(() => setModalOpen(prev => !prev), []);

    return (
        <PhotoPreviewContext.Provider
            value={{
                openPhotoPreviewModal,
                closePhotoPreviewModal,
                setPhotoPreviewModalData,
            }}
        >
            {children}
            <PhotoPreviewModal
                isOpen={modalIsOpen}
                defaultImageUrl={modalData.currentImage}
                images={modalData.images}
                publishDate={modalData.dateCreated}
                user={modalData.user}
                onToggle={toggleModalHandler}
            />
        </PhotoPreviewContext.Provider>
    );
};

export default PhotoPreviewProvider;
