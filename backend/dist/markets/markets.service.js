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
exports.MarketsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const market_entity_1 = require("./entities/market.entity");
const price_entity_1 = require("./entities/price.entity");
let MarketsService = class MarketsService {
    constructor(marketsRepository, pricesRepository) {
        this.marketsRepository = marketsRepository;
        this.pricesRepository = pricesRepository;
    }
    async create(createMarketDto) {
        const market = this.marketsRepository.create(createMarketDto);
        return this.marketsRepository.save(market);
    }
    async findAll() {
        return this.marketsRepository.find();
    }
    async findAllActive() {
        return this.marketsRepository.find({
            where: { isActive: true },
            order: { volume24h: 'DESC' },
        });
    }
    async findTrending() {
        return this.marketsRepository.find({
            where: { isActive: true, isTrending: true },
            order: { changePercent24h: 'DESC' },
            take: 10,
        });
    }
    async findFeatured() {
        return this.marketsRepository.find({
            where: { isActive: true, isFeatured: true },
            order: { volume24h: 'DESC' },
            take: 5,
        });
    }
    async findOne(id) {
        const market = await this.marketsRepository.findOne({ where: { id } });
        if (!market) {
            throw new common_1.NotFoundException(`Market with ID ${id} not found`);
        }
        return market;
    }
    async findBySymbol(symbol) {
        const market = await this.marketsRepository.findOne({
            where: { symbol: symbol.toUpperCase() },
        });
        if (!market) {
            throw new common_1.NotFoundException(`Market with symbol ${symbol} not found`);
        }
        return market;
    }
    async update(id, updateMarketDto) {
        const market = await this.findOne(id);
        Object.assign(market, updateMarketDto);
        return this.marketsRepository.save(market);
    }
    async remove(id) {
        const market = await this.findOne(id);
        await this.marketsRepository.remove(market);
    }
    async getPrices(marketId, timeframe, startTime, endTime, limit) {
        const whereConditions = {
            marketId,
            timeframe,
        };
        if (startTime && endTime) {
            whereConditions.timestamp = (0, typeorm_2.Between)(startTime, endTime);
        }
        else if (startTime) {
            whereConditions.timestamp = (0, typeorm_2.MoreThanOrEqual)(startTime);
        }
        else if (endTime) {
            whereConditions.timestamp = (0, typeorm_2.LessThanOrEqual)(endTime);
        }
        return this.pricesRepository.find({
            where: whereConditions,
            order: { timestamp: 'ASC' },
            take: limit || 100,
        });
    }
    async addPrice(marketId, timeframe, price, high, low, open, close, volume, timestamp) {
        const priceEntity = this.pricesRepository.create({
            marketId,
            timeframe,
            price,
            high,
            low,
            open,
            close,
            volume,
            timestamp: timestamp || new Date(),
        });
        return this.pricesRepository.save(priceEntity);
    }
};
exports.MarketsService = MarketsService;
exports.MarketsService = MarketsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(market_entity_1.Market)),
    __param(1, (0, typeorm_1.InjectRepository)(price_entity_1.Price)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MarketsService);
//# sourceMappingURL=markets.service.js.map