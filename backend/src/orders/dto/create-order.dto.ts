// backend/src/orders/dto/create-order.dto.ts
import {
    IsNotEmpty,
    IsEnum,
    IsNumber,
    IsOptional,
    IsString,
    Min,
    Max,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  import { OrderType, OrderSide } from '../entities/order.entity';
  
  export class CreateOrderDto {
    @ApiProperty({ example: 'BTC-USD', description: 'Market symbol' })
    @IsNotEmpty()
    @IsString()
    symbol: string;
  
    @ApiProperty({ 
      enum: OrderType, 
      example: OrderType.MARKET, 
      description: 'Order type' 
    })
    @IsNotEmpty()
    @IsEnum(OrderType)
    type: OrderType;
  
    @ApiProperty({ 
      enum: OrderSide, 
      example: OrderSide.BUY, 
      description: 'Order side' 
    })
    @IsNotEmpty()
    @IsEnum(OrderSide)
    side: OrderSide;
  
    @ApiProperty({ example: 0.1, description: 'Order amount' })
    @IsNotEmpty()
    @IsNumber()
    @Min(0.000001)
    amount: number;
  
    @ApiProperty({ 
      example: 60000, 
      description: 'Order price (required for limit orders)', 
      required: false 
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    price?: number;
  
    @ApiProperty({ 
      example: 59000, 
      description: 'Stop price (required for stop orders)', 
      required: false 
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    stopPrice?: number;
  
    @ApiProperty({ 
      example: 5, 
      description: 'Leverage (1-100)', 
      required: false,
      default: 1 
    })
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(100)
    leverage?: number;
  
    @ApiProperty({ 
      example: 'my-order-123', 
      description: 'Client order ID for tracking', 
      required: false 
    })
    @IsOptional()
    @IsString()
    clientOrderId?: string;
  }