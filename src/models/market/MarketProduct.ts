export type MarketProduct = {
    id: string;
    name: string;
    summary: string;
    description: string;
    price: number;
    remain: number;
    isAvailable: boolean;
    isInfinite: boolean;
    coverUrl: string;
};

export type MarketProductRequest = Omit<MarketProduct, "id" | "coverUrl">;
