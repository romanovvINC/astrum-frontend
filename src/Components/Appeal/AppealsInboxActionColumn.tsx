import React, { Fragment, useState } from "react";
import AppealInfoModal from "./AppealInfoModal";
import { ButtonMain } from "../../ui/Button";

const style2 = {
    width: 70,
    fontSize: 13,
    padding: 3,
};

const AppealsInboxActionColumn = () => {
    const [openInfoModal, setOpenInfoModal] = useState(false);
    const showInfo = () => {
        setOpenInfoModal(!openInfoModal);
    };
    const [openReplyModal, setOpenReplyModal] = useState(false);
    const reply = () => {
        setOpenReplyModal(!openReplyModal);
    };
    return (
        <Fragment>
            <div>
                {/*<span>*/}
                {/*    <Btn attrBtn={{*/}
                {/*        style: style2,*/}
                {/*        color: "primary",*/}
                {/*        className: "btn btn-xs ms-2",*/}
                {/*        type: "button",*/}
                {/*        onClick: () => reply()}}>*/}
                {/*        Ответить{" "}*/}
                {/*    </Btn>*/}
                {/*</span>*/}
                {/*<AppealReplyModal isOpen={openReplyModal} title={"Ответ"} toggler={reply}></AppealReplyModal>*/}
                <span>
                    {/* TODO: added style2 to button, color: danger */}
                    <ButtonMain
                        className={"btn btn-xs ms-2"}
                        variant={"invert"}
                        type={"button"}
                        onClick={showInfo}
                    >
                        Подробонее
                    </ButtonMain>
                </span>
                <AppealInfoModal
                    isOpen={openInfoModal}
                    title={"Информация о заявке"}
                    toggler={showInfo}
                />
            </div>
        </Fragment>
    );
};
export default AppealsInboxActionColumn;
