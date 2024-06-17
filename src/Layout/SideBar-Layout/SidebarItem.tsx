import React, { FC, useCallback, useState } from "react";
import { Collapse } from "reactstrap";
import { Link } from "react-router-dom";
import { SidebarLinkItem, SidebarSubmenuItem } from "./Menu";
import classNames from "classnames";
import s from "./Sidebar.module.scss";

interface ISidebarMenuItemProps {
    username: string;
    active: boolean;
    menuItem: SidebarLinkItem | SidebarSubmenuItem;
}

const SidebarItem: FC<ISidebarMenuItemProps> = ({ active, username, menuItem }) => {
    const [open, setOpen] = useState(false);

    const toggleOpenHandler = useCallback((e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setOpen(prev => !prev);
    }, []);

    return (
        <li className={s.sidebar_menu_item}>
            {menuItem.type === "sub" && (
                <a
                    className={classNames(s.link, { [s.active]: active })}
                    onClick={toggleOpenHandler}
                >
                    <span className={s.menu_title}>
                        {menuItem.icon && <menuItem.icon />}
                        {menuItem.title}
                    </span>
                    <div className={s.toggle_icon__container}>
                        <i className={classNames("fa fa-angle-right", s.toggle_icon, { [s.open]: open })}></i>
                    </div>
                </a>
            )}
            {menuItem.type === "link" && (
                <Link
                    to={
                        menuItem.title === "Личный кабинет"
                            ? username
                                ? `profile/${username}`
                                : `profile/${localStorage.getItem("@PERSONAL_ACCOUNT")}`
                            : menuItem.title === "Мои достижения"
                            ? `profile/${username}/achievements`
                            : menuItem.path
                    }
                    className={classNames(s.link, { [s.active]: active })}
                >
                    <span className={s.menu_title}>
                        {menuItem.icon && <menuItem.icon />}
                        {menuItem.title}
                    </span>
                </Link>
            )}
            {menuItem.children && (
                <Collapse isOpen={open}>
                    <ul className={classNames(s.sub_list)}>
                        {menuItem.children.map((childrenItem, index) => {
                            return (
                                <li key={index}>
                                    <Link
                                        to={childrenItem.path}
                                        className={classNames(s.link, { [s.active]: childrenItem.active })}
                                    >
                                        {childrenItem.title}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </Collapse>
            )}
        </li>
    );
};

export default SidebarItem;
