import React, { useEffect, useState } from "react";
import { DayLightSvg, MoonlightSvg } from "../../UiKit/icons/svgIcons";

const MoonLight = () => {
    const [moonlight, setMoonlight] = useState(false);
    useEffect(() => {
        if (localStorage.getItem("layout_version") === "dark-only") {
            setMoonlight(true);
        }
    }, []);
    /*
     *For changing theme dark & light
     */
    const MoonlightToggle = light => {
        if (light) {
            setMoonlight(!light);
            document.body.className = "light";
            localStorage.setItem("layout_version", "light");
        } else {
            setMoonlight(!light);
            document.body.className = "dark-only";
            localStorage.setItem("layout_version", "dark-only");
        }
    };

    return (
        <div
            className="mode animated backOutRight"
            onClick={() => MoonlightToggle(moonlight)}
        >
            {moonlight ? <MoonlightSvg /> : <DayLightSvg />}
        </div>
    );
};

export default MoonLight;
