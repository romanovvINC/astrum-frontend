import { ProductListInfo } from "./ProductListInfo";
import { ProductInfo } from "./ProductInfo";
import { Customer } from "./Customer";
import { ProjectInfo } from "models/product/ProjectInfo";
import { ShortProfileInfo } from "models/profile/ShortProfileInfo";
import { ProfilePositionInfo } from "models/profile/ProfilePositionInfo";

export type ProductState = {
    pending: boolean;
    pendingAsync: boolean;
    pendingChange: boolean;
    canPendingAsync: boolean;
    pendingCustomers: boolean;
    pendingProfileShortInfoList: boolean;
    pendingProfilePositions: boolean;
    pageIndex: number;
    count: number;
    customers: Customer[];
    productListInfo: ProductListInfo;
    productInfo: ProductInfo;
    projectInfo: ProjectInfo;
    profileShortInfoList: ShortProfileInfo[];
    profilePositions: ProfilePositionInfo[];
    error: string | null;
    errorChange: string | null;
    errorCustomers: string | null;
    errorPendingProfileShortInfoList: string | null;
    errorProfilePositions: string | null;
};
