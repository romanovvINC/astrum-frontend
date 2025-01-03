import React, { useEffect, useContext, useState } from "react";
import ConfigDB from "../../../../Config/Theme-Config";
import { MixLayout } from "../../../../Constant";
import CustomizerContext from "../../../../_helper/customizer/index";
import CommenUL from "./CommenUL";

const MixLayoutComponent = () => {
    const { addMixBackgroundLayout, setMixLayout } = useContext(CustomizerContext);
    const mixLayout = localStorage.getItem("mix_background_layout") || ConfigDB.data.color.mix_background_layout;
    const [isActive, setIsActive] = useState(1);
    useEffect(() => {
        if (mixLayout !== "light-only") {
            setMixLayout(false);
        } else {
            setMixLayout(true);
        }
        ConfigDB.data.color.mix_background_layout = mixLayout;
        document.body.classList.add(mixLayout);
    }, [mixLayout, setMixLayout]);

    const handleCustomizerMix_Background = (value, num) => {
        addMixBackgroundLayout(value);
        if (value === "light-only") {
            document.body.classList.add("light-only");
            document.body.classList.remove("dark-sidebar");
            document.body.classList.remove("dark-only");
            setIsActive(num);
        } else if (value === "dark-sidebar") {
            document.body.classList.remove("light-only");
            document.body.classList.add("dark-sidebar");
            document.body.classList.remove("dark-only");
            setIsActive(num);
        } else if (value === "dark-only") {
            document.body.classList.remove("light-only");
            document.body.classList.remove("dark-sidebar");
            document.body.classList.add("dark-only");
            setIsActive(num);
        }
    };
    return (
        <>
            <h6 className="">{MixLayout}</h6>
            <ul className={"simple-list flex-row layout-grid customizer-mix"}>
                <li
                    className={`color-layout ${isActive === 1 ? "active" : ""}`}
                    data-value={"light-only"}
                    onClick={() => handleCustomizerMix_Background("light-only", 1)}
                >
                    <div className="header bg-light">
                        <CommenUL />
                    </div>
                    <div className="body">
                        <ul className={"simple-list flex-row"}>
                            <li className={"bg-light sidebar"}></li>
                            <li className={"bg-light body"}></li>
                        </ul>
                    </div>
                </li>
                <li
                    className={`color-layout ${isActive === 2 ? "active" : ""}`}
                    data-value={"dark-sidebar"}
                    onClick={() => handleCustomizerMix_Background("dark-sidebar", 2)}
                >
                    <div className="header bg-light">
                        <CommenUL />
                    </div>
                    <div className="body">
                        <ul className={"simple-list flex-row"}>
                            <li className={"bg-dark sidebar"}></li>
                            <li className={"bg-light body"}></li>
                        </ul>
                    </div>
                </li>
                <li
                    className={`color-layout ${isActive === 3 ? "active" : ""}`}
                    data-value={"dark-only"}
                    onClick={() => handleCustomizerMix_Background("dark-only", 3)}
                >
                    <div className="header bg-dark">
                        <CommenUL />
                    </div>
                    <div className="body">
                        <ul className={"simple-list flex-row"}>
                            <li className={"bg-dark sidebar"}></li>
                            <li className={"bg-dark body"}></li>
                        </ul>
                    </div>
                </li>
            </ul>
        </>
    );
};

export default MixLayoutComponent;
