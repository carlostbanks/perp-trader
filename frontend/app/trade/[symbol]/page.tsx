// app/trade/[symbol]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import Chart from '../components/Chart';
import OrderForm from '../components/OrderForm';
import MobileBottomNav from '../../components/layout/MobileBottomNav';

interface TokenInfo {
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  volume24h: string;
  marketCap: string;
}

export default function TradePage() {
  const params = useParams();
  const symbol = (params?.symbol as string || 'btc').toUpperCase();
  
  const [tokenInfo, setTokenInfo] = useState<TokenInfo>({
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 60250.75,
    change24h: 2.45,
    volume24h: '$5.2B',
    marketCap: '$1.2T',
  });
  
  useEffect(() => {
    // In a real app, fetch token info from an API
    // For now, we'll use mock data based on the symbol
    const mockTokens: Record<string, TokenInfo> = {
      BTC: {
        name: 'Bitcoin',
        symbol: 'BTC',
        price: 60250.75,
        change24h: 2.45,
        volume24h: '$5.2B',
        marketCap: '$1.2T',
      },
      ETH: {
        name: 'Ethereum',
        symbol: 'ETH',
        price: 3450.25,
        change24h: 1.32,
        volume24h: '$2.8B',
        marketCap: '$420B',
      },
      SOL: {
        name: 'Solana',
        symbol: 'SOL',
        price: 134.86,
        change24h: -1.68,
        volume24h: '$1.5B',
        marketCap: '$58B',
      },
    };
    
    if (mockTokens[symbol]) {
      setTokenInfo(mockTokens[symbol]);
    } else {
      // Default mock data for unknown tokens
      setTokenInfo({
        name: symbol,
        symbol: symbol,
        price: 0.543,
        change24h: 15.7,
        volume24h: '$28M',
        marketCap: '$125M',
      });
    }
  }, [symbol]);
  
  return (
    <main className="min-h-screen bg-background pb-20">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <Link href="/dashboard" className="mr-2">
            <FiArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-xl font-bold">{tokenInfo.name} ({tokenInfo.symbol})</h1>
            <div className="flex items-center">
              <span className="text-lg font-medium mr-2">
                ${tokenInfo.price.toFixed(2)}
              </span>
              <span className={`text-sm ${
                tokenInfo.change24h >= 0 
                  ? 'text-accent-green' 
                  : 'text-accent-red'
              }`}>
                {tokenInfo.change24h >= 0 ? '+' : ''}{tokenInfo.change24h}%
              </span>
            </div>
          </div>
        </div>
        
        <Chart symbol={tokenInfo.symbol} timeframe="1d" />
        
        <div className="mt-6 flex justify-between text-sm text-gray-400 mb-4">
          <div>
            <div>24h Volume</div>
            <div className="text-white">{tokenInfo.volume24h}</div>
          </div>
          <div>
            <div>Market Cap</div>
            <div className="text-white">{tokenInfo.marketCap}</div>
          </div>
          <div>
            <div>All-Time High</div>
            <div className="text-white">${(tokenInfo.price * 1.5).toFixed(2)}</div>
          </div>
        </div>
        
        <OrderForm symbol={tokenInfo.symbol} price={tokenInfo.price} />
      </div>
      
      <MobileBottomNav />
    </main>
  );
}