// app/trade/components/OrderForm.tsx
'use client';

import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

interface OrderFormProps {
  symbol: string;
  price: number;
}

type OrderType = 'market' | 'limit';
type OrderSide = 'buy' | 'sell';

export default function OrderForm({ symbol, price }: OrderFormProps) {
  const [orderType, setOrderType] = useState<OrderType>('market');
  const [orderSide, setOrderSide] = useState<OrderSide>('buy');
  const [amount, setAmount] = useState<string>('');
  const [limitPrice, setLimitPrice] = useState<string>(price.toString());
  const [leverage, setLeverage] = useState<number>(5);
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };
  
  const handleLimitPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setLimitPrice(value);
    }
  };
  
  const handlePercentage = (percentage: number) => {
    // In a real app, this would calculate based on available balance
    const calculatedAmount = (1000 * percentage / 100).toFixed(2);
    setAmount(calculatedAmount);
  };
  
  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, submit the order to the backend
    alert(`Submitted ${orderSide} order for ${amount} ${symbol} at ${orderType === 'market' ? 'market price' : limitPrice}`);
  };
  
  const estimatedCost = amount ? parseFloat(amount) * (orderType === 'market' ? price : parseFloat(limitPrice || '0')) : 0;
  
  return (
    <div className="bg-secondary rounded-lg p-4">
      <div className="flex border-b border-muted mb-4">
        <button
          onClick={() => setOrderSide('buy')}
          className={`pb-2 px-4 font-medium ${
            orderSide === 'buy' 
              ? 'text-accent-green border-b-2 border-accent-green' 
              : 'text-gray-400'
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setOrderSide('sell')}
          className={`pb-2 px-4 font-medium ${
            orderSide === 'sell' 
              ? 'text-accent-red border-b-2 border-accent-red' 
              : 'text-gray-400'
          }`}
        >
          Sell
        </button>
      </div>
      
      <form onSubmit={handleOrderSubmit} className="space-y-4">
        <div>
          <label htmlFor="orderType" className="block text-sm font-medium mb-2">
            Order Type
          </label>
          <div className="relative">
            <select
              id="orderType"
              value={orderType}
              onChange={(e) => setOrderType(e.target.value as OrderType)}
              className="input-field w-full appearance-none"
            >
              <option value="market">Market</option>
              <option value="limit">Limit</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <FiChevronDown className="text-gray-400" />
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="amount" className="block text-sm font-medium mb-2">
            Amount ({symbol})
          </label>
          <input
            id="amount"
            type="text"
            value={amount}
            onChange={handleAmountChange}
            className="input-field w-full"
            placeholder={`Enter ${symbol} amount`}
            required
          />
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {[25, 50, 75, 100].map((percentage) => (
            <button
              key={percentage}
              type="button"
              onClick={() => handlePercentage(percentage)}
              className="bg-muted text-white py-1 rounded-md text-xs"
            >
              {percentage}%
            </button>
          ))}
        </div>
        
        {orderType === 'limit' && (
          <div>
            <label htmlFor="limitPrice" className="block text-sm font-medium mb-2">
              Limit Price (USD)
            </label>
            <input
              id="limitPrice"
              type="text"
              value={limitPrice}
              onChange={handleLimitPriceChange}
              className="input-field w-full"
              placeholder="Enter limit price"
              required
            />
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium mb-2">
            Leverage: {leverage}x
          </label>
          <input
            type="range"
            min="1"
            max="100"
            value={leverage}
            onChange={(e) => setLeverage(parseInt(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>1x</span>
            <span>25x</span>
            <span>50x</span>
            <span>100x</span>
          </div>
        </div>
        
        <div className="pt-2">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-400">Estimated Cost:</span>
            <span className="text-sm">${estimatedCost.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between mb-4">
            <span className="text-sm text-gray-400">Fee (0.1%):</span>
            <span className="text-sm">${(estimatedCost * 0.001).toFixed(2)}</span>
          </div>
          
          <button
            type="submit"
            className={`w-full py-3 rounded-md font-semibold ${
              orderSide === 'buy'
                ? 'bg-accent-green text-black'
                : 'bg-accent-red text-white'
            }`}
            disabled={!amount || parseFloat(amount) <= 0}
          >
            {orderSide === 'buy' ? 'Buy' : 'Sell'} {symbol}
          </button>
        </div>
      </form>
    </div>
  );
}