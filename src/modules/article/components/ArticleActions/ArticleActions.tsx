import React, { FC, memo, useCallback, useState } from "react";
import { articleSelectors, deleteArticleRequest } from "modules/article";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { useNavigate } from "react-router-dom";
import { ButtonMain } from "ui/Button";
import { ModalConfirm } from "ui/Modal";

import s from "./ArticleActions.module.scss";

interface IArticleActions {
    enableEditButton?: boolean;
    enableDeleteButton?: boolean;
}

const ArticleActions: FC<IArticleActions> = ({ enableEditButton = true, enableDeleteButton = true }) => {
    const [confirmModalIsOpen, setConfirmModalOpen] = useState(false);
    const {
        pending,
        articleInfo: { id, name },
    } = useAppSelector(articleSelectors.getArticleState);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const clickEditArticleHandler = useCallback(() => navigate("edit"), []);

    const clickDeleteArticleHandler = useCallback(() => setConfirmModalOpen(true), []);

    const deleteArticleHandler = useCallback(() => {
        setConfirmModalOpen(false);
        dispatch(deleteArticleRequest({ id, successCallback: () => navigate("/articles") }));
    }, [id]);

    const cancelDeleteArticleHandler = useCallback(() => setConfirmModalOpen(false), []);

    return (
        <div className={s.actions}>
            {enableEditButton && (
                <ButtonMain
                    variant={"secondary"}
                    onClick={clickEditArticleHandler}
                >
                    Редактировать
                </ButtonMain>
            )}
            {enableDeleteButton && (
                <ButtonMain
                    variant={"secondary"}
                    onClick={clickDeleteArticleHandler}
                    disabled={pending}
                >
                    Удалить
                </ButtonMain>
            )}
            <ModalConfirm
                isOpen={confirmModalIsOpen}
                text={`Вы уверены, что хотите удалить статью "${name}"?`}
                onConfirm={deleteArticleHandler}
                onCancel={cancelDeleteArticleHandler}
            />
        </div>
    );
};

export default memo(ArticleActions);
