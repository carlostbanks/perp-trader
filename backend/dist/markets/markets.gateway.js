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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
const markets_service_1 = require("./markets.service");
let MarketsGateway = class MarketsGateway {
    constructor(marketsService) {
        this.marketsService = marketsService;
        this.logger = new common_1.Logger('MarketsGateway');
        this.clientSubscriptions = new Map();
    }
    afterInit(server) {
        this.logger.log('WebSocket Gateway initialized');
        this.startMarketDataSimulator();
    }
    handleConnection(client) {
        this.logger.log(`Client connected: ${client.id}`);
        this.clientSubscriptions.set(client.id, new Set());
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
        this.clientSubscriptions.delete(client.id);
    }
    handleSubscribe(client, payload) {
        const { symbol, timeframe } = payload;
        this.logger.log(`Client ${client.id} subscribed to ${symbol} / ${timeframe}`);
        const subscriptions = this.clientSubscriptions.get(client.id);
        subscriptions.add({ symbol, timeframe });
        const room = this.getSubscriptionRoom(symbol, timeframe);
        client.join(room);
        return { event: 'subscribed', data: { symbol, timeframe } };
    }
    handleUnsubscribe(client, payload) {
        const { symbol, timeframe } = payload;
        this.logger.log(`Client ${client.id} unsubscribed from ${symbol} / ${timeframe}`);
        const subscriptions = this.clientSubscriptions.get(client.id);
        const subscriptionToRemove = [...subscriptions].find(sub => sub.symbol === symbol && sub.timeframe === timeframe);
        if (subscriptionToRemove) {
            subscriptions.delete(subscriptionToRemove);
        }
        const room = this.getSubscriptionRoom(symbol, timeframe);
        client.leave(room);
        return { event: 'unsubscribed', data: { symbol, timeframe } };
    }
    getSubscriptionRoom(symbol, timeframe) {
        return `${symbol}-${timeframe}`;
    }
    startMarketDataSimulator() {
        const mockMarkets = [
            {
                id: '1',
                symbol: 'BTC-USD',
                name: 'Bitcoin',
                lastPrice: 60000,
                high24h: 61000,
                low24h: 59000,
                volume24h: 10000000,
            },
            {
                id: '2',
                symbol: 'ETH-USD',
                name: 'Ethereum',
                lastPrice: 3000,
                high24h: 3100,
                low24h: 2900,
                volume24h: 5000000,
            },
            {
                id: '3',
                symbol: 'SOL-USD',
                name: 'Solana',
                lastPrice: 150,
                high24h: 155,
                low24h: 145,
                volume24h: 2000000,
            },
        ];
        setInterval(() => {
            mockMarkets.forEach(market => {
                const priceChange = market.lastPrice * (Math.random() * 0.01 - 0.005);
                const newPrice = market.lastPrice + priceChange;
                const priceUpdate = {
                    price: newPrice,
                    high: Math.max(newPrice, market.high24h),
                    low: Math.min(newPrice, market.low24h),
                    open: market.lastPrice,
                    close: newPrice,
                    volume: market.volume24h * Math.random() * 0.01,
                    timestamp: new Date(),
                };
                market.lastPrice = newPrice;
                market.high24h = priceUpdate.high;
                market.low24h = priceUpdate.low;
                ['1m', '5m', '15m', '1h', '4h', '1d'].forEach(timeframe => {
                    const room = this.getSubscriptionRoom(market.symbol, timeframe);
                    this.server.to(room).emit('priceUpdate', {
                        symbol: market.symbol,
                        timeframe,
                        data: priceUpdate,
                    });
                });
            });
        }, 1000);
    }
};
exports.MarketsGateway = MarketsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MarketsGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('subscribe'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Object)
], MarketsGateway.prototype, "handleSubscribe", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('unsubscribe'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Object)
], MarketsGateway.prototype, "handleUnsubscribe", null);
exports.MarketsGateway = MarketsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [markets_service_1.MarketsService])
], MarketsGateway);
//# sourceMappingURL=markets.gateway.js.map