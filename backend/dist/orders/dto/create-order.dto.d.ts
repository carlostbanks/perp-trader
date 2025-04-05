import { OrderType, OrderSide } from '../entities/order.entity';
export declare class CreateOrderDto {
    symbol: string;
    type: OrderType;
    side: OrderSide;
    amount: number;
    price?: number;
    stopPrice?: number;
    leverage?: number;
    clientOrderId?: string;
}
