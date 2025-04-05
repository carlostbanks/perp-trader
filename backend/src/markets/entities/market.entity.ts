// backend/src/markets/entities/market.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
  } from 'typeorm';
  
  @Entity('markets')
  export class Market {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ unique: true })
    symbol: string;
  
    @Column()
    baseAsset: string;
  
    @Column()
    quoteAsset: string;
  
    @Column()
    name: string;
  
    @Column({ nullable: true })
    description: string;
  
    @Column({ nullable: true })
    logoUrl: string;
  
    @Column('decimal', { precision: 18, scale: 8 })
    lastPrice: number;
  
    @Column('decimal', { precision: 18, scale: 8 })
    high24h: number;
  
    @Column('decimal', { precision: 18, scale: 8 })
    low24h: number;
  
    @Column('decimal', { precision: 18, scale: 8 })
    volume24h: number;
  
    @Column('decimal', { precision: 18, scale: 8 })
    change24h: number;
  
    @Column('decimal', { precision: 18, scale: 8 })
    changePercent24h: number;
  
    @Column('decimal', { precision: 18, scale: 2, default: 0 })
    marketCap: number;
  
    @Column({ default: true })
    isActive: boolean;
  
    @Column({ default: false })
    isTrending: boolean;
  
    @Column({ default: false })
    isFeatured: boolean;
  
    @Column('int', { default: 0 })
    maxLeverage: number;
  
    @Column('decimal', { precision: 5, scale: 4, default: 0.001 })
    takerFee: number;
  
    @Column('decimal', { precision: 5, scale: 4, default: 0.001 })
    makerFee: number;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    // Relationships will be added later
    // @OneToMany(() => Price, price => price.market)
    // prices: Price[];
  
    // @OneToMany(() => Order, order => order.market)
    // orders: Order[];
  }
  
