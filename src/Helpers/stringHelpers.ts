import { FieldPath, FieldValues, PathValue, UseFormSetValue } from "react-hook-form";

export const removeUnnecessarySpaces = (value: string, removeEnd = true): string => {
    let result = value.trimStart();
    if (removeEnd) result = result.trimEnd();
    result = result.replace(/ +/g, " ");
    return result;
};

type FuncMain<T extends FieldValues, TFieldName extends FieldPath<T>> = UseFormSetValue<T>;

export const changeStringField = <T extends FieldValues, TFieldName extends FieldPath<T>>(
    func: FuncMain<T, TFieldName>,
    fieldName: TFieldName,
    callback?: ((val: string) => void) | null,
    removeEnd = false
) => {
    return (e: { target: { value: string } }) => {
        const result = removeUnnecessarySpaces(e.target.value, removeEnd);
        func(fieldName, result as PathValue<T, TFieldName>);
        callback?.(result);
    };
};

export const validateStringField = (minLength = 0, maxLength = 40, validateFunc?: (val: string) => boolean) => {
    return (value: string) => {
        const result = removeUnnecessarySpaces(value);
        const resultValidateFunc = validateFunc ? validateFunc(result) : true;
        return result.length > minLength && result.length <= maxLength && resultValidateFunc;
    };
};
