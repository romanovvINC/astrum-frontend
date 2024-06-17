import React, { useContext, useState, useEffect } from "react";
import { Input, Button } from "reactstrap";
import ConfigDB from "../../../../Config/Theme-Config";
import { Apply, UnlimitedColor } from "../../../../Constant";
import CustomizerContext from "../../../../_helper/customizer/index";

const ColorsComponent = () => {
    const { addColor } = useContext(CustomizerContext);
    const default_color = localStorage.getItem("default_color") || ConfigDB.data.color.primary_color;
    const secondary_color = localStorage.getItem("secondary_color") || ConfigDB.data.color.secondary_color;
    const [colorBackground1, setColorBackground1] = useState(default_color);
    const [colorBackground2, setColorBackground2] = useState(secondary_color);

    useEffect(() => {
        document.documentElement.style.setProperty("--theme-default", colorBackground1);
        document.documentElement.style.setProperty("--theme-secondary", colorBackground2);
    }, [colorBackground1, colorBackground2]);

    const handleUnlimatedColor1Change = e => {
        const { value } = e.target;
        setColorBackground1(value);
    };
    const handleUnlimatedColor2Change = e => {
        const { value } = e.target;
        setColorBackground2(value);
    };
    const OnUnlimatedColorClick = () => {
        window.location.reload();
        addColor(colorBackground1, colorBackground2);
        document.documentElement.style.setProperty("--theme-default", colorBackground1);
        document.documentElement.style.setProperty("--theme-secondary", colorBackground2);
    };

    return (
        <>
            <h6>{UnlimitedColor}</h6>
            <ul className={"simple-list flex-row layout-grid unlimited-color-layout"}>
                <Input
                    type="color"
                    name="Color-Background1"
                    value={colorBackground1}
                    onChange={e => handleUnlimatedColor1Change(e)}
                />
                <Input
                    type="color"
                    name="Color-Background2"
                    value={colorBackground2}
                    onChange={e => handleUnlimatedColor2Change(e)}
                />
                <Button
                    color={"primary"}
                    className={"color-apply-btn color-apply-btn"}
                    onClick={OnUnlimatedColorClick}
                >
                    {Apply}
                </Button>
            </ul>
        </>
    );
};

export default ColorsComponent;
