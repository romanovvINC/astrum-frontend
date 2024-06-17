import React from "react";
import { Container, Modal, ModalBody, ModalHeader, ModalFooter, Row, Button } from "reactstrap";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Configuration, CopyText, Cancel } from "../../Constant";
import { ConfigDB } from "../../Config/Theme-Config";

const ConfigurationClass = ({ toggle, modal }) => {
    const configDB = ConfigDB.data;
    return (
        <Modal
            isOpen={modal}
            toggle={toggle}
            className="modal-body"
            centered={true}
        >
            <ModalHeader toggle={toggle}>{Configuration}</ModalHeader>
            <ModalBody>
                <Container
                    fluid={true}
                    className="bd-example-row"
                >
                    <Row>
                        <p>To replace our design with your desired theme. Please do configuration as mention</p>
                        <p>
                            <b> {"Path : data > customizer > config.jsx "}</b>
                        </p>
                    </Row>
                    <pre>
                        <code>
                            <div>
                                {" "}
                                {"export class ConfigDB "} {"{"}
                            </div>
                            <div>
                                {" "}
                                {"static data"} = {"{"}
                            </div>
                            <div>
                                {" "}
                                {"settings"}: {"{"}
                            </div>
                            <div>
                                {" "}
                                {"layout_type"}: {configDB.settings.layout_type},
                            </div>

                            <div>
                                {" "}
                                {"sidebar"}: {"{"}
                            </div>
                            <div>
                                {" "}
                                {"type"}: {configDB.settings.sidebar.type},
                            </div>
                            <div> {"}"},</div>
                            <div>
                                {" "}
                                {"sidebar_setting"}: {configDB.settings.sidebar_setting},{" "}
                            </div>
                            <div> {"}"},</div>
                            <div>
                                {" "}
                                {"color"}: {"{"}
                            </div>
                            <div>
                                {" "}
                                {"primary_color"}: {configDB.color.primary_color},{" "}
                            </div>
                            <div>
                                {" "}
                                {"secondary_color"}: {configDB.color.secondary_color},{" "}
                            </div>
                            <div>
                                {" "}
                                {"mix_background_layout"}: {configDB.color.mix_background_layout},{" "}
                            </div>
                            <div> {"}"},</div>
                            <div>
                                {" "}
                                {"router_animation"}: {'"fadeIn"'}
                            </div>
                            <div> {"}"}</div>
                            <div> {"}"}</div>
                        </code>
                    </pre>
                </Container>
            </ModalBody>
            <ModalFooter>
                <CopyToClipboard text={JSON.stringify(configDB)}>
                    <Button
                        color="primary"
                        className="notification"
                        onClick={() =>
                            toast.success("Code Copied to clipboard !", {
                                position: toast.POSITION.BOTTOM_RIGHT,
                            })
                        }
                    >
                        {CopyText}
                    </Button>
                </CopyToClipboard>
                <Button
                    color={"secondary"}
                    onClick={toggle}
                >
                    {Cancel}
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ConfigurationClass;
