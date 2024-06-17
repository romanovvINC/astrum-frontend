import { MiniApp } from "./MiniApp";

export type MiniAppState = {
    pending: boolean;
    pendingList: boolean;
    miniAppList: MiniApp[];
    miniApp: MiniApp;
    error: string | null;
}