export declare enum TimeframeEnum {
    MINUTE_1 = "1m",
    MINUTE_5 = "5m",
    MINUTE_15 = "15m",
    HOUR_1 = "1h",
    HOUR_4 = "4h",
    DAY_1 = "1d",
    WEEK_1 = "1w"
}
export declare class GetPricesDto {
    timeframe: TimeframeEnum;
    startTime?: Date;
    endTime?: Date;
    limit?: number;
}
