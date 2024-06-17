import React, { FC, useContext } from "react";
import { UserPost } from "models/post/UserPost";
import { PhotoPreviewContext } from "contexts/PhotoPreviewContext";
import { PostCard } from "modules/post/components/PostCard";
import { PostImageGrid } from "Components/PostImageGrid";
import FilePreview from "./FilePreview";

import s from "./UserPostItem.module.scss";

interface IUserPostItemProps extends UserPost {
    onClickDelete: (id: string) => void;
}

const UserPostItem: FC<IUserPostItemProps> = ({
    id,
    user,
    dateCreated,
    text,
    attachments,
    likes,
    comments,
    likesCount,
    likeId,
    onClickDelete,
}) => {
    const files = attachments.filter(f => f.type.includes("document") || f.type.includes("text"));
    const images = attachments.filter(f => f.type.includes("image"));
    const { setPhotoPreviewModalData, openPhotoPreviewModal } = useContext(PhotoPreviewContext);

    const clickImageHandler = (f: string) => {
        setPhotoPreviewModalData({ currentImage: f, images: images.map(i => i.url), user, dateCreated });
        openPhotoPreviewModal();
    };

    return (
        <PostCard
            id={id}
            publishDate={dateCreated}
            user={user}
            comments={comments}
            likes={likes}
            onClickDelete={onClickDelete}
            likesCount={likesCount}
            likeId={likeId}
        >
            <p style={{ textAlign: "left", textIndent: 15, fontSize: 18 }}>{text}</p>
            {images.length > 0 && (
                <PostImageGrid>
                    {images.map((f, i) => (
                        <div
                            key={`${f.url}-${i}`}
                            className={s.image_preview__container}
                            onClick={() => clickImageHandler(f.url)}
                        >
                            <img
                                className={s.image_preview}
                                src={f.url}
                                alt={"post-image"}
                            />
                        </div>
                    ))}
                </PostImageGrid>
            )}
            {files.length > 0 && (
                <div>
                    {files.map((f, i) => (
                        <FilePreview
                            key={i}
                            url={f.url}
                            name={f.name}
                        />
                    ))}
                </div>
            )}
        </PostCard>
    );
};

export default UserPostItem;
