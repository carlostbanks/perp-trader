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
exports.Market = void 0;
const typeorm_1 = require("typeorm");
let Market = class Market {
};
exports.Market = Market;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Market.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Market.prototype, "symbol", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Market.prototype, "baseAsset", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Market.prototype, "quoteAsset", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Market.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Market.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Market.prototype, "logoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 18, scale: 8 }),
    __metadata("design:type", Number)
], Market.prototype, "lastPrice", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 18, scale: 8 }),
    __metadata("design:type", Number)
], Market.prototype, "high24h", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 18, scale: 8 }),
    __metadata("design:type", Number)
], Market.prototype, "low24h", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 18, scale: 8 }),
    __metadata("design:type", Number)
], Market.prototype, "volume24h", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 18, scale: 8 }),
    __metadata("design:type", Number)
], Market.prototype, "change24h", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 18, scale: 8 }),
    __metadata("design:type", Number)
], Market.prototype, "changePercent24h", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 18, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Market.prototype, "marketCap", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Market.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Market.prototype, "isTrending", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Market.prototype, "isFeatured", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { default: 0 }),
    __metadata("design:type", Number)
], Market.prototype, "maxLeverage", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 5, scale: 4, default: 0.001 }),
    __metadata("design:type", Number)
], Market.prototype, "takerFee", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 5, scale: 4, default: 0.001 }),
    __metadata("design:type", Number)
], Market.prototype, "makerFee", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Market.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Market.prototype, "updatedAt", void 0);
exports.Market = Market = __decorate([
    (0, typeorm_1.Entity)('markets')
], Market);
//# sourceMappingURL=market.entity.js.map