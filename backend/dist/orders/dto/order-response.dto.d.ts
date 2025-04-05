import { OrderType, OrderSide, OrderStatus } from '../entities/order.entity';
export declare class OrderResponseDto {
    id: string;
    userId: string;
    marketId: string;
    symbol: string;
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
    constructor(partial: Partial<OrderResponseDto>);
}
