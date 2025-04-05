import { Repository } from 'typeorm';
import { MarketsService } from '../markets/markets.service';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { QueryOrdersDto } from './dto/query-orders.dto';
export declare class OrdersService {
    private readonly ordersRepository;
    private readonly marketsService;
    constructor(ordersRepository: Repository<Order>, marketsService: MarketsService);
    create(userId: string, createOrderDto: CreateOrderDto): Promise<Order>;
    findAll(userId: string, queryOptions?: QueryOrdersDto): Promise<Order[]>;
    findOne(userId: string, id: string): Promise<Order>;
    update(userId: string, id: string, updateOrderDto: UpdateOrderDto): Promise<Order>;
    cancel(userId: string, id: string): Promise<Order>;
    private simulateOrderExecution;
}
