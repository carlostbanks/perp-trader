// app/signals/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowDown, FiShare } from 'react-icons/fi';
import MobileBottomNav from '../components/layout/MobileBottomNav';

interface Trader {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  performance: string;
  pickedAmount: string;
  currentAmount: string;
  daysAgo: number;
  multiplier: number;
  volume: string;
  liquidity: string;
  accuracy: number;
}

const mockTraders: Trader[] = [
  {
    id: '1',
    name: 'Irena Aizen',
    username: 'zenRAYO',
    avatarUrl: '',
    performance: '109.4x',
    pickedAmount: '131.7K',
    currentAmount: '1.5M',
    daysAgo: 6,
    multiplier: 11.4,
    volume: '3.6M',
    liquidity: '255.7K',
    accuracy: 100,
  },
  {
    id: '2',
    name: 'Murad',
    username: 'Sean_eth',
    avatarUrl: '',
    performance: '104.9x',
    pickedAmount: '210.4K',
    currentAmount: '1.0M',
    daysAgo: 7,
    multiplier: 4.9,
    volume: '542.7K',
    liquidity: '276.4K',
    accuracy: 100,
  },
  {
    id: '3',
    name: 'OFFICIAL TRUMP',
    username: 'Cattsby',
    avatarUrl: '',
    performance: '99.2x',
    pickedAmount: '749.4M',
    currentAmount: '25.9B',
    daysAgo: 14,
    multiplier: 34.5,
    volume: '86.9M',
    liquidity: '692.0M',
    accuracy: 48.1,
  },
];

export default function SignalsPage() {
  const [activeTab, setActiveTab] = useState<'picks' | 'traders' | 'groups'>('picks');
  const [activeFilter, setActiveFilter] = useState<'top' | 'following'>('top');
  const [sortOrder, setSecondarySortOrder] = useState<'best' | '30d'>('best');

  return (
    <main className="min-h-screen bg-background pb-20">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold">Bullpen</h1>
            <div className="w-8 h-8 bg-purple-600 rounded-md overflow-hidden">
              {/* Avatar image would go here */}
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="p-2">
              <FiArrowDown size={20} />
            </button>
            <button className="p-2">
              <span>⋯</span>
            </button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-muted mb-4">
          {[
            { id: 'picks', label: 'Picks' },
            { id: 'traders', label: 'Traders' },
            { id: 'groups', label: 'Groups' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-2 px-4 font-medium ${
                activeTab === tab.id
                  ? 'text-white border-b-2 border-primary'
                  : 'text-gray-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Filters */}
        <div className="flex justify-between mb-6">
          <div className="flex bg-secondary rounded-lg overflow-hidden">
            {[
              { id: 'top', label: 'Top' },
              { id: 'following', label: 'Following' },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id as any)}
                className={`px-4 py-1 text-sm ${
                  activeFilter === filter.id ? 'bg-muted' : ''
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setSecondarySortOrder('best')}
              className={`px-2 py-1 text-sm ${
                sortOrder === 'best' ? 'text-primary' : 'text-gray-400'
              }`}
            >
              ↕ Best
            </button>
            <span className="text-gray-400">&</span>
            <button
              onClick={() => setSecondarySortOrder('30d')}
              className={`px-2 py-1 text-sm ${
                sortOrder === '30d' ? 'text-primary' : 'text-gray-400'
              }`}
            >
              30d
            </button>
          </div>
        </div>
        
        {/* Trader List */}
        <div className="space-y-4">
          {mockTraders.map((trader) => (
            <div key={trader.id} className="bg-secondary rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex">
                  <div className="text-xs text-gray-400 bg-black/30 px-2 py-0.5 rounded mr-1">
                    {trader.daysAgo}d
                  </div>
                </div>
                <div className="text-green-400 font-bold text-xl">
                  {trader.performance}
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-700 mr-3 overflow-hidden">
                    {trader.avatarUrl ? (
                      <Image
                        src={trader.avatarUrl}
                        alt={trader.name}
                        width={40}
                        height={40}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-sm">
                        {trader.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">{trader.name}</h3>
                    <div className="flex items-center text-xs text-gray-400">
                      <span className="bg-gray-700 w-4 h-4 rounded-full flex items-center justify-center mr-1">@</span>
                      <span>{trader.username}</span>
                      <span className="mx-1">•</span>
                      <span className="text-green-400">{trader.accuracy}%</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">Reached</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs mb-2">
                <div>
                  <div className="text-gray-400">Picked:</div>
                  <div>${trader.pickedAmount}</div>
                </div>
                <div>
                  <div className="text-gray-400">Now:</div>
                  <div>${trader.currentAmount}</div>
                </div>
                <div>
                  <div className="text-gray-400">↗</div>
                  <div className="text-green-400">{trader.multiplier}x</div>
                </div>
                <div>
                  <div className="text-gray-400">Vol:</div>
                  <div>{trader.volume}</div>
                </div>
                <div>
                  <div className="text-gray-400">Liq:</div>
                  <div>{trader.liquidity}</div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <button className="flex items-center justify-center p-2">
                  <FiShare size={16} className="text-gray-400" />
                </button>
                <button
                  className="bg-primary text-black px-4 py-1 rounded-md text-sm font-medium"
                >
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <MobileBottomNav />
    </main>
  );
}