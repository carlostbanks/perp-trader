// backend/src/markets/markets.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { Market } from './entities/market.entity';
import { Price } from './entities/price.entity';
import { CreateMarketDto } from './dto/create-market.dto';
import { UpdateMarketDto } from './dto/update-market.dto';

@Injectable()
export class MarketsService {
  constructor(
    @InjectRepository(Market)
    private readonly marketsRepository: Repository<Market>,
    @InjectRepository(Price)
    private readonly pricesRepository: Repository<Price>,
  ) {}

  async create(createMarketDto: CreateMarketDto): Promise<Market> {
    const market = this.marketsRepository.create(createMarketDto);
    return this.marketsRepository.save(market);
  }

  async findAll(): Promise<Market[]> {
    return this.marketsRepository.find();
  }

  async findAllActive(): Promise<Market[]> {
    return this.marketsRepository.find({
      where: { isActive: true },
      order: { volume24h: 'DESC' },
    });
  }

  async findTrending(): Promise<Market[]> {
    return this.marketsRepository.find({
      where: { isActive: true, isTrending: true },
      order: { changePercent24h: 'DESC' },
      take: 10,
    });
  }

  async findFeatured(): Promise<Market[]> {
    return this.marketsRepository.find({
      where: { isActive: true, isFeatured: true },
      order: { volume24h: 'DESC' },
      take: 5,
    });
  }

  async findOne(id: string): Promise<Market> {
    const market = await this.marketsRepository.findOne({ where: { id } });
    
    if (!market) {
      throw new NotFoundException(`Market with ID ${id} not found`);
    }
    
    return market;
  }

  async findBySymbol(symbol: string): Promise<Market> {
    const market = await this.marketsRepository.findOne({
      where: { symbol: symbol.toUpperCase() },
    });
    
    if (!market) {
      throw new NotFoundException(`Market with symbol ${symbol} not found`);
    }
    
    return market;
  }

  async update(id: string, updateMarketDto: UpdateMarketDto): Promise<Market> {
    const market = await this.findOne(id);
    
    Object.assign(market, updateMarketDto);
    return this.marketsRepository.save(market);
  }

  async remove(id: string): Promise<void> {
    const market = await this.findOne(id);
    await this.marketsRepository.remove(market);
  }

  async getPrices(
    marketId: string,
    timeframe: string,
    startTime?: Date,
    endTime?: Date,
    limit?: number,
  ): Promise<Price[]> {
    const whereConditions: any = {
      marketId,
      timeframe,
    };

    if (startTime && endTime) {
      whereConditions.timestamp = Between(startTime, endTime);
    } else if (startTime) {
      whereConditions.timestamp = MoreThanOrEqual(startTime);
    } else if (endTime) {
      whereConditions.timestamp = LessThanOrEqual(endTime);
    }

    return this.pricesRepository.find({
      where: whereConditions,
      order: { timestamp: 'ASC' },
      take: limit || 100,
    });
  }

  async addPrice(
    marketId: string,
    timeframe: string,
    price: number,
    high: number,
    low: number,
    open: number,
    close: number,
    volume: number,
    timestamp?: Date,
  ): Promise<Price> {
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
}