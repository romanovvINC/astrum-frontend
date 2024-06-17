import React, { FC, useCallback, useMemo, useState } from "react";
import { Container } from "reactstrap";
import { DebtCreateModal, DebtListInfo } from "modules/debt";
import { HeaderWithTabs } from "ui/HeaderWithTabs";

const DebtsPage: FC = () => {
    const tabsData = useMemo(
        () => [
            { title: "Долги", value: "debts" },
            { title: "Реквизиты", value: "requisites" },
        ],
        []
    );
    const [activeTab, setActiveTab] = useState(tabsData[0].value);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const toggleModal = useCallback(() => setModalIsOpen(prev => !prev), []);

    return (
        <Container fluid={false}>
            <HeaderWithTabs
                tabsData={tabsData}
                activeTab={activeTab}
                createButtonTitle={"Создать запись"}
                onClickTab={setActiveTab}
                onButtonClick={toggleModal}
            />
            <DebtListInfo isRequisites={activeTab === tabsData[1].value} />
            <DebtCreateModal
                isOpen={modalIsOpen}
                toggle={toggleModal}
            />
        </Container>
    );
};

export default DebtsPage;
