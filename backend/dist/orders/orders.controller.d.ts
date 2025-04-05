import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderResponseDto } from './dto/order-response.dto';
import { QueryOrdersDto } from './dto/query-orders.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(req: any, createOrderDto: CreateOrderDto): Promise<OrderResponseDto>;
    findAll(req: any, queryOptions: QueryOrdersDto): Promise<OrderResponseDto[]>;
    findOne(req: any, id: string): Promise<OrderResponseDto>;
    update(req: any, id: string, updateOrderDto: UpdateOrderDto): Promise<OrderResponseDto>;
    cancel(req: any, id: string): Promise<OrderResponseDto>;
}
