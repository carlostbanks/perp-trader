// backend/src/markets/markets.controller.ts
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseGuards,
    ClassSerializerInterceptor,
    UseInterceptors,
  } from '@nestjs/common';
  import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
  import { MarketsService } from './markets.service';
  import { CreateMarketDto } from './dto/create-market.dto';
  import { UpdateMarketDto } from './dto/update-market.dto';
  import { GetPricesDto } from './dto/get-prices.dto';
  import { MarketResponseDto } from './dto/market-response.dto';
  import { PriceResponseDto } from './dto/price-response.dto';
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
  
  @ApiTags('markets')
  @Controller('markets')
  @UseInterceptors(ClassSerializerInterceptor)
  export class MarketsController {
    constructor(private readonly marketsService: MarketsService) {}
  
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new market' })
    @ApiResponse({ status: 201, description: 'Market created successfully', type: MarketResponseDto })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async create(@Body() createMarketDto: CreateMarketDto): Promise<MarketResponseDto> {
      const market = await this.marketsService.create(createMarketDto);
      return new MarketResponseDto(market);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get all markets' })
    @ApiResponse({ status: 200, description: 'Return all markets', type: [MarketResponseDto] })
    async findAll(): Promise<MarketResponseDto[]> {
      const markets = await this.marketsService.findAll();
      return markets.map(market => new MarketResponseDto(market));
    }
  
    @Get('active')
    @ApiOperation({ summary: 'Get all active markets' })
    @ApiResponse({ status: 200, description: 'Return all active markets', type: [MarketResponseDto] })
    async findAllActive(): Promise<MarketResponseDto[]> {
      const markets = await this.marketsService.findAllActive();
      return markets.map(market => new MarketResponseDto(market));
    }
  
    @Get('trending')
    @ApiOperation({ summary: 'Get trending markets' })
    @ApiResponse({ status: 200, description: 'Return trending markets', type: [MarketResponseDto] })
    async findTrending(): Promise<MarketResponseDto[]> {
      const markets = await this.marketsService.findTrending();
      return markets.map(market => new MarketResponseDto(market));
    }
  
    @Get('featured')
    @ApiOperation({ summary: 'Get featured markets' })
    @ApiResponse({ status: 200, description: 'Return featured markets', type: [MarketResponseDto] })
    async findFeatured(): Promise<MarketResponseDto[]> {
      const markets = await this.marketsService.findFeatured();
      return markets.map(market => new MarketResponseDto(market));
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get a market by ID' })
    @ApiResponse({ status: 200, description: 'Return the market', type: MarketResponseDto })
    @ApiResponse({ status: 404, description: 'Market not found' })
    async findOne(@Param('id') id: string): Promise<MarketResponseDto> {
      const market = await this.marketsService.findOne(id);
      return new MarketResponseDto(market);
    }
  
    @Get('symbol/:symbol')
    @ApiOperation({ summary: 'Get a market by symbol' })
    @ApiResponse({ status: 200, description: 'Return the market', type: MarketResponseDto })
    @ApiResponse({ status: 404, description: 'Market not found' })
    async findBySymbol(@Param('symbol') symbol: string): Promise<MarketResponseDto> {
      const market = await this.marketsService.findBySymbol(symbol);
      return new MarketResponseDto(market);
    }
  
    @Get(':id/prices')
    @ApiOperation({ summary: 'Get prices for a market' })
    @ApiResponse({ status: 200, description: 'Return prices', type: [PriceResponseDto] })
    @ApiResponse({ status: 404, description: 'Market not found' })
    async getPrices(
      @Param('id') id: string,
      @Query() getPricesDto: GetPricesDto,
    ): Promise<PriceResponseDto[]> {
      const { timeframe, startTime, endTime, limit } = getPricesDto;
      const prices = await this.marketsService.getPrices(id, timeframe, startTime, endTime, limit);
      return prices.map(price => new PriceResponseDto(price));
    }
  
    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a market' })
    @ApiResponse({ status: 200, description: 'Market updated successfully', type: MarketResponseDto })
    @ApiResponse({ status: 404, description: 'Market not found' })
    async update(
      @Param('id') id: string,
      @Body() updateMarketDto: UpdateMarketDto,
    ): Promise<MarketResponseDto> {
      const market = await this.marketsService.update(id, updateMarketDto);
      return new MarketResponseDto(market);
    }
  
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete a market' })
    @ApiResponse({ status: 200, description: 'Market deleted successfully' })
    @ApiResponse({ status: 404, description: 'Market not found' })
    async remove(@Param('id') id: string): Promise<void> {
      return this.marketsService.remove(id);
    }
  }