import { FC } from "react";
import { Modal, ModalBody, Spinner } from "reactstrap";
import s from "./ModalLoading.module.css";

interface IModalLoadingProps {
    isOpen: boolean;
}

const ModalLoading: FC<IModalLoadingProps> = ({ isOpen }) => {
    return (
        <Modal
            isOpen={isOpen}
            centered={true}
        >
            <ModalBody className={s.modal_body}>
                <Spinner />
            </ModalBody>
        </Modal>
    );
};

export default ModalLoading;
