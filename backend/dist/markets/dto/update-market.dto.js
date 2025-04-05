"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMarketDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_market_dto_1 = require("./create-market.dto");
class UpdateMarketDto extends (0, swagger_1.PartialType)(create_market_dto_1.CreateMarketDto) {
}
exports.UpdateMarketDto = UpdateMarketDto;
//# sourceMappingURL=update-market.dto.js.map