export function getFileSizeString(bytes: number) {
    const sizes = [1, 1024, 1024 * 1024, 1024 * 1024 * 1024, 1024 * 1024 * 1024 * 1024, Infinity];
    const words = ["B", "B", "KB", "MB", "GB"];
    const index = sizes.findIndex(s => bytes < s);
    const resultNumber = Math.round(bytes / sizes[index - 1]);
    return `${resultNumber} ${words[index]}`;
}

export function isImage(file: File) {
    return file.type.includes("image");
}
