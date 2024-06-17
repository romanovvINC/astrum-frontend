import { MainFilterState } from "models/filter/FilterState";
import { FilterVariant } from "models/filter/FilterVariant";
import { ProfileShortInfo } from "./ProfileShortInfo";

export type ProfileListState = {
    users: ProfileShortInfo[];
    filter: MainFilterState;
    filterVariants: FilterVariant[];
};
