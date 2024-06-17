import React, { useContext } from "react";
import CheckContext from "../../_helper/customizer/index";
import logo from "../../assets/images/logo/Logo_Astrum.svg";
import { Link } from "react-router-dom";
import classNames from "classnames";
import s from "./Sidebar.module.scss";

const SidebarIcon = () => {
    //eslint-disable-next-line
    //@ts-ignore
    const { toggleIcon, toggleSidebar } = useContext(CheckContext);
    const openCloseSidebar = () => toggleSidebar(!toggleIcon);

    return (
        <div className={classNames("logo-wrapper", s.logo__container)}>
            <Link to={"/feed"}>
                <img
                    className={s.image}
                    src={logo}
                    alt={"logo"}
                />
            </Link>
            <div
                className={s.back_button}
                onClick={openCloseSidebar}
            >
                <i className="fa fa-angle-left"></i>
            </div>
        </div>
    );
};
export default SidebarIcon;
