// backend/src/markets/markets.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketsService } from './markets.service';
import { MarketsController } from './markets.controller';
import { MarketsGateway } from './markets.gateway';
import { Market } from './entities/market.entity';
import { Price } from './entities/price.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Market, Price])],
  controllers: [MarketsController],
  providers: [MarketsService, MarketsGateway],
  exports: [MarketsService],
})
export class MarketsModule {}