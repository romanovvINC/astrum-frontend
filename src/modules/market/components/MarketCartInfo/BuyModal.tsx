import React from "react";
import { Form, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from "reactstrap";
import { CartConfirmTableHeader } from "Constant";
import { ButtonMain } from "ui/Button";
import { Image } from "ui/Image";

import s from "./MarketCartInfo.module.scss";

interface IBuyModalProps {
    bodyClass?: string;
    isOpen: boolean;
    title: string;
    data: any;
    total: number;
    comment: string;
    toggler: () => void;
    onChangeComment: (newComment: string) => void;
    onSend: () => void;
}

const BuyModal = (props: IBuyModalProps) => {
    return (
        <Modal
            isOpen={props.isOpen}
            toggle={props.toggler}
            size="lg"
            centered
            className={`modal-dialog modal-lg modal-dialog-centered ${s.marketModal}`}
        >
            <ModalHeader toggle={props.toggler}>{props.title}</ModalHeader>
            <ModalBody className={props.bodyClass}>
                <Form className="theme-form">
                    <Row>
                        <Table className="table-bordered">
                            <thead>
                                <tr>
                                    {CartConfirmTableHeader.map((items, i) => (
                                        <th key={i}>{items}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody style={{ borderTop: "none" }}>
                                {props.data.products.map((item: any) => {
                                    let imagesrc = "";
                                    if (item.product.coverUrl === undefined || item.product.coverUrl === null)
                                        imagesrc =
                                            "https://www.casavanity.com/modules/tea_lookbook/views/img/images/7dd432c8b0a1a7851d81077428351c08a437bd8b_watch.jpg";
                                    else imagesrc = item.product.coverUrl;
                                    return (
                                        <tr key={item.id}>
                                            <td>
                                                <Image
                                                    className={"img-fluid img-40"}
                                                    src={imagesrc}
                                                    alt={"#"}
                                                />
                                            </td>
                                            <td>
                                                <div className="product-name">
                                                    <h6>{item.product.name}</h6>
                                                </div>
                                            </td>
                                            <td>{item.product.price}</td>
                                            <td>{item.amount}</td>
                                            <td>{item.product.price * item.amount}</td>
                                        </tr>
                                    );
                                })}
                                <tr>
                                    <td colSpan={3}></td>
                                    <td className="total-amount">
                                        <h6 className={"m0 text-end"}>
                                            <span className="f-w-600">Итоговая цена :</span>
                                        </h6>
                                    </td>
                                    <td>
                                        <span>{props.total}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Row>
                    <Row>
                        <Label>Комментарий к заказу</Label>
                        <textarea
                            className="form-control"
                            rows={3}
                            value={props.comment}
                            onChange={e => props.onChangeComment(e.target.value)}
                            style={{ height: "80px" }}
                        />
                    </Row>
                </Form>
            </ModalBody>
            <ModalFooter>
                <ButtonMain onClick={props.onSend}>Подтвердить</ButtonMain>
            </ModalFooter>
        </Modal>
    );
};
export default BuyModal;
