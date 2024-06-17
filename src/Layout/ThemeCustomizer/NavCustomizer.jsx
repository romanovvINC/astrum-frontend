import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";

const NavCustomizer = ({ callbackNav, selected }) => {
    return (
        <Nav
            className="flex-column nac-pills"
            id="c-pills-tab"
            role="tablist"
            aria-orientation="vertical"
        >
            <NavItem>
                <NavLink
                    className={selected === "color-picker" ? "active" : ""}
                    onClick={() => callbackNav("color-picker", true)}
                >
                    <div className="settings color-settings">
                        <i className="icon-paint-bucket"></i>
                    </div>
                </NavLink>
            </NavItem>
        </Nav>
    );
};

export default NavCustomizer;
