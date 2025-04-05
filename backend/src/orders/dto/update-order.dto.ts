// backend/src/orders/dto/update-order.dto.ts
  import { PartialType } from '@nestjs/swagger';
  import { IsEnum, IsOptional } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  import { CreateOrderDto } from './create-order.dto';
  import { OrderStatus } from '../entities/order.entity';
  
  export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    @ApiProperty({ 
      enum: OrderStatus, 
      description: 'Order status', 
      required: false 
    })
    @IsOptional()
    @IsEnum(OrderStatus)
    status?: OrderStatus;
  }