export const convertToUrlArticleName = (name: string): string => {
    return name.replace(/" "/g, "-");
};
