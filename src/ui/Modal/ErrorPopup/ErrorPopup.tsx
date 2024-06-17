import { FC } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import ButtonMain from "../../Button/ButtonMain/ButtonMain";

interface IWaitPopup {
    isOpen: boolean;
    error: string | null;
    onClose: () => void;
}

const ErrorPopup: FC<IWaitPopup> = ({ isOpen, error, onClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            toggle={onClose}
            centered={true}
        >
            <ModalHeader
                tag={"h2"}
                toggle={onClose}
            >
                Ошибка
            </ModalHeader>
            <ModalBody>
                <h4>{error}</h4>
                <ButtonMain onClick={onClose}>Закрыть</ButtonMain>
            </ModalBody>
        </Modal>
    );
};

export default ErrorPopup;
