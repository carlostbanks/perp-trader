// backend/src/markets/markets.gateway.ts
import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    WsResponse,
  } from '@nestjs/websockets';
  import { Logger } from '@nestjs/common';
  import { Server, Socket } from 'socket.io';
  import { MarketsService } from './markets.service';
  import { Market } from './entities/market.entity';
  import { Price } from './entities/price.entity';
  
  interface SubscriptionInfo {
    symbol: string;
    timeframe: string;
  }
  
  @WebSocketGateway({
    cors: {
      origin: '*',
    },
  })
  export class MarketsGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
  {
    @WebSocketServer()
    server: Server;
  
    private logger: Logger = new Logger('MarketsGateway');
    private clientSubscriptions: Map<string, Set<SubscriptionInfo>> = new Map();
  
    constructor(private readonly marketsService: MarketsService) {}
  
    afterInit(server: Server) {
      this.logger.log('WebSocket Gateway initialized');
      
      // Start mock market data simulator
      this.startMarketDataSimulator();
    }
  
    handleConnection(client: Socket) {
      this.logger.log(`Client connected: ${client.id}`);
      this.clientSubscriptions.set(client.id, new Set());
    }
  
    handleDisconnect(client: Socket) {
      this.logger.log(`Client disconnected: ${client.id}`);
      this.clientSubscriptions.delete(client.id);
    }
  
    @SubscribeMessage('subscribe')
    handleSubscribe(client: Socket, payload: SubscriptionInfo): WsResponse<any> {
      const { symbol, timeframe } = payload;
      
      this.logger.log(`Client ${client.id} subscribed to ${symbol} / ${timeframe}`);
      
      // Add to client's subscriptions
      const subscriptions = this.clientSubscriptions.get(client.id);
      subscriptions.add({ symbol, timeframe });
      
      // Join the room for this symbol and timeframe
      const room = this.getSubscriptionRoom(symbol, timeframe);
      client.join(room);
      
      return { event: 'subscribed', data: { symbol, timeframe } };
    }
  
    @SubscribeMessage('unsubscribe')
    handleUnsubscribe(client: Socket, payload: SubscriptionInfo): WsResponse<any> {
      const { symbol, timeframe } = payload;
      
      this.logger.log(`Client ${client.id} unsubscribed from ${symbol} / ${timeframe}`);
      
      // Remove from client's subscriptions
      const subscriptions = this.clientSubscriptions.get(client.id);
      const subscriptionToRemove = [...subscriptions].find(
        sub => sub.symbol === symbol && sub.timeframe === timeframe
      );
      
      if (subscriptionToRemove) {
        subscriptions.delete(subscriptionToRemove);
      }
      
      // Leave the room for this symbol and timeframe
      const room = this.getSubscriptionRoom(symbol, timeframe);
      client.leave(room);
      
      return { event: 'unsubscribed', data: { symbol, timeframe } };
    }
  
    private getSubscriptionRoom(symbol: string, timeframe: string): string {
      return `${symbol}-${timeframe}`;
    }
  
    /**
     * In a real application, this would connect to a market data feed.
     * For this example, we'll simulate real-time price updates.
     */
    private startMarketDataSimulator() {
      const mockMarkets: Partial<Market>[] = [
        {
          id: '1',
          symbol: 'BTC-USD',
          name: 'Bitcoin',
          lastPrice: 60000,
          high24h: 61000,
          low24h: 59000,
          volume24h: 10000000,
        },
        {
          id: '2',
          symbol: 'ETH-USD',
          name: 'Ethereum',
          lastPrice: 3000,
          high24h: 3100,
          low24h: 2900,
          volume24h: 5000000,
        },
        {
          id: '3',
          symbol: 'SOL-USD',
          name: 'Solana',
          lastPrice: 150,
          high24h: 155,
          low24h: 145,
          volume24h: 2000000,
        },
      ];
  
      // Simulate real-time price updates every second
      setInterval(() => {
        mockMarkets.forEach(market => {
          const priceChange = market.lastPrice * (Math.random() * 0.01 - 0.005); // -0.5% to +0.5%
          const newPrice = market.lastPrice + priceChange;
          
          const priceUpdate: Partial<Price> = {
            price: newPrice,
            high: Math.max(newPrice, market.high24h),
            low: Math.min(newPrice, market.low24h),
            open: market.lastPrice,
            close: newPrice,
            volume: market.volume24h * Math.random() * 0.01,
            timestamp: new Date(),
          };
          
          // Update the mock market price
          market.lastPrice = newPrice;
          market.high24h = priceUpdate.high;
          market.low24h = priceUpdate.low;
          
          // Broadcast price updates for different timeframes
          ['1m', '5m', '15m', '1h', '4h', '1d'].forEach(timeframe => {
            const room = this.getSubscriptionRoom(market.symbol, timeframe);
            this.server.to(room).emit('priceUpdate', {
              symbol: market.symbol,
              timeframe,
              data: priceUpdate,
            });
          });
        });
      }, 1000);
    }
  }