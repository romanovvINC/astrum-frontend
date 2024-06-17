import React, { useState } from "react";
import NavCustomizer from "./NavCustomizer";
import TabCustomizer from "./TabCustomizer";

const Themecustomizer = () => {
    const [selected, setSelected] = useState("check-layout");
    const [openCus, setOpenCus] = useState(false);

    const callbackNav = (select, open) => {
        setSelected(select);
        setOpenCus(open);
    };

    return (
        <div
            style={{ zIndex: 11 }}
            className={`customizer-links ${openCus && "open"}`}
        >
            <NavCustomizer
                callbackNav={callbackNav}
                selected={selected}
            />
            <div className={`customizer-contain ${openCus && "open"}`}>
                <TabCustomizer
                    selected={selected}
                    callbackNav={callbackNav}
                />
            </div>
        </div>
    );
};

export default Themecustomizer;
