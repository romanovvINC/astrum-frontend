export type CustomField = {
    id: string;
    name: string;
    value: string;
};

export type CustomFieldRequest = Omit<CustomField, "id">;
