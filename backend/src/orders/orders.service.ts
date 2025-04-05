// backend/src/orders/orders.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { MarketsService } from '../markets/markets.service';
import { Order, OrderType, OrderStatus, OrderSide } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { QueryOrdersDto } from './dto/query-orders.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    private readonly marketsService: MarketsService,
  ) {}

  async create(userId: string, createOrderDto: CreateOrderDto): Promise<Order> {
    const { symbol, type, side, amount, price, stopPrice, leverage, clientOrderId } = createOrderDto;

    // Find the market by symbol
    const market = await this.marketsService.findBySymbol(symbol);

    // Validate order based on type
    if (type === OrderType.LIMIT && !price) {
      throw new BadRequestException('Price is required for limit orders');
    }

    if ((type === OrderType.STOP || type === OrderType.STOP_LIMIT) && !stopPrice) {
      throw new BadRequestException('Stop price is required for stop orders');
    }

    if (type === OrderType.STOP_LIMIT && !price) {
      throw new BadRequestException('Price is required for stop-limit orders');
    }

    // Check leverage limits
    const maxLeverage = market.maxLeverage;
    if (leverage > maxLeverage) {
      throw new BadRequestException(`Maximum leverage for ${symbol} is ${maxLeverage}x`);
    }

    // Create the order
    const order = this.ordersRepository.create({
      userId,
      marketId: market.id,
      type,
      side,
      amount,
      price,
      stopPrice,
      leverage: leverage || 1,
      clientOrderId,
      status: OrderStatus.PENDING,
    });

    // In a real system, we'd calculate the liquidation price based on
    // entry price, leverage, and margin balance
    if (leverage > 1) {
      // This is a simplified calculation
      const direction = side === OrderSide.BUY ? 1 : -1;
      const liquidationThreshold = 1 / leverage;
      const priceToUse = price || market.lastPrice;
      
      order.liquidationPrice = priceToUse * (1 - direction * liquidationThreshold);
    }

    // Save and return the order
    await this.ordersRepository.save(order);

    // In a real system, we'd now process the order against the orderbook
    // or send it to the trading engine. For this example, we'll simulate
    // order execution asynchronously.
    this.simulateOrderExecution(order);

    return order;
  }

  async findAll(userId: string, queryOptions?: QueryOrdersDto): Promise<Order[]> {
    const where: FindOptionsWhere<Order> = { userId };

    // Add filter conditions if provided
    if (queryOptions) {
      if (queryOptions.status) {
        where.status = queryOptions.status;
      }
      
      if (queryOptions.side) {
        where.side = queryOptions.side;
      }
      
      if (queryOptions.symbol) {
        // We need to join with the market to filter by symbol
        // This is simplified for the example
        const market = await this.marketsService.findBySymbol(queryOptions.symbol);
        where.marketId = market.id;
      }
    }

    return this.ordersRepository.find({
      where,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(userId: string, id: string): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id, userId },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async update(userId: string, id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(userId, id);

    // In a real system, you'd need more validation here to ensure
    // the update makes sense (e.g., can't change price of a filled order)
    if (order.status === OrderStatus.FILLED || order.status === OrderStatus.CANCELED) {
      throw new BadRequestException(`Cannot update ${order.status} order`);
    }

    // Apply updates
    Object.assign(order, updateOrderDto);
    
    return this.ordersRepository.save(order);
  }

  async cancel(userId: string, id: string): Promise<Order> {
    const order = await this.findOne(userId, id);

    // Check if order can be canceled
    if (order.status === OrderStatus.FILLED || order.status === OrderStatus.CANCELED) {
      throw new BadRequestException(`Cannot cancel ${order.status} order`);
    }

    // Update order status
    order.status = OrderStatus.CANCELED;
    order.canceledAt = new Date();

    return this.ordersRepository.save(order);
  }

  /**
   * Simulates order execution. In a real system, this would be handled by a 
   * trading engine or matching engine.
   */
  private async simulateOrderExecution(order: Order): Promise<void> {
    // Simulate some async processing time
    setTimeout(async () => {
      try {
        // Get the latest market data
        const market = await this.marketsService.findOne(order.marketId);
        
        // Simulate order execution
        if (order.type === OrderType.MARKET) {
          // Market orders are filled immediately at market price
          order.status = OrderStatus.FILLED;
          order.price = market.lastPrice;
          order.filledAmount = order.amount;
          order.filledTotal = order.amount * order.price;
          order.filledAt = new Date();
          
          // Calculate fee
          order.fee = order.filledTotal * market.takerFee;
        } else if (order.type === OrderType.LIMIT) {
          // For simplicity, we'll assume 50% chance of fill for limit orders
          if (Math.random() > 0.5) {
            order.status = OrderStatus.FILLED;
            order.filledAmount = order.amount;
            order.filledTotal = order.amount * order.price;
            order.filledAt = new Date();
            
            // Calculate fee (maker fee for limit orders)
            order.fee = order.filledTotal * market.makerFee;
          } else {
            order.status = OrderStatus.OPEN;
          }
        } else {
          // For stop and stop-limit orders, just mark as open
          order.status = OrderStatus.OPEN;
        }
        
        await this.ordersRepository.save(order);
      } catch (error) {
        console.error('Error simulating order execution:', error);
        
        // Mark order as rejected
        order.status = OrderStatus.REJECTED;
        await this.ordersRepository.save(order);
      }
    }, 1000);
  }
}