import React, { FC } from "react";
import { Col, Container, Modal, ModalBody, ModalHeader } from "reactstrap";
import { ProjectCreateInfo } from "models/product/ProjectCreateInfo";
import { ProjectEditInfo } from "models/product/ProjectEditInfo";
import ProjectCreateForm from "./ProjectCreateForm";
import { isProjectCreateInfo } from "modules/product/helpers/typeHelpers";
import { ButtonBack } from "ui/Button";

interface IProjectCreateFormFullScreenModalProps {
    id?: string;
    needSendRequestToGetProject?: boolean;
    isEdit?: boolean;
    isOpen: boolean;
    existProjectNames?: string[];
    toggle: () => void;
    onSave: (project: ProjectCreateInfo | ProjectEditInfo) => void;
}

const ProjectCreateFormFullScreenModal: FC<IProjectCreateFormFullScreenModalProps> = ({
    id = "",
    needSendRequestToGetProject = true,
    isEdit = false,
    isOpen,
    existProjectNames,
    toggle,
    onSave,
}) => {
    const word = isEdit ? "Редактирование" : "Создание";

    return (
        <Modal
            isOpen={isOpen}
            toggle={toggle}
            fullscreen={true}
            style={{ color: "#2c323f" }}
        >
            <ModalHeader
                tag="h2"
                toggle={toggle}
            >
                Создание проекта
            </ModalHeader>
            <ModalBody style={{ backgroundColor: "#f4f6fd" }}>
                <Container fluid={false}>
                    <Col>
                        <ButtonBack
                            breadcrumbsPaths={["Проекты", `${word} проекта`]}
                            onClick={toggle}
                        />
                    </Col>
                    <Col>
                        <ProjectCreateForm
                            id={id}
                            needSendRequestToGetProject={needSendRequestToGetProject}
                            isEdit={isEdit}
                            existProjectNames={existProjectNames}
                            onSave={onSave}
                        />
                    </Col>
                </Container>
            </ModalBody>
        </Modal>
    );
};

export default ProjectCreateFormFullScreenModal;
