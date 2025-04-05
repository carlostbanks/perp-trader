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
exports.CreateMarketDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateMarketDto {
}
exports.CreateMarketDto = CreateMarketDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'BTC-USD', description: 'Market symbol' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMarketDto.prototype, "symbol", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'BTC', description: 'Base asset symbol' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMarketDto.prototype, "baseAsset", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'USD', description: 'Quote asset symbol' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMarketDto.prototype, "quoteAsset", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bitcoin', description: 'Market name' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMarketDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Bitcoin is a decentralized digital currency',
        description: 'Market description',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMarketDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://example.com/bitcoin.png',
        description: 'Logo URL',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateMarketDto.prototype, "logoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 60000, description: 'Last price' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateMarketDto.prototype, "lastPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 61000, description: '24-hour high' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateMarketDto.prototype, "high24h", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 59000, description: '24-hour low' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateMarketDto.prototype, "low24h", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10000000, description: '24-hour volume' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateMarketDto.prototype, "volume24h", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1000, description: '24-hour change' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateMarketDto.prototype, "change24h", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1.5, description: '24-hour change percentage' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateMarketDto.prototype, "changePercent24h", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1100000000000, description: 'Market capitalization' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateMarketDto.prototype, "marketCap", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Is market active', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateMarketDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, description: 'Is market trending', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateMarketDto.prototype, "isTrending", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, description: 'Is market featured', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateMarketDto.prototype, "isFeatured", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100, description: 'Maximum allowed leverage', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], CreateMarketDto.prototype, "maxLeverage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0.001, description: 'Taker fee', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(0.01),
    __metadata("design:type", Number)
], CreateMarketDto.prototype, "takerFee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0.001, description: 'Maker fee', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(0.01),
    __metadata("design:type", Number)
], CreateMarketDto.prototype, "makerFee", void 0);
//# sourceMappingURL=create-market.dto.js.map