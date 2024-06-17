import React, { FC, memo, useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { useNavigate } from "react-router-dom";
import { deleteProjectRequest, productSelectors } from "modules/product";
import { ButtonMain } from "ui/Button";
import { ModalConfirm } from "ui/Modal";

import s from "./ProductActions.module.scss";

interface IProductActions {
    enableEditButton?: boolean;
    enableDeleteButton?: boolean;
}

const ProjectActions: FC<IProductActions> = ({ enableEditButton = true, enableDeleteButton = true }) => {
    const [confirmModalIsOpen, setConfirmModalOpen] = useState(false);
    const {
        pending,
        projectInfo: { id, name, isDeletable },
    } = useAppSelector(productSelectors.getProductState);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const clickEditHandler = useCallback(() => navigate("edit"), []);

    const clickDeleteHandler = useCallback(() => setConfirmModalOpen(true), []);

    const deleteHandler = useCallback(() => {
        setConfirmModalOpen(false);
        dispatch(deleteProjectRequest({ id, successCallback: () => navigate("/products") }));
    }, [id]);

    const cancelDeleteHandler = useCallback(() => setConfirmModalOpen(false), []);

    return (
        <div className={s.actions}>
            {enableEditButton && (
                <ButtonMain
                    variant={"secondary"}
                    onClick={clickEditHandler}
                >
                    Редактировать
                </ButtonMain>
            )}
            {enableDeleteButton && isDeletable && (
                <ButtonMain
                    variant={"secondary"}
                    onClick={clickDeleteHandler}
                    disabled={pending}
                >
                    Удалить
                </ButtonMain>
            )}
            <ModalConfirm
                isOpen={confirmModalIsOpen}
                text={`Вы уверены, что хотите удалить проект "${name}"?`}
                onConfirm={deleteHandler}
                onCancel={cancelDeleteHandler}
            />
        </div>
    );
};

export default memo(ProjectActions);
