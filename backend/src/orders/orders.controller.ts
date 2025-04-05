// backend/src/orders/orders.controller.ts
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Request,
    Query,
    ClassSerializerInterceptor,
    UseInterceptors,
  } from '@nestjs/common';
  import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
  import { OrdersService } from './orders.service';
  import { CreateOrderDto } from './dto/create-order.dto';
  import { UpdateOrderDto } from './dto/update-order.dto';
  import { OrderResponseDto } from './dto/order-response.dto';
  import { QueryOrdersDto } from './dto/query-orders.dto';
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
  
  @ApiTags('orders')
  @Controller('orders')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}
  
    @Post()
    @ApiOperation({ summary: 'Create a new order' })
    @ApiResponse({ status: 201, description: 'Order created successfully', type: OrderResponseDto })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 404, description: 'Market not found' })
    async create(
      @Request() req,
      @Body() createOrderDto: CreateOrderDto,
    ): Promise<OrderResponseDto> {
      const order = await this.ordersService.create(req.user.id, createOrderDto);
      return new OrderResponseDto(order);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get all orders for current user' })
    @ApiResponse({ status: 200, description: 'Return all orders', type: [OrderResponseDto] })
    async findAll(
      @Request() req,
      @Query() queryOptions: QueryOrdersDto,
    ): Promise<OrderResponseDto[]> {
      const orders = await this.ordersService.findAll(req.user.id, queryOptions);
      return orders.map(order => new OrderResponseDto(order));
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get an order by ID' })
    @ApiResponse({ status: 200, description: 'Return the order', type: OrderResponseDto })
    @ApiResponse({ status: 404, description: 'Order not found' })
    async findOne(
      @Request() req,
      @Param('id') id: string,
    ): Promise<OrderResponseDto> {
      const order = await this.ordersService.findOne(req.user.id, id);
      return new OrderResponseDto(order);
    }
  
    @Patch(':id')
    @ApiOperation({ summary: 'Update an order' })
    @ApiResponse({ status: 200, description: 'Order updated successfully', type: OrderResponseDto })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 404, description: 'Order not found' })
    async update(
      @Request() req,
      @Param('id') id: string,
      @Body() updateOrderDto: UpdateOrderDto,
    ): Promise<OrderResponseDto> {
      const order = await this.ordersService.update(req.user.id, id, updateOrderDto);
      return new OrderResponseDto(order);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Cancel an order' })
    @ApiResponse({ status: 200, description: 'Order canceled successfully', type: OrderResponseDto })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 404, description: 'Order not found' })
    async cancel(
      @Request() req,
      @Param('id') id: string,
    ): Promise<OrderResponseDto> {
      const order = await this.ordersService.cancel(req.user.id, id);
      return new OrderResponseDto(order);
    }
  }