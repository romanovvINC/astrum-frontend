import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import { AppealStatus } from "../../Redux/Reducers/AppealReducer/Types/Appeal";
import { useAppDispatch } from "../../Redux/hooks";
import { editAppealRequest } from "../../Redux/Reducers/AppealReducer/AppealReducer";
import cloneDeep from "lodash/cloneDeep";
import { getFormattedDateString } from "../../Helpers/GetPublishDateString";
import { ButtonMain } from "../../ui/Button";
import s from "../../MyPages/AppealPage/AppealPage.module.css";

const AppealInfoModal = (props: any) => {
    const { register } = useForm();
    const style = { display: "flex", gap: 10, alignItems: "center" };
    const [content, setContent] = useState("");
    const onChange = (newContent: string) => {
        setContent(newContent);
    };
    const [openComment, setOpenComment] = useState(false);
    const [status, setStatus] = useState(AppealStatus.Requested);
    const comment = (newStatus: AppealStatus) => {
        setStatus(newStatus);
        setOpenComment(!openComment);
    };
    const data = props.data;
    const statusString = appealStatusString(data.status);
    const dispatch = useAppDispatch();
    const answer = () => {
        let updated = cloneDeep(data);
        updated.answer = content;
        updated.appealStatus = status;
        dispatch(editAppealRequest(updated));
        props.toggler();
    };

    function appealStatusString(status: any) {
        switch (status) {
            case "REQUESTED":
            case 0:
                return "Создано";
            case "APPLIED":
            case 1:
                return "Принято";
            case "COMPLETED":
            case 2:
                return "Завершёно";
            case "REJECTED":
            case 3:
                return "Отказано";
        }
    }

    return (
        <Modal
            isOpen={props.isOpen}
            toggle={props.toggler}
            size="lg"
            centered
            className={`modal-dialog modal-lg modal-dialog-centered appealModal ${s.appealModal}`}
        >
            <ModalHeader toggle={props.toggler}>{props.title}</ModalHeader>
            <ModalBody className={props.bodyClass}>
                <Row>
                    <div style={style}>
                        <h5 style={{ margin: 0 }}>{"Тема: "}</h5>
                        <span>{data.title}</span>
                    </div>
                </Row>
                <Row>
                    <div style={style}>
                        <h5 style={{ margin: 0 }}>{"Отправитель: "}</h5>
                        <span>{data.fromName}</span>
                    </div>
                </Row>
                <Row>
                    <div style={style}>
                        <h5 style={{ margin: 0 }}>Получатель:</h5>
                        <span>{data.toName}</span>
                    </div>
                </Row>
                <Row>
                    <div style={style}>
                        <h5 style={{ margin: 0 }}>Дата:</h5>
                        <span>{getFormattedDateString(new Date(data.dateCreated))}</span>
                    </div>
                </Row>
                <Row>
                    <div style={style}>
                        <h5 style={{ margin: 0 }}>Статус:</h5>
                        <span>{statusString}</span>
                    </div>
                </Row>
                <Row>
                    <h5>Текст заявки:</h5>
                    <p>{data.request}</p>
                </Row>
                {data.status !== "REQUESTED" && (
                    <Row>
                        <h5>Ответ:</h5>
                        <p>{data.answer}</p>
                    </Row>
                )}
                {openComment && (
                    <Form>
                        <FormGroup className="row needs-validation">
                            <Label>Комментарий:</Label>
                            <textarea
                                className="form-control"
                                rows={3}
                                value={content}
                                onChange={e => onChange(e.target.value)}
                            />
                        </FormGroup>
                    </Form>
                )}
            </ModalBody>
            {props.isActive && data.status === "REQUESTED" && (
                <ModalFooter style={{ display: "flex", gap: 5, justifyContent: "right" }}>
                    {openComment && (
                        <>
                            <ButtonMain
                                variant={"invert"}
                                type={"reset"}
                                onClick={() => comment(status)}
                            >
                                Отмена
                            </ButtonMain>
                            <ButtonMain onClick={answer}>Подтвердить</ButtonMain>
                        </>
                    )}
                    {!openComment && (
                        <>
                            <ButtonMain
                                variant={"invert"}
                                type={"reset"}
                                onClick={() => comment(AppealStatus.Rejected)}
                            >
                                Отклонить
                            </ButtonMain>
                            <ButtonMain onClick={() => comment(AppealStatus.Applied)}>Принять</ButtonMain>
                        </>
                    )}
                </ModalFooter>
            )}
        </Modal>
    );
};
export default AppealInfoModal;
