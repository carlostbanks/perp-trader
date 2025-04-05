"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const markets_service_1 = require("./markets.service");
const markets_controller_1 = require("./markets.controller");
const markets_gateway_1 = require("./markets.gateway");
const market_entity_1 = require("./entities/market.entity");
const price_entity_1 = require("./entities/price.entity");
let MarketsModule = class MarketsModule {
};
exports.MarketsModule = MarketsModule;
exports.MarketsModule = MarketsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([market_entity_1.Market, price_entity_1.Price])],
        controllers: [markets_controller_1.MarketsController],
        providers: [markets_service_1.MarketsService, markets_gateway_1.MarketsGateway],
        exports: [markets_service_1.MarketsService],
    })
], MarketsModule);
//# sourceMappingURL=markets.module.js.map