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
exports.Order = exports.OrderStatus = exports.OrderSide = exports.OrderType = void 0;
const typeorm_1 = require("typeorm");
var OrderType;
(function (OrderType) {
    OrderType["MARKET"] = "market";
    OrderType["LIMIT"] = "limit";
    OrderType["STOP"] = "stop";
    OrderType["STOP_LIMIT"] = "stop_limit";
})(OrderType || (exports.OrderType = OrderType = {}));
var OrderSide;
(function (OrderSide) {
    OrderSide["BUY"] = "buy";
    OrderSide["SELL"] = "sell";
})(OrderSide || (exports.OrderSide = OrderSide = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "pending";
    OrderStatus["OPEN"] = "open";
    OrderStatus["FILLED"] = "filled";
    OrderStatus["PARTIALLY_FILLED"] = "partially_filled";
    OrderStatus["CANCELED"] = "canceled";
    OrderStatus["REJECTED"] = "rejected";
    OrderStatus["EXPIRED"] = "expired";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
let Order = class Order {
};
exports.Order = Order;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Order.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Order.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Order.prototype, "marketId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: OrderType,
        default: OrderType.MARKET,
    }),
    __metadata("design:type", String)
], Order.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: OrderSide,
    }),
    __metadata("design:type", String)
], Order.prototype, "side", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.PENDING,
    }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 18, scale: 8 }),
    __metadata("design:type", Number)
], Order.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 18, scale: 8, nullable: true }),
    __metadata("design:type", Number)
], Order.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 18, scale: 8, nullable: true }),
    __metadata("design:type", Number)
], Order.prototype, "stopPrice", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 18, scale: 8, default: 0 }),
    __metadata("design:type", Number)
], Order.prototype, "filledAmount", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 18, scale: 8, default: 0 }),
    __metadata("design:type", Number)
], Order.prototype, "filledTotal", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 18, scale: 8, default: 0 }),
    __metadata("design:type", Number)
], Order.prototype, "fee", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], Order.prototype, "leverage", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 18, scale: 8, nullable: true }),
    __metadata("design:type", Number)
], Order.prototype, "liquidationPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "clientOrderId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Order.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Order.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Order.prototype, "filledAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Order.prototype, "canceledAt", void 0);
exports.Order = Order = __decorate([
    (0, typeorm_1.Entity)('orders')
], Order);
//# sourceMappingURL=order.entity.js.map