// app/explore/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiSearch } from 'react-icons/fi';
import MobileBottomNav from '../components/layout/MobileBottomNav';

interface Token {
  id: string;
  name: string;
  symbol: string;
  logoUrl: string;
  price: number;
  priceChange: number;
  liquidity: string;
  volume: string;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

// Mock data
const mockFeaturedTokens: Token[] = [
  {
    id: '1',
    name: 'Robinhood',
    symbol: 'HOOD',
    logoUrl: '',
    price: 0.008354,
    priceChange: 775.9,
    liquidity: '1.2M',
    volume: '111.9M',
  },
];

const mockTrendingTokens: Token[] = [
  {
    id: '2',
    name: 'Lux Token',
    symbol: 'LUX',
    logoUrl: '',
    price: 0.0185,
    priceChange: 180.6,
    liquidity: '2.5M',
    volume: '193.8M',
  },
];

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'AI Agents',
    icon: <span className="text-green-400">🤖</span>,
  },
  {
    id: '2',
    name: "Ansem's favorites",
    icon: <span>👨‍💻</span>,
  },
];

export default function ExplorePage() {
  const [timeFilter, setTimeFilter] = useState<'1h' | '6h' | '24h'>('24h');

  return (
    <main className="min-h-screen bg-background pb-20">
      <div className="p-4">
        <div className="relative mb-6">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for ticker"
            className="w-full bg-secondary border border-muted rounded-lg pl-10 pr-4 py-3 text-white"
          />
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Explore</h2>
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {mockCategories.map((category) => (
              <Link
                key={category.id}
                href={`/explore/category/${category.id}`}
                className="flex items-center space-x-2 bg-secondary rounded-full px-4 py-2 min-w-max"
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  {category.icon}
                </div>
                <span>{category.name}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Featured</h2>
            <div className="text-xs text-gray-400">Powered by Bullpen AI</div>
          </div>
          
          {mockFeaturedTokens.map((token) => (
            <div key={token.id} className="bg-secondary rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-400 flex items-center justify-center mr-3">
                    {token.logoUrl ? (
                      <Image
                        src={token.logoUrl}
                        alt={token.name}
                        width={32}
                        height={32}
                      />
                    ) : (
                      <span className="text-xs">{token.symbol.slice(0, 2)}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold">{token.symbol}</h3>
                    <p className="text-xs text-gray-400">{token.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">${token.priceChange.toFixed(1)}M</p>
                  <p className="text-xs text-green-400">24h: {token.priceChange.toFixed(1)}%</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-400">Price</p>
                  <p className="font-medium">${token.price.toFixed(token.price < 0.01 ? 5 : 2)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Liquidity</p>
                  <p className="font-medium">{token.liquidity}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Volume</p>
                  <p className="font-medium">{token.volume}</p>
                </div>
                <Link 
                  href={`/trade/${token.symbol.toLowerCase()}`}
                  className="bg-primary text-black px-4 py-1 rounded-md text-sm font-medium"
                >
                  Buy
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Trending</h2>
            <div className="flex bg-secondary rounded-lg overflow-hidden">
              {['1h', '6h', '24h'].map((time) => (
                <button
                  key={time}
                  onClick={() => setTimeFilter(time as '1h' | '6h' | '24h')}
                  className={`px-3 py-1 text-sm ${
                    timeFilter === time ? 'bg-muted' : ''
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
          
          {mockTrendingTokens.map((token) => (
            <div key={token.id} className="bg-secondary rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-red-400 flex items-center justify-center mr-3">
                    {token.logoUrl ? (
                      <Image
                        src={token.logoUrl}
                        alt={token.name}
                        width={32}
                        height={32}
                      />
                    ) : (
                      <span className="text-xs">{token.symbol.slice(0, 2)}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold">{token.symbol}</h3>
                    <div className="flex items-center text-xs">
                      <span className="text-gray-400 mr-1">P: ${token.price.toFixed(token.price < 0.01 ? 4 : 2)}</span>
                      <span className="text-gray-400 mr-1">L: {token.liquidity}</span>
                      <span className="text-gray-400">V: {token.volume}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">${token.priceChange.toFixed(1)}M</p>
                  <p className="text-xs text-green-400">24h: {token.priceChange.toFixed(1)}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <MobileBottomNav />
    </main>
  );
}