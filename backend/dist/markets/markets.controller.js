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
exports.MarketsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const markets_service_1 = require("./markets.service");
const create_market_dto_1 = require("./dto/create-market.dto");
const update_market_dto_1 = require("./dto/update-market.dto");
const get_prices_dto_1 = require("./dto/get-prices.dto");
const market_response_dto_1 = require("./dto/market-response.dto");
const price_response_dto_1 = require("./dto/price-response.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let MarketsController = class MarketsController {
    constructor(marketsService) {
        this.marketsService = marketsService;
    }
    async create(createMarketDto) {
        const market = await this.marketsService.create(createMarketDto);
        return new market_response_dto_1.MarketResponseDto(market);
    }
    async findAll() {
        const markets = await this.marketsService.findAll();
        return markets.map(market => new market_response_dto_1.MarketResponseDto(market));
    }
    async findAllActive() {
        const markets = await this.marketsService.findAllActive();
        return markets.map(market => new market_response_dto_1.MarketResponseDto(market));
    }
    async findTrending() {
        const markets = await this.marketsService.findTrending();
        return markets.map(market => new market_response_dto_1.MarketResponseDto(market));
    }
    async findFeatured() {
        const markets = await this.marketsService.findFeatured();
        return markets.map(market => new market_response_dto_1.MarketResponseDto(market));
    }
    async findOne(id) {
        const market = await this.marketsService.findOne(id);
        return new market_response_dto_1.MarketResponseDto(market);
    }
    async findBySymbol(symbol) {
        const market = await this.marketsService.findBySymbol(symbol);
        return new market_response_dto_1.MarketResponseDto(market);
    }
    async getPrices(id, getPricesDto) {
        const { timeframe, startTime, endTime, limit } = getPricesDto;
        const prices = await this.marketsService.getPrices(id, timeframe, startTime, endTime, limit);
        return prices.map(price => new price_response_dto_1.PriceResponseDto(price));
    }
    async update(id, updateMarketDto) {
        const market = await this.marketsService.update(id, updateMarketDto);
        return new market_response_dto_1.MarketResponseDto(market);
    }
    async remove(id) {
        return this.marketsService.remove(id);
    }
};
exports.MarketsController = MarketsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new market' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Market created successfully', type: market_response_dto_1.MarketResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_market_dto_1.CreateMarketDto]),
    __metadata("design:returntype", Promise)
], MarketsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all markets' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all markets', type: [market_response_dto_1.MarketResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MarketsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('active'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active markets' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all active markets', type: [market_response_dto_1.MarketResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MarketsController.prototype, "findAllActive", null);
__decorate([
    (0, common_1.Get)('trending'),
    (0, swagger_1.ApiOperation)({ summary: 'Get trending markets' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return trending markets', type: [market_response_dto_1.MarketResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MarketsController.prototype, "findTrending", null);
__decorate([
    (0, common_1.Get)('featured'),
    (0, swagger_1.ApiOperation)({ summary: 'Get featured markets' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return featured markets', type: [market_response_dto_1.MarketResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MarketsController.prototype, "findFeatured", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a market by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the market', type: market_response_dto_1.MarketResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Market not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MarketsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('symbol/:symbol'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a market by symbol' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the market', type: market_response_dto_1.MarketResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Market not found' }),
    __param(0, (0, common_1.Param)('symbol')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MarketsController.prototype, "findBySymbol", null);
__decorate([
    (0, common_1.Get)(':id/prices'),
    (0, swagger_1.ApiOperation)({ summary: 'Get prices for a market' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return prices', type: [price_response_dto_1.PriceResponseDto] }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Market not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, get_prices_dto_1.GetPricesDto]),
    __metadata("design:returntype", Promise)
], MarketsController.prototype, "getPrices", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update a market' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Market updated successfully', type: market_response_dto_1.MarketResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Market not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_market_dto_1.UpdateMarketDto]),
    __metadata("design:returntype", Promise)
], MarketsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a market' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Market deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Market not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MarketsController.prototype, "remove", null);
exports.MarketsController = MarketsController = __decorate([
    (0, swagger_1.ApiTags)('markets'),
    (0, common_1.Controller)('markets'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [markets_service_1.MarketsService])
], MarketsController);
//# sourceMappingURL=markets.controller.js.map