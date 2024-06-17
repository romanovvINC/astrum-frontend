import React, { FC, useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { CreatePostCommentInfo } from "models/post/PostCommentInfo";
import { authSelectors } from "modules/auth";
import { createPostCommentRequest } from "modules/post";
import { UserAvatar } from "Components/UserAvatar";
import { ButtonMain } from "ui/Button";
import { SendCommentIcon } from "ui/icons";
import { InputMain } from "ui/Input";

import s from "./CommentForm.module.scss";

interface ICommentFormProps {
    postId: string;
    replyingCommentId: string | null;
}

const CommentForm: FC<ICommentFormProps> = ({ postId, replyingCommentId }) => {
    const { userId, avatarUrl } = useAppSelector(authSelectors.getBasicInfo);
    const dispatch = useAppDispatch();
    const {
        control,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm<CreatePostCommentInfo>({
        values: {
            replyCommentId: replyingCommentId,
            postId,
            text: "",
            from: userId,
        },
    });

    const submitHandler = useCallback((data: CreatePostCommentInfo) => {
        dispatch(
            createPostCommentRequest({
                data,
                successCallback: () => reset(),
            })
        );
    }, []);

    return (
        <form
            className={s.comment_form}
            onSubmit={handleSubmit(submitHandler)}
        >
            <UserAvatar
                width={50}
                avatarUrl={avatarUrl}
            />
            <Controller
                control={control}
                name={"text"}
                rules={{
                    validate: value => value.length > 1,
                }}
                render={({ field: { value, onChange } }) => (
                    <InputMain
                        type="textarea"
                        placeholder="Написать комментарий..."
                        value={value}
                        invalid={!!errors.text}
                        rows={2}
                        onChange={onChange}
                    />
                )}
            />
            <ButtonMain
                variant={"secondary"}
                className={s.send_button}
            >
                <SendCommentIcon />
            </ButtonMain>
        </form>
    );
};

export default CommentForm;
