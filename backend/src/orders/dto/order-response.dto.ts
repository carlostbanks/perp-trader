  // backend/src/orders/dto/order-response.dto.ts
  import { ApiProperty } from '@nestjs/swagger';
  import { Exclude, Expose, Type } from 'class-transformer';
  import { OrderType, OrderSide, OrderStatus } from '../entities/order.entity';
  
  @Exclude()
  export class OrderResponseDto {
    @Expose()
    @ApiProperty()
    id: string;
  
    @Expose()
    @ApiProperty()
    userId: string;
  
    @Expose()
    @ApiProperty()
    marketId: string;
  
    @Expose()
    @ApiProperty({ example: 'BTC-USD' })
    symbol: string;
  
    @Expose()
    @ApiProperty({ enum: OrderType })
    type: OrderType;
  
    @Expose()
    @ApiProperty({ enum: OrderSide })
    side: OrderSide;
  
    @Expose()
    @ApiProperty({ enum: OrderStatus })
    status: OrderStatus;
  
    @Expose()
    @ApiProperty()
    amount: number;
  
    @Expose()
    @ApiProperty()
    price: number;
  
    @Expose()
    @ApiProperty()
    stopPrice: number;
  
    @Expose()
    @ApiProperty()
    filledAmount: number;
  
    @Expose()
    @ApiProperty()
    filledTotal: number;
  
    @Expose()
    @ApiProperty()
    fee: number;
  
    @Expose()
    @ApiProperty()
    leverage: number;
  
    @Expose()
    @ApiProperty()
    liquidationPrice: number;
  
    @Expose()
    @ApiProperty()
    clientOrderId: string;
  
    @Expose()
    @ApiProperty()
    createdAt: Date;
  
    @Expose()
    @ApiProperty()
    updatedAt: Date;
  
    @Expose()
    @ApiProperty()
    filledAt: Date;
  
    @Expose()
    @ApiProperty()
    canceledAt: Date;
  
    constructor(partial: Partial<OrderResponseDto>) {
      Object.assign(this, partial);
    }
  }