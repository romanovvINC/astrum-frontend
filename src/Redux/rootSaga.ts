import { all, call } from "redux-saga/effects";
import { addAppealWatcher, editAppealWatcher, getAppealCreatePageWatcher } from "./Reducers/AppealReducer/Watchers";
import { feedWatcher } from "./Reducers/FeedReducer/Watchers";
import { calendarWatcher } from "modules/calendar";
import { authWatcher } from "modules/auth";
import { articleWatcher } from "modules/article";
import { watchProduct } from "modules/product";
import { watchProfile } from "modules/profile";
import { watchKnowledge } from "modules/knowledge";
import { watchPost } from "modules/post";
import { watchInventory } from "modules/inventory";
import { watchDebt } from "modules/debt";
import { watchMarket } from "modules/market";
import { dictionaryWatcher } from "modules/learning/dictionary";
import { watchMiniApps } from "modules/miniapps/store/watchers";
import { watchAttendance } from "modules/attendance";

export function* rootSaga() {
    yield all([
        call(calendarWatcher),
        call(authWatcher),
        call(articleWatcher),
        call(watchProduct),
        call(watchProfile),
        call(watchAttendance),
        call(watchKnowledge),
        call(watchPost),
        call(watchInventory),
        call(watchDebt),
        call(watchMarket),
        call(getAppealCreatePageWatcher),
        call(addAppealWatcher),
        call(editAppealWatcher),
        call(feedWatcher),
        call(dictionaryWatcher),
        call(watchMiniApps),
    ]);
}
