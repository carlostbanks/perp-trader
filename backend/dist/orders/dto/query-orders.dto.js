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
exports.QueryOrdersDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const order_entity_1 = require("../entities/order.entity");
class QueryOrdersDto {
}
exports.QueryOrdersDto = QueryOrdersDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Market symbol (e.g., BTC-USD)',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryOrdersDto.prototype, "symbol", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: order_entity_1.OrderStatus,
        description: 'Order status',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(order_entity_1.OrderStatus),
    __metadata("design:type", String)
], QueryOrdersDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: order_entity_1.OrderSide,
        description: 'Order side',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(order_entity_1.OrderSide),
    __metadata("design:type", String)
], QueryOrdersDto.prototype, "side", void 0);
//# sourceMappingURL=query-orders.dto.js.map