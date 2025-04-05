// app/dashboard/components/AssetsList.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Asset {
  id: string;
  name: string;
  symbol: string;
  logoUrl: string;
  amount: number;
  fiatValue: number;
  priceChange: number;
}

interface AssetsListProps {
  assets: Asset[];
}

export default function AssetsList({ assets }: AssetsListProps) {
  const [activeTab, setActiveTab] = useState<'assets' | 'watchlist'>('assets');
  
  return (
    <div className="px-4">
      <div className="flex border-b border-muted mb-4">
        <button
          className={`pb-2 px-4 font-medium ${
            activeTab === 'assets' 
              ? 'text-white border-b-2 border-primary' 
              : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('assets')}
        >
          Your Assets
        </button>
        <button
          className={`pb-2 px-4 font-medium ${
            activeTab === 'watchlist' 
              ? 'text-white border-b-2 border-primary' 
              : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('watchlist')}
        >
          Watchlist
        </button>
      </div>
      
      <div className="space-y-4">
        {assets.map((asset) => (
          <Link 
            href={`/trade/${asset.symbol.toLowerCase()}`}
            key={asset.id} 
            className="flex items-center justify-between p-3 rounded-lg bg-secondary"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 relative rounded-full overflow-hidden bg-gray-800 flex items-center justify-center mr-3">
                {asset.logoUrl ? (
                  <Image
                    src={asset.logoUrl}
                    alt={asset.name}
                    width={40}
                    height={40}
                  />
                ) : (
                  <span className="text-sm">{asset.symbol.slice(0, 2)}</span>
                )}
              </div>
              <div>
                <h3 className="font-semibold">{asset.symbol}</h3>
                <p className="text-sm text-gray-400">
                  {asset.amount} {asset.symbol}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">${asset.fiatValue.toFixed(2)}</p>
              <p 
                className={`text-sm ${
                  asset.priceChange >= 0 ? 'text-accent-green' : 'text-accent-red'
                }`}
              >
                {asset.priceChange >= 0 ? '+' : ''}${Math.abs(asset.priceChange).toFixed(2)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}