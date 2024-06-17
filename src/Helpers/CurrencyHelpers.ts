export const currencyCalculator = (minutes: number, sessions: number) => {
    return minutes / 10 + sessions * 10;
};
