import { Col, Input, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { FC, useState, useCallback } from "react";
import { useDispatch } from "react-redux";

import { ButtonMain } from "ui/Button";

import { addCalendarRequest } from "modules/calendar";

import s from "./AddCalendarPopup.module.css";

interface AddCalendarPopupProps {
    addCalendarOpen: boolean;
    setAddCalendarOpen: (isOpen: boolean) => void;
}

const AddCalendarPopup: FC<AddCalendarPopupProps> = ({addCalendarOpen, setAddCalendarOpen}) => {
    const [title, setTilte] = useState("");
    const dispatch = useDispatch();

    const onCancel = () => {
        setAddCalendarOpen(false);
    };

    const cancelHandler = () => {
        setAddCalendarOpen(false)
        console.log('1');
      
        setTilte("");
    };

    const addCalendar = useCallback((title: string) => {
        setAddCalendarOpen(false);
        dispatch(addCalendarRequest({ summary: title }));
    }, []);

    const submitHandler = () => {
        addCalendar(title);
        setTilte("");
    };

    return (
        <Modal
            isOpen={addCalendarOpen}
            centered={true}
            toggle={cancelHandler}
        >
            <ModalHeader
                tag="h3"
                toggle={onCancel}
            >
                Введите название календаря
            </ModalHeader>
            <ModalBody>
                <Row>
                    <Col xl={12}>
                        <Input
                            value={title}
                            type='text'
                            placeholder={"название календаря"}
                            onChange={e => setTilte(e.target.value)}
                        />
                    </Col>
                    <Col xl={12}>
                        <div className={s.buttons_container}>
                            <ButtonMain
                                onClick={cancelHandler}
                                variant={"invert"}
                            >
                                Отмена
                            </ButtonMain>
                            <ButtonMain onClick={submitHandler}>Добавить</ButtonMain>
                        </div>
                    </Col>
                </Row>
            </ModalBody>
        </Modal>
    );
};

export default AddCalendarPopup;


