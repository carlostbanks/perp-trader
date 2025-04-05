// backend/src/orders/entities/order.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { User } from '../../users/entities/user.entity';
  import { Market } from '../../markets/entities/market.entity';
  
  export enum OrderType {
    MARKET = 'market',
    LIMIT = 'limit',
    STOP = 'stop',
    STOP_LIMIT = 'stop_limit',
  }
  
  export enum OrderSide {
    BUY = 'buy',
    SELL = 'sell',
  }
  
  export enum OrderStatus {
    PENDING = 'pending',
    OPEN = 'open',
    FILLED = 'filled',
    PARTIALLY_FILLED = 'partially_filled',
    CANCELED = 'canceled',
    REJECTED = 'rejected',
    EXPIRED = 'expired',
  }
  
  @Entity('orders')
  export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    userId: string;
  
    // @ManyToOne(() => User, user => user.orders)
    // @JoinColumn({ name: 'userId' })
    // user: User;
  
    @Column()
    marketId: string;
  
    // @ManyToOne(() => Market, market => market.orders)
    // @JoinColumn({ name: 'marketId' })
    // market: Market;
  
    @Column({
      type: 'enum',
      enum: OrderType,
      default: OrderType.MARKET,
    })
    type: OrderType;
  
    @Column({
      type: 'enum',
      enum: OrderSide,
    })
    side: OrderSide;
  
    @Column({
      type: 'enum',
      enum: OrderStatus,
      default: OrderStatus.PENDING,
    })
    status: OrderStatus;
  
    @Column('decimal', { precision: 18, scale: 8 })
    amount: number;
  
    @Column('decimal', { precision: 18, scale: 8, nullable: true })
    price: number;
  
    @Column('decimal', { precision: 18, scale: 8, nullable: true })
    stopPrice: number;
  
    @Column('decimal', { precision: 18, scale: 8, default: 0 })
    filledAmount: number;
  
    @Column('decimal', { precision: 18, scale: 8, default: 0 })
    filledTotal: number;
  
    @Column('decimal', { precision: 18, scale: 8, default: 0 })
    fee: number;
  
    @Column({ default: 1 })
    leverage: number;
  
    @Column('decimal', { precision: 18, scale: 8, nullable: true })
    liquidationPrice: number;
  
    @Column({ nullable: true })
    clientOrderId: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @Column({ nullable: true })
    filledAt: Date;
  
    @Column({ nullable: true })
    canceledAt: Date;
  }