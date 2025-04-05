export declare class PriceResponseDto {
    id: string;
    price: number;
    high: number;
    low: number;
    open: number;
    close: number;
    volume: number;
    timeframe: string;
    timestamp: Date;
    constructor(partial: Partial<PriceResponseDto>);
}
