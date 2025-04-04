// app/dashboard/page.tsx
import Balance from './components/Balance';
import TrendingAssets from './components/TrendingAssets';
import AssetsList from './components/AssetsList';

// Mock data (in a real app, this would come from an API)
const mockTrendingAssets = [
  {
    id: '1',
    name: 'yJelly',
    symbol: 'yJelly',
    logoUrl: '',
    changePercent: -36.48,
  },
  {
    id: '2',
    name: 'GANG',
    symbol: 'GANG',
    logoUrl: '',
    changePercent: -95.46,
  },
  {
    id: '3',
    name: 'ButtCoin',
    symbol: 'BUTTCOIN',
    logoUrl: '',
    changePercent: -12.34,
  },
];

const mockAssets = [
  {
    id: '1',
    name: 'Solana',
    symbol: 'SOL',
    logoUrl: '',
    amount: 0.59,
    fiatValue: 134.86,
    priceChange: -1.68,
  },
];

export default function DashboardPage() {
  return (
    <main>
      <Balance 
        balance="152.75" 
        change="9.42" 
        isNegative={true} 
      />
      
      <TrendingAssets assets={mockTrendingAssets} />
      
      <AssetsList assets={mockAssets} />
    </main>
  );
}