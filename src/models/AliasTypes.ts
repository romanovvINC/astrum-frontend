export type ErrorString = string;
export type DateString = string;
export type SuccessCallback = (() => void) | null;
export type SuccessCallbackWithData<T> = ((data: T) => void) | null;
