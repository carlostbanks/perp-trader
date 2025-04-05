  // backend/src/markets/entities/price.entity.ts
  import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Market } from './market.entity';
  
  @Entity('prices')
  export class Price {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    marketId: string;
  
    // @ManyToOne(() => Market, market => market.prices)
    // @JoinColumn({ name: 'marketId' })
    // market: Market;
  
    @Column('decimal', { precision: 18, scale: 8 })
    price: number;
  
    @Column('decimal', { precision: 18, scale: 8 })
    high: number;
  
    @Column('decimal', { precision: 18, scale: 8 })
    low: number;
  
    @Column('decimal', { precision: 18, scale: 8 })
    open: number;
  
    @Column('decimal', { precision: 18, scale: 8 })
    close: number;
  
    @Column('decimal', { precision: 18, scale: 8 })
    volume: number;
  
    @Column('varchar')
    timeframe: string; // '1m', '5m', '15m', '1h', '4h', '1d', '1w'
  
    @CreateDateColumn()
    timestamp: Date;
  }