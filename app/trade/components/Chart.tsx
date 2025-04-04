// app/trade/components/Chart.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Area, 
  AreaChart 
} from 'recharts';

interface PriceData {
  time: string;
  price: number;
}

interface ChartProps {
  symbol: string;
  timeframe: '1h' | '4h' | '1d' | '1w';
}

// Generate mock price data
const generateMockData = (timeframe: string, length: number): PriceData[] => {
  const data: PriceData[] = [];
  const now = new Date();
  let basePrice = 100;
  const volatility = 0.02;
  
  for (let i = 0; i < length; i++) {
    const time = new Date(now);
    
    if (timeframe === '1h') {
      time.setMinutes(time.getMinutes() - i * 5);
    } else if (timeframe === '4h') {
      time.setMinutes(time.getMinutes() - i * 20);
    } else if (timeframe === '1d') {
      time.setHours(time.getHours() - i);
    } else if (timeframe === '1w') {
      time.setDate(time.getDate() - i);
    }
    
    const random = Math.random() - 0.5;
    basePrice = basePrice * (1 + random * volatility);
    
    data.unshift({
      time: time.toLocaleTimeString(),
      price: parseFloat(basePrice.toFixed(2)),
    });
  }
  
  return data;
};

export default function Chart({ symbol, timeframe }: ChartProps) {
  const [data, setData] = useState<PriceData[]>([]);
  const [timeframeState, setTimeframeState] = useState<'1h' | '4h' | '1d' | '1w'>(timeframe);
  
  useEffect(() => {
    // In a real app, we would fetch data from an API
    const mockData = generateMockData(timeframeState, 50);
    setData(mockData);
  }, [timeframeState]);
  
  const priceColor = data.length > 1 && data[data.length - 1].price > data[0].price 
    ? '#00E599' 
    : '#FF4D4D';
  
  return (
    <div className="bg-secondary rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{symbol} Price</h2>
        <div className="flex bg-muted rounded-lg overflow-hidden">
          {['1h', '4h', '1d', '1w'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframeState(tf as any)}
              className={`px-3 py-1 text-xs ${
                timeframeState === tf ? 'bg-secondary' : ''
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={priceColor} stopOpacity={0.2} />
                <stop offset="95%" stopColor={priceColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#666', fontSize: 10 }}
              minTickGap={50}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#666', fontSize: 10 }}
              domain={['dataMin - 5', 'dataMax + 5']}
              orientation="right"
            />
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1A1A1A', 
                borderColor: '#333', 
                color: '#FFF' 
              }} 
            />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke={priceColor} 
              fillOpacity={1} 
              fill="url(#colorPrice)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-between mt-4">
        <div>
          <p className="text-sm text-gray-400">Current Price</p>
          <p className="text-lg font-semibold">
            ${data.length ? data[data.length - 1].price.toFixed(2) : '--'}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-400">24h Change</p>
          <p className={`text-lg font-semibold ${priceColor === '#00E599' ? 'text-accent-green' : 'text-accent-red'}`}>
            {priceColor === '#00E599' ? '+' : '-'}2.45%
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-400">24h Volume</p>
          <p className="text-lg font-semibold">$4.2M</p>
        </div>
      </div>
    </div>
  );
}