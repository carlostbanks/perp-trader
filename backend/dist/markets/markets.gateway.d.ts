import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WsResponse } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MarketsService } from './markets.service';
interface SubscriptionInfo {
    symbol: string;
    timeframe: string;
}
export declare class MarketsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly marketsService;
    server: Server;
    private logger;
    private clientSubscriptions;
    constructor(marketsService: MarketsService);
    afterInit(server: Server): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleSubscribe(client: Socket, payload: SubscriptionInfo): WsResponse<any>;
    handleUnsubscribe(client: Socket, payload: SubscriptionInfo): WsResponse<any>;
    private getSubscriptionRoom;
    private startMarketDataSimulator;
}
export {};
