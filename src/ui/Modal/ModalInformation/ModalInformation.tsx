import { FC } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { ButtonMain } from "../../Button";
import s from "./ModalInformation.module.scss";

interface IModalInformationProps {
    isOpen: boolean;
    toggle: () => void;
    headerText: string;
    text: string;
    buttonText: string;
}

const ModalInformation: FC<IModalInformationProps> = ({ isOpen, toggle, headerText, text, buttonText }) => {
    return (
        <Modal
            className={s.modal}
            isOpen={isOpen}
            toggle={toggle}
            centered={true}
        >
            <ModalHeader
                tag={"h3"}
                toggle={toggle}
            >
                {headerText}
            </ModalHeader>
            <ModalBody>
                <p>{text}</p>
                <div className={s.actions}>
                    <ButtonMain onClick={toggle}>{buttonText}</ButtonMain>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default ModalInformation;
