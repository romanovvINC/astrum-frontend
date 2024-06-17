import React, { useState } from "react";
import AppealInfoModal from "./AppealInfoModal";
import { ButtonMain } from "../../ui/Button";

const style2 = {
    width: 70,
    fontSize: 13,
    padding: 3,
};

const MyAppealsActionColumn = (props: any) => {
    const [openModal, setOpenModal] = useState(false);
    const showInfo = () => {
        setOpenModal(!openModal);
    };

    return (
        <div>
            <span>
                {/* TODO: added style2 to button */}
                <ButtonMain
                    className={"btn-sm"}
                    type={"button"}
                    onClick={showInfo}
                >
                    Подробнее
                </ButtonMain>
            </span>
            <AppealInfoModal
                isOpen={openModal}
                title={"Информация о заявке"}
                toggler={showInfo}
                data={props.data}
                isActive={props.isActive}
            />
        </div>
    );
};
export default MyAppealsActionColumn;
