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
exports.GetPricesDto = exports.TimeframeEnum = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
var TimeframeEnum;
(function (TimeframeEnum) {
    TimeframeEnum["MINUTE_1"] = "1m";
    TimeframeEnum["MINUTE_5"] = "5m";
    TimeframeEnum["MINUTE_15"] = "15m";
    TimeframeEnum["HOUR_1"] = "1h";
    TimeframeEnum["HOUR_4"] = "4h";
    TimeframeEnum["DAY_1"] = "1d";
    TimeframeEnum["WEEK_1"] = "1w";
})(TimeframeEnum || (exports.TimeframeEnum = TimeframeEnum = {}));
class GetPricesDto {
}
exports.GetPricesDto = GetPricesDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: TimeframeEnum,
        description: 'Timeframe for price data',
        example: TimeframeEnum.HOUR_1
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(TimeframeEnum),
    __metadata("design:type", String)
], GetPricesDto.prototype, "timeframe", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Start time for price data range',
        required: false,
        example: '2023-01-01T00:00:00Z'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], GetPricesDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'End time for price data range',
        required: false,
        example: '2023-01-31T23:59:59Z'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], GetPricesDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Maximum number of price points to return',
        required: false,
        minimum: 1,
        maximum: 1000,
        example: 100
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(1000),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], GetPricesDto.prototype, "limit", void 0);
//# sourceMappingURL=get-prices.dto.js.map