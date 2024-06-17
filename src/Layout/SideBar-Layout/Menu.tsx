import {
    ProfileIcon,
    CalendarIcon,
    ArticlesIcon,
    ProductIconSvg,
    FeedIcon,
    EmployeeListIcon,
    AchievementsIconSvg,
    MarketIconSvg,
    AppealIconSvg,
    InventoryIcon,
    KnowledgeIcon,
    LearningIcon,
} from "ui/icons/svgIcons";
import { ReactElement } from "react";

export type SidebarMainItem = SidebarLinkItem | SidebarSubmenuItem;

export type SidebarItem = {
    title: string;
    active?: boolean;
    icon: () => ReactElement;
    badge?: boolean;
    bookmark: boolean;
    type: "link" | "sub";
    children?: SubMenuItem[];
    path?: string;
};

export type SidebarLinkItem = SidebarItem & {
    badge: boolean;
    type: "link";
    path: string;
};

export type SidebarSubmenuItem = SidebarItem & {
    type: "sub";
    children: SubMenuItem[];
};

export type SubMenuItem = {
    title: string;
    active?: boolean;
    type: "link";
    path: string;
};

export const MENUITEMS: SidebarMainItem[] = [
    {
        title: "Личный кабинет",
        icon: ProfileIcon,
        badge: true,
        bookmark: true,
        type: "link",
        path: `/profile/${localStorage.getItem("@PERSONAL_ACCOUNT")}`, //TODO.... брать username из LocalStorage
    },
    {
        title: "Новости",
        icon: FeedIcon,
        badge: true,
        bookmark: true,
        type: "link",
        path: `/feed`,
    },
    {
        title: "Календарь",
        icon: CalendarIcon,
        badge: true,
        bookmark: true,
        type: "link",
        path: `/calendar`,
    },
    {
        title: "Статьи",
        icon: ArticlesIcon,
        badge: true,
        bookmark: true,
        type: "link",
        path: `/articles`,
    },
    {
        title: "Продукты",
        icon: ProductIconSvg,
        badge: true,
        bookmark: true,
        type: "link",
        path: `/products`,
    },
    {
        title: "Поиск сотрудников",
        icon: EmployeeListIcon,
        badge: true,
        bookmark: true,
        type: "link",
        path: `/users`,
    },
    {
        title: "Посещаемость",
        icon: CalendarIcon,
        badge: true,
        bookmark: true,
        type: "link",
        path: `/attendance/users`,
    },
    {
        active: true,
        title: "Мои достижения",
        icon: AchievementsIconSvg,
        badge: true,
        bookmark: true,
        type: "link",
        path: `/profile/boolbl4/achievements`, //TODO.... брать username из LocalStorage
    },
    {
        title: "Магазин",
        icon: MarketIconSvg,
        bookmark: true,
        type: "sub",
        children: [
            {
                title: "Список товаров",
                type: "link",
                path: `/market`,
            },
            {
                title: "Корзина",
                type: "link",
                path: `/market/cart`,
            },
            {
                title: "Список заказов",
                type: "link",
                path: `/market/orderListUser`,
            },
        ],
    },
    {
        title: "Заявки",
        icon: AppealIconSvg,
        bookmark: true,
        type: "sub",
        children: [
            {
                title: "Мои заявки",
                type: "link",
                path: `/appeals/my`,
            },
            {
                title: "Входящие заявки",
                type: "link",
                path: `/appeals/inbox`,
            },
        ],
    },
    {
        title: "База знаний",
        icon: KnowledgeIcon,
        badge: true,
        bookmark: true,
        type: "link",
        path: "/knowledge/projects",
    },
    {
        title: "Инвентаризация",
        icon: InventoryIcon,
        badge: true,
        bookmark: true,
        type: "link",
        path: "/inventory/items",
    },
    {
        title: "Обучение",
        icon: LearningIcon,
        badge: true,
        bookmark: true,
        type: "link",
        path: "/learning",
    },
    // {
    //     title: "Долги",
    //     icon: ArticlesIcon,
    //     badge: true,
    //     bookmark: true,
    //     type: "link",
    //     path: "/debts",
    // },
];

export const TELEGRAMMENUITEMS: SidebarMainItem[] = [
    {
        title: "Новости",
        icon: FeedIcon,
        badge: true,
        bookmark: true,
        type: "link",
        path: `/telegram/feed`,
    },
    {
        title: "Магазин",
        icon: MarketIconSvg,
        bookmark: true,
        type: "sub",
        children: [
            {
                title: "Список товаров",
                type: "link",
                path: `/telegram/market`,
            },
            {
                title: "Корзина",
                type: "link",
                path: `/telegram/market/cart`,
            },
            {
                title: "Список заказов",
                type: "link",
                path: `/telegram/market/orderListUser`,
            },
        ],
    },
];
