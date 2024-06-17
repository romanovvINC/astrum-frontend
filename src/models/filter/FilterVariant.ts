export type FilterVariant = {
    title: string;
    name: string;
    filterItems: { title: string; value: string; count: number | null }[];
};

export type FilterVariantResponse = {
    blocks: FilterVariant[];
};
