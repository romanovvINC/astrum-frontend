export type FilterState = {
    [sectionName: string]: string[];
};

export type FilterElement = {
    [sectionName: string]: string;
};

export type MainFilterState = {
    predicate: string;
    filterParams: FilterState;
};
