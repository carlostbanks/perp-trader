  // backend/src/markets/dto/market-response.dto.ts
  import { ApiProperty } from '@nestjs/swagger';
  import { Exclude, Expose } from 'class-transformer';
  
  @Exclude()
  export class MarketResponseDto {
    @Expose()
    @ApiProperty()
    id: string;
  
    @Expose()
    @ApiProperty()
    symbol: string;
  
    @Expose()
    @ApiProperty()
    baseAsset: string;
  
    @Expose()
    @ApiProperty()
    quoteAsset: string;
  
    @Expose()
    @ApiProperty()
    name: string;
  
    @Expose()
    @ApiProperty()
    description: string;
  
    @Expose()
    @ApiProperty()
    logoUrl: string;
  
    @Expose()
    @ApiProperty()
    lastPrice: number;
  
    @Expose()
    @ApiProperty()
    high24h: number;
  
    @Expose()
    @ApiProperty()
    low24h: number;
  
    @Expose()
    @ApiProperty()
    volume24h: number;
  
    @Expose()
    @ApiProperty()
    change24h: number;
  
    @Expose()
    @ApiProperty()
    changePercent24h: number;
  
    @Expose()
    @ApiProperty()
    marketCap: number;
  
    @Expose()
    @ApiProperty()
    isActive: boolean;
  
    @Expose()
    @ApiProperty()
    isTrending: boolean;
  
    @Expose()
    @ApiProperty()
    isFeatured: boolean;
  
    @Expose()
    @ApiProperty()
    maxLeverage: number;
  
    @Expose()
    @ApiProperty()
    takerFee: number;
  
    @Expose()
    @ApiProperty()
    makerFee: number;
  
    constructor(partial: Partial<MarketResponseDto>) {
      Object.assign(this, partial);
    }
  }
  