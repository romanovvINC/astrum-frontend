import { AxiosResponse } from "axios";
import baseApi from "Api/BaseApi";
import { MENUITEMS, SidebarMainItem } from "./Menu";
const baseUrl = "/permissions/get-permissions-sections";

export type PermissionSection = {
    id: string;
    dateCreated: Date;
    dateModifed: Date | null;
    titleSection: string;
    permission: boolean;
};

export const getPermissionsSections = (): Promise<AxiosResponse<PermissionSection[]>> => {
    return baseApi.get(baseUrl);
};

export async function getFormattedMenu(): Promise<SidebarMainItem[]> {
    let FORMATTED_MENU_ITEMS: SidebarMainItem[] = [];
    const res: AxiosResponse<PermissionSection[]> = await getPermissionsSections();
    const data: PermissionSection[] = res.data;
    console.log(res);
    for (let i = 0; i < MENUITEMS.length; i++) {
        let validate = true;
        for (let j = 0; j < data.length; j++) {
            if (MENUITEMS[i].title == data[j].titleSection) {
                if (data[j].permission == false) {
                    validate = false;
                    break;
                }
            }
            continue;
        }
        if (validate == false) {
            continue;
        }
        FORMATTED_MENU_ITEMS.push(MENUITEMS[i]);
    }
    return FORMATTED_MENU_ITEMS;
}
