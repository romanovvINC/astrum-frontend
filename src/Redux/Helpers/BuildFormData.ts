export const buildFormData = (formData: FormData, data: any, parentKey = "") => {
    if (
        data &&
        typeof data === "object" &&
        !(data instanceof Date) &&
        !(data instanceof File) &&
        !(data instanceof Blob)
    ) {
        Object.keys(data).forEach(key => {
            buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
        });
    } else if (data !== undefined) {
        const value = data == null ? "" : data;
        formData.append(parentKey, value);
    }
};
