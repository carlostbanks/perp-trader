export declare class MarketResponseDto {
    id: string;
    symbol: string;
    baseAsset: string;
    quoteAsset: string;
    name: string;
    description: string;
    logoUrl: string;
    lastPrice: number;
    high24h: number;
    low24h: number;
    volume24h: number;
    change24h: number;
    changePercent24h: number;
    marketCap: number;
    isActive: boolean;
    isTrending: boolean;
    isFeatured: boolean;
    maxLeverage: number;
    takerFee: number;
    makerFee: number;
    constructor(partial: Partial<MarketResponseDto>);
}
