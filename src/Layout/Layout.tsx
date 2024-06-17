import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import Themecustomizer from "./ThemeCustomizer";
import CheckContext from "../_helper/customizer";
import { Sidebar } from "./SideBar-Layout";

const Layout = () => {
    //eslint-disable-next-line
    //@ts-ignore
    const { sidebar_types, settings, toggleIcon, setToggleIcon, defaultClass, setDefaultClass } =
        useContext(CheckContext);
    const settings1 = localStorage.getItem("sidebar_Settings") || settings;
    const sidebar_types1 = localStorage.getItem("sidebar_types") || sidebar_types;

    useEffect(() => {
        const resizeHandler = () => {
            if (window.innerWidth <= 992) {
                setDefaultClass(true);
            } else setDefaultClass(false);
        };
        if (window.innerWidth - 440 <= 575) {
            setToggleIcon(true);
        } else {
            setToggleIcon(false);
        }
        window.addEventListener("resize", resizeHandler);

        return () => window.removeEventListener("resize", resizeHandler);
    }, []);

    return (
        <div
            className={`page-wrapper ${!defaultClass ? sidebar_types1 : "compact-wrapper"} ${settings1}`}
            id="pageWrapper"
        >
            <Sidebar isOpen={!toggleIcon} />
            <div
                style={{ zIndex: 11 }}
                className={`page-header ${toggleIcon ? "close_icon" : ""}`}
            >
                <Header />
            </div>
            <div className="page-body-wrapper">
                <div
                    className="page-body"
                    style={{ marginLeft: !toggleIcon ? "280px" : 0 }}
                >
                    <Outlet />
                </div>
            </div>
            {/*<Themecustomizer />*/}
        </div>
    );
};
export default Layout;
