import { Repository } from 'typeorm';
import { Market } from './entities/market.entity';
import { Price } from './entities/price.entity';
import { CreateMarketDto } from './dto/create-market.dto';
import { UpdateMarketDto } from './dto/update-market.dto';
export declare class MarketsService {
    private readonly marketsRepository;
    private readonly pricesRepository;
    constructor(marketsRepository: Repository<Market>, pricesRepository: Repository<Price>);
    create(createMarketDto: CreateMarketDto): Promise<Market>;
    findAll(): Promise<Market[]>;
    findAllActive(): Promise<Market[]>;
    findTrending(): Promise<Market[]>;
    findFeatured(): Promise<Market[]>;
    findOne(id: string): Promise<Market>;
    findBySymbol(symbol: string): Promise<Market>;
    update(id: string, updateMarketDto: UpdateMarketDto): Promise<Market>;
    remove(id: string): Promise<void>;
    getPrices(marketId: string, timeframe: string, startTime?: Date, endTime?: Date, limit?: number): Promise<Price[]>;
    addPrice(marketId: string, timeframe: string, price: number, high: number, low: number, open: number, close: number, volume: number, timestamp?: Date): Promise<Price>;
}
