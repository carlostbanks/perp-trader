"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const markets_service_1 = require("../markets/markets.service");
const order_entity_1 = require("./entities/order.entity");
let OrdersService = class OrdersService {
    constructor(ordersRepository, marketsService) {
        this.ordersRepository = ordersRepository;
        this.marketsService = marketsService;
    }
    async create(userId, createOrderDto) {
        const { symbol, type, side, amount, price, stopPrice, leverage, clientOrderId } = createOrderDto;
        const market = await this.marketsService.findBySymbol(symbol);
        if (type === order_entity_1.OrderType.LIMIT && !price) {
            throw new common_1.BadRequestException('Price is required for limit orders');
        }
        if ((type === order_entity_1.OrderType.STOP || type === order_entity_1.OrderType.STOP_LIMIT) && !stopPrice) {
            throw new common_1.BadRequestException('Stop price is required for stop orders');
        }
        if (type === order_entity_1.OrderType.STOP_LIMIT && !price) {
            throw new common_1.BadRequestException('Price is required for stop-limit orders');
        }
        const maxLeverage = market.maxLeverage;
        if (leverage > maxLeverage) {
            throw new common_1.BadRequestException(`Maximum leverage for ${symbol} is ${maxLeverage}x`);
        }
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
            status: order_entity_1.OrderStatus.PENDING,
        });
        if (leverage > 1) {
            const direction = side === order_entity_1.OrderSide.BUY ? 1 : -1;
            const liquidationThreshold = 1 / leverage;
            const priceToUse = price || market.lastPrice;
            order.liquidationPrice = priceToUse * (1 - direction * liquidationThreshold);
        }
        await this.ordersRepository.save(order);
        this.simulateOrderExecution(order);
        return order;
    }
    async findAll(userId, queryOptions) {
        const where = { userId };
        if (queryOptions) {
            if (queryOptions.status) {
                where.status = queryOptions.status;
            }
            if (queryOptions.side) {
                where.side = queryOptions.side;
            }
            if (queryOptions.symbol) {
                const market = await this.marketsService.findBySymbol(queryOptions.symbol);
                where.marketId = market.id;
            }
        }
        return this.ordersRepository.find({
            where,
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(userId, id) {
        const order = await this.ordersRepository.findOne({
            where: { id, userId },
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        return order;
    }
    async update(userId, id, updateOrderDto) {
        const order = await this.findOne(userId, id);
        if (order.status === order_entity_1.OrderStatus.FILLED || order.status === order_entity_1.OrderStatus.CANCELED) {
            throw new common_1.BadRequestException(`Cannot update ${order.status} order`);
        }
        Object.assign(order, updateOrderDto);
        return this.ordersRepository.save(order);
    }
    async cancel(userId, id) {
        const order = await this.findOne(userId, id);
        if (order.status === order_entity_1.OrderStatus.FILLED || order.status === order_entity_1.OrderStatus.CANCELED) {
            throw new common_1.BadRequestException(`Cannot cancel ${order.status} order`);
        }
        order.status = order_entity_1.OrderStatus.CANCELED;
        order.canceledAt = new Date();
        return this.ordersRepository.save(order);
    }
    async simulateOrderExecution(order) {
        setTimeout(async () => {
            try {
                const market = await this.marketsService.findOne(order.marketId);
                if (order.type === order_entity_1.OrderType.MARKET) {
                    order.status = order_entity_1.OrderStatus.FILLED;
                    order.price = market.lastPrice;
                    order.filledAmount = order.amount;
                    order.filledTotal = order.amount * order.price;
                    order.filledAt = new Date();
                    order.fee = order.filledTotal * market.takerFee;
                }
                else if (order.type === order_entity_1.OrderType.LIMIT) {
                    if (Math.random() > 0.5) {
                        order.status = order_entity_1.OrderStatus.FILLED;
                        order.filledAmount = order.amount;
                        order.filledTotal = order.amount * order.price;
                        order.filledAt = new Date();
                        order.fee = order.filledTotal * market.makerFee;
                    }
                    else {
                        order.status = order_entity_1.OrderStatus.OPEN;
                    }
                }
                else {
                    order.status = order_entity_1.OrderStatus.OPEN;
                }
                await this.ordersRepository.save(order);
            }
            catch (error) {
                console.error('Error simulating order execution:', error);
                order.status = order_entity_1.OrderStatus.REJECTED;
                await this.ordersRepository.save(order);
            }
        }, 1000);
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        markets_service_1.MarketsService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map