import React, { FC, useEffect, useRef, useState } from "react";
import { MENUITEMS, SidebarMainItem, SidebarSubmenuItem, TELEGRAMMENUITEMS } from "./Menu";
import SidebarIcon from "./SidebarIcon";
import { useAppSelector } from "Redux/hooks";
import { authSelectors } from "modules/auth";
import classNames from "classnames";
import SidebarItem from "./SidebarItem";
import s from "./Sidebar.module.scss";
import { useLocation } from "react-router-dom";
import { AxiosResponse } from "axios";
import baseApi from "Api/BaseApi";
import { getFormattedMenu } from "./PermissionMenu";

interface ISidebarProps {
    isOpen: boolean;
}

const Sidebar: FC<ISidebarProps> = ({ isOpen }) => {
    const { username } = useAppSelector(authSelectors.getBasicInfo);
    const ref = useRef<HTMLUListElement>(null);
    const location = useLocation();
    let default_menu: SidebarMainItem[] = [];
    const [formatted_menu, SET_MENU_ITEMS] = useState(default_menu);
    const items = location.pathname.includes("telegram") ? TELEGRAMMENUITEMS : formatted_menu;

    useEffect(() => {
        const getMenu = async () => {
            let data = await getFormattedMenu();
            SET_MENU_ITEMS(data);
        };
        getMenu();

        const scrollHandler = (e: WheelEvent) => {
            e.stopPropagation();
            e.preventDefault();
            if (ref.current) {
                ref.current.scrollTop += e.deltaY;
            }
        };
        ref.current?.addEventListener("wheel", scrollHandler);
        return () => {
            ref.current?.removeEventListener("wheel", scrollHandler);
        };
    }, []);

    return (
        <div className={classNames(s.sidebar, { [s.opened]: isOpen })}>
            <SidebarIcon />
            <ul
                ref={ref}
                className={s.list}
            >
                {items.map((item, i) => {
                    const isSubmenu = (item: SidebarMainItem): item is SidebarSubmenuItem =>
                        item.children !== undefined;

                    let active = isSubmenu(item)
                        ? item.children.some(sub => location.pathname.includes(sub.path))
                        : item.title === "Личный кабинет"
                        ? location.pathname.includes(username) && !location.pathname.includes("achievements")
                        : item.title === "Мои достижения"
                        ? location.pathname.includes(`${username}/achievements`)
                        : location.pathname.includes(item.path);

                    if (location.pathname.includes("attendance")) active = item.title === "Посещаемость";

                    return (
                        <SidebarItem
                            key={`item-${i}`}
                            username={username}
                            active={active}
                            menuItem={item}
                        />
                    );
                })}
            </ul>
        </div>
    );
};

export default Sidebar;
