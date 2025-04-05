// backend/src/markets/dto/create-market.dto.ts
import { 
    IsNotEmpty, 
    IsString, 
    IsNumber, 
    IsOptional, 
    IsBoolean,
    IsUrl,
    Min,
    Max,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class CreateMarketDto {
    @ApiProperty({ example: 'BTC-USD', description: 'Market symbol' })
    @IsNotEmpty()
    @IsString()
    symbol: string;
  
    @ApiProperty({ example: 'BTC', description: 'Base asset symbol' })
    @IsNotEmpty()
    @IsString()
    baseAsset: string;
  
    @ApiProperty({ example: 'USD', description: 'Quote asset symbol' })
    @IsNotEmpty()
    @IsString()
    quoteAsset: string;
  
    @ApiProperty({ example: 'Bitcoin', description: 'Market name' })
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @ApiProperty({ 
      example: 'Bitcoin is a decentralized digital currency', 
      description: 'Market description',
      required: false,
    })
    @IsOptional()
    @IsString()
    description?: string;
  
    @ApiProperty({ 
      example: 'https://example.com/bitcoin.png', 
      description: 'Logo URL',
      required: false,
    })
    @IsOptional()
    @IsUrl()
    logoUrl?: string;
  
    @ApiProperty({ example: 60000, description: 'Last price' })
    @IsNotEmpty()
    @IsNumber()
    lastPrice: number;
  
    @ApiProperty({ example: 61000, description: '24-hour high' })
    @IsNotEmpty()
    @IsNumber()
    high24h: number;
  
    @ApiProperty({ example: 59000, description: '24-hour low' })
    @IsNotEmpty()
    @IsNumber()
    low24h: number;
  
    @ApiProperty({ example: 10000000, description: '24-hour volume' })
    @IsNotEmpty()
    @IsNumber()
    volume24h: number;
  
    @ApiProperty({ example: 1000, description: '24-hour change' })
    @IsNotEmpty()
    @IsNumber()
    change24h: number;
  
    @ApiProperty({ example: 1.5, description: '24-hour change percentage' })
    @IsNotEmpty()
    @IsNumber()
    changePercent24h: number;
  
    @ApiProperty({ example: 1100000000000, description: 'Market capitalization' })
    @IsNotEmpty()
    @IsNumber()
    marketCap: number;
  
    @ApiProperty({ example: true, description: 'Is market active', required: false })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
  
    @ApiProperty({ example: false, description: 'Is market trending', required: false })
    @IsOptional()
    @IsBoolean()
    isTrending?: boolean;
  
    @ApiProperty({ example: false, description: 'Is market featured', required: false })
    @IsOptional()
    @IsBoolean()
    isFeatured?: boolean;
  
    @ApiProperty({ example: 100, description: 'Maximum allowed leverage', required: false })
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(100)
    maxLeverage?: number;
  
    @ApiProperty({ example: 0.001, description: 'Taker fee', required: false })
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(0.01)
    takerFee?: number;
  
    @ApiProperty({ example: 0.001, description: 'Maker fee', required: false })
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(0.01)
    makerFee?: number;
  }