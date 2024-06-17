import { RootState } from "Redux/store";
import { MiniAppState } from "models/miniapp/MiniAppState";
import { MiniApp } from "models/miniapp/MiniApp";

export const MiniAppSelectors = {
    getMiniAppState: (state: RootState): MiniAppState => state.MiniAppReducer,
    getMiniAppsListInfo: (state: RootState): MiniApp[] => state.MiniAppReducer.miniAppList,
    getMiniAppInfo: (state: RootState): MiniApp => state.MiniAppReducer.miniApp
}
