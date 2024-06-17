import React, { useCallback, useState } from "react";
import { X } from "react-feather";
import { Button, TabContent, TabPane } from "reactstrap";
import { Configuration } from "../../Constant";
import ColorPicker from "./Tabs/ColorPicker/index";
import ConfigurationClass from "./ConfigurationClass";

const TabCustomizer = ({ selected, callbackNav }) => {
    const [modal, setModal] = useState(false);
    const toggle = useCallback(() => {
        setModal(!modal);
    }, [modal]);
    return (
        <TabContent activeTab={selected}>
            <div className="customizer-header">
                <X
                    className="icon-close icon-close"
                    onClick={() => callbackNav(false)}
                />
                <h5>Customizer</h5>
                <p className={"mb-0"}>Customize &amp; Preview Real Time</p>
                <Button
                    color={"primary"}
                    className={"plus-popup mt-2"}
                    onClick={() => toggle(!modal)}
                >
                    {Configuration}
                </Button>
                <ConfigurationClass
                    modal={modal}
                    toggle={toggle}
                />
            </div>
            <div className="customizer-body custom-scrollbar tab-content">
                <TabPane tabId="color-picker">
                    <ColorPicker />
                </TabPane>
            </div>
        </TabContent>
    );
};

export default TabCustomizer;
