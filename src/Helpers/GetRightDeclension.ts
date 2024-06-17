export const getRightDeclensionTerm = (value: number): string => {
    const lastNum = Number(String(value).slice(-1));
    const last2Nums = Number(String(value).slice(-2));
    if ((last2Nums >= 11 && last2Nums <= 19) || lastNum === 0 || (lastNum >= 5 && lastNum <= 9)) {
        return "терминов";
    } else if (lastNum === 1) {
        return "термин";
    } else if (lastNum >= 2 && lastNum <= 4) {
        return "термина";
    }

    return "";
};

export const getRightDeclensionTraining = (value: number): string => {
    const lastNum = Number(String(value).slice(-1));
    const last2Nums = Number(String(value).slice(-2));
    if ((last2Nums >= 11 && last2Nums <= 19) || lastNum === 0 || (lastNum >= 5 && lastNum <= 9)) {
        return "тренировок";
    } else if (lastNum === 1) {
        return "тренировка";
    } else if (lastNum >= 2 && lastNum <= 4) {
        return "тренировки";
    }

    return "";
};

export const getRightDeclensionFinished = (value: number): string => {
    const lastNum = Number(String(value).slice(-1));
    const last2Nums = Number(String(value).slice(-2));
    if ((last2Nums >= 11 && last2Nums <= 19) || lastNum === 0 || (lastNum >= 5 && lastNum <= 9)) {
        return "завершено";
    } else if (lastNum === 1) {
        return "завершена";
    } else if (lastNum >= 2 && lastNum <= 4) {
        return "завершены";
    }

    return "";
};
