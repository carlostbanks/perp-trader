import { OrderStatus, OrderSide } from '../entities/order.entity';
export declare class QueryOrdersDto {
    symbol?: string;
    status?: OrderStatus;
    side?: OrderSide;
}
