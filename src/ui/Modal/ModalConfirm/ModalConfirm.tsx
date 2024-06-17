import { FC } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { ButtonMain } from "../../Button";
import s from "./ModalConfirm.module.scss";

interface IModalConfirmProps {
    isOpen: boolean;
    text: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ModalConfirm: FC<IModalConfirmProps> = ({
    isOpen,
    text,
    confirmButtonText = "Да",
    cancelButtonText = "Отмена",
    onConfirm,
    onCancel,
}) => {
    return (
        <Modal
            className={s.modal}
            isOpen={isOpen}
            toggle={onCancel}
            centered={true}
        >
            <ModalHeader
                tag={"h3"}
                toggle={onCancel}
            >
                Подтвердите действие
            </ModalHeader>
            <ModalBody>
                <p>{text}</p>
                <div className={s.actions}>
                    <ButtonMain
                        onClick={onCancel}
                        variant={"invert"}
                    >
                        {cancelButtonText}
                    </ButtonMain>
                    <ButtonMain onClick={onConfirm}>{confirmButtonText}</ButtonMain>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default ModalConfirm;
