  // backend/src/markets/dto/get-prices.dto.ts
  import { 
    IsNotEmpty, 
    IsString, 
    IsOptional, 
    IsDate, 
    IsNumber,
    IsEnum,
    Min,
    Max,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  import { ApiProperty } from '@nestjs/swagger';
  
  export enum TimeframeEnum {
    MINUTE_1 = '1m',
    MINUTE_5 = '5m',
    MINUTE_15 = '15m',
    HOUR_1 = '1h',
    HOUR_4 = '4h',
    DAY_1 = '1d',
    WEEK_1 = '1w',
  }
  
  export class GetPricesDto {
    @ApiProperty({ 
      enum: TimeframeEnum, 
      description: 'Timeframe for price data',
      example: TimeframeEnum.HOUR_1
    })
    @IsNotEmpty()
    @IsEnum(TimeframeEnum)
    timeframe: TimeframeEnum;
  
    @ApiProperty({ 
      description: 'Start time for price data range', 
      required: false,
      example: '2023-01-01T00:00:00Z'
    })
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    startTime?: Date;
  
    @ApiProperty({ 
      description: 'End time for price data range', 
      required: false,
      example: '2023-01-31T23:59:59Z'
    })
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    endTime?: Date;
  
    @ApiProperty({ 
      description: 'Maximum number of price points to return', 
      required: false,
      minimum: 1,
      maximum: 1000,
      example: 100
    })
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(1000)
    @Type(() => Number)
    limit?: number;
  }