// backend/src/orders/dto/query-orders.dto.ts
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus, OrderSide } from '../entities/order.entity';

export class QueryOrdersDto {
  @ApiProperty({ 
    description: 'Market symbol (e.g., BTC-USD)', 
    required: false 
  })
  @IsOptional()
  @IsString()
  symbol?: string;

  @ApiProperty({ 
    enum: OrderStatus, 
    description: 'Order status', 
    required: false 
  })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @ApiProperty({ 
    enum: OrderSide, 
    description: 'Order side', 
    required: false 
  })
  @IsOptional()
  @IsEnum(OrderSide)
  side?: OrderSide;
}