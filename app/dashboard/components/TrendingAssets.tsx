// app/dashboard/components/TrendingAssets.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';

interface Asset {
  id: string;
  name: string;
  symbol: string;
  logoUrl: string;
  changePercent: number;
}

interface TrendingAssetsProps {
  assets: Asset[];
}

export default function TrendingAssets({ assets }: TrendingAssetsProps) {
  return (
    <div className="px-4 mb-6">
      <h2 className="text-xl font-semibold mb-4">Trending</h2>
      <div className="flex overflow-x-auto pb-2 gap-3 hide-scrollbar">
        {assets.map((asset) => (
          <Link 
            href={`/trade/${asset.symbol.toLowerCase()}`} 
            key={asset.id}
            className="flex items-center space-x-2 bg-secondary rounded-lg p-2 min-w-max"
          >
            <div className="w-8 h-8 relative rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
              {asset.logoUrl ? (
                <Image
                  src={asset.logoUrl}
                  alt={asset.name}
                  width={32}
                  height={32}
                />
              ) : (
                <span className="text-xs">{asset.symbol.slice(0, 2)}</span>
              )}
            </div>
            <span className="font-medium">{asset.symbol}</span>
            <span 
              className={`text-sm ${
                asset.changePercent >= 0 ? 'text-accent-green' : 'text-accent-red'
              }`}
            >
              {asset.changePercent >= 0 ? '+' : ''}
              {asset.changePercent.toFixed(2)}%
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}