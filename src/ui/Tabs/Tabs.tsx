import { FC, Fragment, ReactElement, useCallback, useRef, useState } from "react";

import s from "./Tabs.module.scss";

interface ITabs {
    tabsData: {
        title: string;
        value: string;
    }[];
    activeTab: string;
    onClickTab: (newTab: string) => void;
    children: ReactElement;
}

const Tabs: FC<ITabs> = ({ tabsData, activeTab, onClickTab, children }) => {
    return (
        <div className={s.container}>
            <ul className={s.nav}>
                {tabsData.map((tab, i) => {
                    return (
                        <li
                            key={i}
                            className={`${s.tab} ${activeTab === tab.value ? s.active : ""}`}
                            onClick={() => onClickTab(tab.value)}
                        >
                            <div className={`${s.nav_item} ${activeTab === tab.value ? s.active : ""}`}>
                                {tab.title}
                            </div>
                        </li>
                    );
                })}
            </ul>
            <div>{children}</div>
        </div>
    );
};

export default Tabs;
