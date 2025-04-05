export declare enum OrderType {
    MARKET = "market",
    LIMIT = "limit",
    STOP = "stop",
    STOP_LIMIT = "stop_limit"
}
export declare enum OrderSide {
    BUY = "buy",
    SELL = "sell"
}
export declare enum OrderStatus {
    PENDING = "pending",
    OPEN = "open",
    FILLED = "filled",
    PARTIALLY_FILLED = "partially_filled",
    CANCELED = "canceled",
    REJECTED = "rejected",
    EXPIRED = "expired"
}
export declare class Order {
    id: string;
    userId: string;
    marketId: string;
    type: OrderType;
    side: OrderSide;
    status: OrderStatus;
    amount: number;
    price: number;
    stopPrice: number;
    filledAmount: number;
    filledTotal: number;
    fee: number;
    leverage: number;
    liquidationPrice: number;
    clientOrderId: string;
    createdAt: Date;
    updatedAt: Date;
    filledAt: Date;
    canceledAt: Date;
}
