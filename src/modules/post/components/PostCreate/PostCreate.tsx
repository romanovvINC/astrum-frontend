import React, { ChangeEvent, FC, memo, useCallback, useRef, useState } from "react";
import { Card, CardBody, Col } from "reactstrap";
import TextareaAutosize from "react-textarea-autosize";
import { EmojiClickData } from "emoji-picker-react";
import { ReactComponent as EmojiIcon } from "assets/svg/emoji-icon.svg";
import { ReactComponent as AddFileIcon } from "assets/svg/createPostIcons/add-file-icon.svg";
import { ReactComponent as AddImageIcon } from "assets/svg/createPostIcons/add-image-icon.svg";
import { EmojiSelector } from "Components/EmojiSelector";
import FilePreview from "./FilePreview";
import ImagePreview from "./ImagePreview";
import { isImage } from "Helpers/FileHelpers";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { authSelectors } from "modules/auth";
import { createPostRequest } from "modules/post";
import { v4 } from "uuid";
import { PostImageGrid } from "Components/PostImageGrid";
import { ButtonMain } from "ui/Button";
import { ModalInformation } from "ui/Modal";
import { VerticalDivider } from "ui/VerticalDivider";

import classNames from "classnames";
import s from "./PostCreate.module.scss";

const PostCreate: FC = () => {
    const [errorModalIsOpen, setErrorModalOpen] = useState(false);
    const [files, setFiles] = useState<{ id: string; file: File }[]>([]);
    const [images, setImages] = useState<{ id: string; file: File }[]>([]);
    const [text, setText] = useState("");
    const [emojiSelectorIsOpen, setEmojiSelectorOpen] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const filesInputRef = useRef<HTMLInputElement>(null);
    const { userId } = useAppSelector(authSelectors.getBasicInfo);
    const dispatch = useAppDispatch();

    const changeTextHandler = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    }, []);

    const clickEmojiHandler = useCallback((emoji: EmojiClickData) => {
        const cursor = textareaRef.current?.selectionStart;
        setText(prev => {
            if (cursor) {
                const leftPart = prev.substring(0, cursor);
                const rightPart = prev.substring(cursor);
                return leftPart + emoji.emoji + rightPart;
            } else {
                return prev + emoji.emoji;
            }
        });
    }, []);

    const toggleEmojiSelectorHandler = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setEmojiSelectorOpen(prev => !prev);
    }, []);

    const clickAddFileHandler = useCallback(() => {
        filesInputRef.current?.click();
    }, []);

    const addFileHandler = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            const inputFiles = e.target.files;
            const dt = new DataTransfer();
            filesInputRef.current!.files = dt.files;
            if (inputFiles && (inputFiles.length > 10 || images.length + files.length + inputFiles.length > 10)) {
                setErrorModalOpen(true);
                return;
            }
            const resultImages: { id: string; file: File }[] = [];
            const resultFiles: { id: string; file: File }[] = [];
            if (inputFiles) {
                for (let i = 0; i < inputFiles.length; i++) {
                    const file = inputFiles[i];
                    if (isImage(file)) {
                        resultImages.push({ id: v4(), file });
                    } else {
                        resultFiles.push({ id: v4(), file });
                    }
                }
            }
            setImages(prev => [...prev, ...resultImages]);
            setFiles(prev => [...prev, ...resultFiles]);
        },
        [images, files]
    );

    const deleteFileHandler = useCallback((file: File) => {
        if (isImage(file)) {
            setImages(prev => prev.filter(f => f.file !== file));
        } else {
            setFiles(prev => prev.filter(f => f.file !== file));
        }
    }, []);

    const clickAddImageHandler = useCallback(() => {
        const prevAccept = filesInputRef.current!.accept;
        filesInputRef.current!.accept = "image/*";
        filesInputRef.current?.click();
        filesInputRef.current!.accept = prevAccept;
    }, []);

    const clickCreatePostHandler = () => {
        const filesResult = files.map(f => f.file);
        const imagesResult = images.map(f => f.file);
        dispatch(
            createPostRequest({
                data: {
                    title: "пост",
                    text,
                    isArticle: false,
                    attachments: [...filesResult, ...imagesResult],
                    dateCreated: new Date().toJSON(),
                    from: userId,
                },
                successCallback: null,
            })
        );
        setFiles([]);
        setImages([]);
        setText("");
    };

    const toggleModal = useCallback(() => setErrorModalOpen(prev => !prev), []);

    const closeEmojiSelectorHandler = useCallback(() => setEmojiSelectorOpen(false), []);

    return (
        <Col sm="12">
            <Card>
                <CardBody>
                    <div>
                        <TextareaAutosize
                            ref={textareaRef}
                            className={`form-control ${s.text_input}`}
                            placeholder="Новый пост..."
                            minRows={3}
                            value={text}
                            onChange={changeTextHandler}
                        />
                        <div
                            className={s.emoji_icon__container}
                            onClick={toggleEmojiSelectorHandler}
                        >
                            <EmojiIcon />
                        </div>
                        <EmojiSelector
                            className={classNames(s.emoji_selector, { [s.close]: !emojiSelectorIsOpen })}
                            isOpen={emojiSelectorIsOpen}
                            onSelectEmoji={clickEmojiHandler}
                            onClose={closeEmojiSelectorHandler}
                        />
                    </div>
                    {images.length > 0 && (
                        <PostImageGrid>
                            {images.map(f => (
                                <ImagePreview
                                    key={f.id}
                                    file={f.file}
                                    onClickDelete={deleteFileHandler}
                                />
                            ))}
                        </PostImageGrid>
                    )}
                    {files.length > 0 && (
                        <div className={s.files_preview__container}>
                            {files.map(f => (
                                <FilePreview
                                    key={f.id}
                                    file={f.file}
                                    onClickDelete={deleteFileHandler}
                                />
                            ))}
                        </div>
                    )}
                    <div className={s.actions__container}>
                        <input
                            ref={filesInputRef}
                            type={"file"}
                            multiple={true}
                            hidden={true}
                            onChange={addFileHandler}
                        />
                        <div className={s.upload_files__container}>
                            <AddFileIcon
                                className={s.icon}
                                onClick={clickAddFileHandler}
                            />
                            <VerticalDivider />
                            <AddImageIcon
                                className={s.icon}
                                onClick={clickAddImageHandler}
                            />
                        </div>
                        <ButtonMain onClick={clickCreatePostHandler}>Опубликовать</ButtonMain>
                    </div>
                </CardBody>
            </Card>
            <ModalInformation
                isOpen={errorModalIsOpen}
                toggle={toggleModal}
                headerText={"Ошибка"}
                text={"Пост не может содержать больше 10 файлов"}
                buttonText={"Закрыть"}
            />
        </Col>
    );
};

export default memo(PostCreate);
