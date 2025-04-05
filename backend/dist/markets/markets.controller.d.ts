import { MarketsService } from './markets.service';
import { CreateMarketDto } from './dto/create-market.dto';
import { UpdateMarketDto } from './dto/update-market.dto';
import { GetPricesDto } from './dto/get-prices.dto';
import { MarketResponseDto } from './dto/market-response.dto';
import { PriceResponseDto } from './dto/price-response.dto';
export declare class MarketsController {
    private readonly marketsService;
    constructor(marketsService: MarketsService);
    create(createMarketDto: CreateMarketDto): Promise<MarketResponseDto>;
    findAll(): Promise<MarketResponseDto[]>;
    findAllActive(): Promise<MarketResponseDto[]>;
    findTrending(): Promise<MarketResponseDto[]>;
    findFeatured(): Promise<MarketResponseDto[]>;
    findOne(id: string): Promise<MarketResponseDto>;
    findBySymbol(symbol: string): Promise<MarketResponseDto>;
    getPrices(id: string, getPricesDto: GetPricesDto): Promise<PriceResponseDto[]>;
    update(id: string, updateMarketDto: UpdateMarketDto): Promise<MarketResponseDto>;
    remove(id: string): Promise<void>;
}
