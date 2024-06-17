import FeedPage from "../MyPages/FeedPage/FeedPage";
import CreateAppeal from "../MyPages/AppealPage/AppealPage";
import MyAppeals from "../MyPages/AppealPage/MyAppealsPage";
import AppealsInbox from "../MyPages/AppealPage/AppealsInboxPage";
import { DebtsPage } from "pages/Debt";
import { CalendarPage } from "pages/Calendar";
import { LoginPage, RegistrationPage } from "pages/Auth";
import { ArticleListPage, ArticleInfoPage, ArticleCreatePage } from "pages/Article";
import { ProductListPage, ProductInfoPage, ProductCreatePage, ProjectInfoPage, ProjectEditPage } from "pages/Product";
import { ProfileInfoPage, ProfileEditPage, ProfileListPage, ProfileAchievementListPage } from "pages/Profile";
import { KnowledgeProjectArticleInfoPage, KnowledgeProjectInfoPage, KnowledgeProjectListPage } from "pages/Knowledge";
import { InventoryListPage } from "pages/Inventory";
import { MarketCartPage, MarketOrderListPage, MarketProductListPage } from "pages/Market";
import { LearningPage } from "pages/Learning";
import {
    DictionaryPage,
    TrainingsPage,
    ConstructorPage,
    DefinitionTermsPage,
    FlashCardsPage,
    TermDefinitionsPage,
    StatisticsPage,
} from "pages/Learning/Dictionary";
import { MiniAppListPage, MiniAppFramePage } from "pages/MiniApp";
import { AttendanceProfilePage, AttendancePage } from "pages/Attendance";
import { attendanceRoutes } from "models/attendance/attendanceRoute";

export const authRoutes = [
    { path: "/login", component: <LoginPage /> },
    { path: "/registration", component: <RegistrationPage /> },
];

export const routes = [
    { path: "/profile/:username", Component: <ProfileInfoPage /> },
    { path: "/profile/edit", Component: <ProfileEditPage /> },
    { path: "/profile/:username/achievements", Component: <ProfileAchievementListPage /> },
    { path: "/users", Component: <ProfileListPage /> },

    { path: "/calendar", Component: <CalendarPage /> },

    { path: "/attendance/users", Component: <AttendancePage type={attendanceRoutes.USERS} /> },
    { path: "/attendance/:username", Component: <AttendanceProfilePage /> },
    { path: "/attendance/sessions", Component: <AttendancePage type={attendanceRoutes.SESSIONS} /> },
    { path: "/attendance/statistics", Component: <AttendancePage type={attendanceRoutes.STATISTICS} /> },

    { path: "/articles", Component: <ArticleListPage /> },
    { path: "/articles/:username/:articleName", Component: <ArticleInfoPage /> },
    { path: "/articles/create", Component: <ArticleCreatePage /> },
    { path: "/articles/:username/:articleName/edit", Component: <ArticleCreatePage /> },

    { path: "/products", Component: <ProductListPage /> },
    { path: "/products/:id", Component: <ProductInfoPage /> },
    { path: "/products/create", Component: <ProductCreatePage /> },
    { path: "/products/:id/edit", Component: <ProductCreatePage /> },
    { path: "/projects/:id", Component: <ProjectInfoPage /> },
    { path: "/projects/:id/edit", Component: <ProjectEditPage /> },

    { path: "/market", Component: <MarketProductListPage /> },
    { path: "/market/cart", Component: <MarketCartPage /> },
    { path: "/market/orderListUser", Component: <MarketOrderListPage /> },

    { path: "/feed", Component: <FeedPage /> },

    { path: "/appeals/create", Component: <CreateAppeal /> },
    { path: "/appeals/my", Component: <MyAppeals /> },
    { path: "/appeals/inbox", Component: <AppealsInbox /> },

    { path: "/debts", Component: <DebtsPage /> },

    { path: "/knowledge/projects", Component: <KnowledgeProjectListPage /> },
    { path: "/knowledge/projects/:id", Component: <KnowledgeProjectInfoPage /> },
    { path: "/knowledge/projects/:id/articles/:articleId", Component: <KnowledgeProjectArticleInfoPage /> },

    { path: "/inventory/items", Component: <InventoryListPage /> },

    { path: "/learning", Component: <LearningPage /> },
    { path: "/learning/dictionary", Component: <DictionaryPage /> },

    { path: "/learning/dictionary/trainings", Component: <TrainingsPage /> },
    { path: "/learning/dictionary/trainings/term-definitions", Component: <TermDefinitionsPage /> },
    { path: "/learning/dictionary/trainings/definition-terms", Component: <DefinitionTermsPage /> },
    { path: "/learning/dictionary/trainings/flash-cards", Component: <FlashCardsPage /> },
    { path: "/learning/dictionary/trainings/constructor", Component: <ConstructorPage location="Конструктор" /> },
    { path: "/learning/dictionary/trainings/statistics", Component: <StatisticsPage /> },

    { path: "/miniapps", Component: <MiniAppListPage /> },
    { path: "/miniapps/:id", Component: <MiniAppFramePage /> },
];
