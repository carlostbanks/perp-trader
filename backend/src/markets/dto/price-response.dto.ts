// backend/src/markets/dto/price-response.dto.ts
  import { ApiProperty } from '@nestjs/swagger';
  import { Exclude, Expose } from 'class-transformer';
  
  @Exclude()
  export class PriceResponseDto {
    @Expose()
    @ApiProperty()
    id: string;
  
    @Expose()
    @ApiProperty()
    price: number;
  
    @Expose()
    @ApiProperty()
    high: number;
  
    @Expose()
    @ApiProperty()
    low: number;
  
    @Expose()
    @ApiProperty()
    open: number;
  
    @Expose()
    @ApiProperty()
    close: number;
  
    @Expose()
    @ApiProperty()
    volume: number;
  
    @Expose()
    @ApiProperty()
    timeframe: string;
  
    @Expose()
    @ApiProperty()
    timestamp: Date;
  
    constructor(partial: Partial<PriceResponseDto>) {
      Object.assign(this, partial);
    }
  }