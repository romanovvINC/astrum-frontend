import { AxiosResponse } from "axios";
import baseApi from "Api/BaseApi";
import { FilterWithPaginationRequest } from "models/filter/FilterWithPaginationRequest";
import { InventoryItemListResponse } from "models/inventory/InventoryItemListResponse";
import { getStringParamsFromFilter } from "Helpers/filterHelpers";
import { FilterVariantResponse } from "models/filter/FilterVariant";

const baseUrl = "/inventory-items";
const baseUrl2 = "/inventory";
const baseTemplateUrl = "/templates";

export const getInventoryItemList = ({
    filterParams,
    paginationParams,
}: FilterWithPaginationRequest): Promise<AxiosResponse<InventoryItemListResponse>> => {
    const stringParams = getStringParamsFromFilter(filterParams);
    const url = `${baseUrl2}/get-filtering-inventoryitems?${stringParams}`;
    return baseApi.get(url, { params: { ...paginationParams, predicate: filterParams.predicate } });
};

export const getInventoryFilter = (): Promise<AxiosResponse<FilterVariantResponse>> => {
    const url = `${baseTemplateUrl}/filters`;
    return baseApi.get(url);
};
