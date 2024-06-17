import { combineReducers } from "redux";
import appealReducer from "./Reducers/AppealReducer/AppealReducer";
import feedReducer from "./Reducers/FeedReducer/FeedReducer";
import { CalendarReducer } from "modules/calendar";
import { AuthReducer } from "modules/auth";
import { ArticleReducer } from "modules/article";
import { ProductReducer } from "modules/product";
import { ProfileReducer } from "modules/profile";
import { KnowledgeReducer } from "modules/knowledge";
import { PostReducer } from "modules/post";
import { InventoryReducer } from "modules/inventory";
import { DebtReducer } from "modules/debt";
import { MarketReducer } from "modules/market";
import { DictionaryReducer } from "modules/learning/dictionary";
import { MiniAppReducer } from "modules/miniapps";
import { AttendanceReducer } from "modules/attendance";

export const rootReducer = combineReducers({
    CalendarReducer,
    AuthReducer,
    ArticleReducer,
    ProductReducer,
    ProfileReducer,
    AttendanceReducer,
    KnowledgeReducer,
    PostReducer,
    InventoryReducer,
    DebtReducer,
    feedReducer,
    MarketReducer,
    appealReducer,
    DictionaryReducer,
    MiniAppReducer,
});
