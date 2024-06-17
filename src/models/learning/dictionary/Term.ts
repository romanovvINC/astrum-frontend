export type Term = {
    id: string;
    name: string;
    definition: string;
    category: CategoryView;
};

export type CategoryView = {
    id: string;
    name: string;
};
