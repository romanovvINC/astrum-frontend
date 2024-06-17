export const getReadingTime = (content: string) => Math.max(1, Math.floor(content.split(" ").length / 150));
