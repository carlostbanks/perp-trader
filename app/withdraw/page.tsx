// app/withdraw/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiX, FiArrowLeft } from 'react-icons/fi';

interface Asset {
  id: string;
  name: string;
  symbol: string;
  logoUrl: string;
  balance: number;
  fiatValue: number;
}

// Mock data
const mockAssets: Asset[] = [
  {
    id: '1',
    name: 'Solana',
    symbol: 'SOL',
    logoUrl: '',
    balance: 0.59,
    fiatValue: 134.86,
  },
];

export default function WithdrawPage() {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [step, setStep] = useState<'select' | 'amount'>('select');
  
  const handleAssetSelect = (asset: Asset) => {
    setSelectedAsset(asset);
    setStep('amount');
  };
  
  const handleAmountInput = (value: string) => {
    // Ensure it's a valid number with at most one decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };
  
  const handleQuickAmount = (percentage: number) => {
    if (selectedAsset) {
      const calculatedAmount = (selectedAsset.balance * percentage / 100).toFixed(2);
      setAmount(calculatedAmount);
    }
  };
  
  const getFiatValue = () => {
    if (!selectedAsset || !amount) return 0;
    return (parseFloat(amount) * selectedAsset.fiatValue / selectedAsset.balance).toFixed(2);
  };
  
  const handleKeypadInput = (key: string) => {
    if (key === '<') {
      // Backspace functionality
      setAmount(prev => prev.slice(0, -1));
    } else if (key === '.') {
      // Add decimal point if it doesn't exist yet
      if (!amount.includes('.')) {
        setAmount(prev => prev + '.');
      }
    } else {
      // Add digit
      setAmount(prev => prev + key);
    }
  };
  
  return (
    <main className="min-h-screen bg-background">
      {step === 'select' ? (
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold">Withdraw</h1>
            <Link href="/dashboard">
              <FiX size={24} />
            </Link>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-400 mb-2">Choose your asset</p>
            {mockAssets.map(asset => (
              <button
                key={asset.id}
                className="w-full flex items-center justify-between p-4 bg-secondary rounded-lg mb-2"
                onClick={() => handleAssetSelect(asset)}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 relative rounded-full overflow-hidden bg-gray-800 flex items-center justify-center mr-3">
                    {asset.logoUrl ? (
                      <Image
                        src={asset.logoUrl}
                        alt={asset.name}
                        width={32}
                        height={32}
                      />
                    ) : (
                      <span className="text-xs">{asset.symbol}</span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{asset.symbol}</p>
                    <p className="text-sm text-gray-400">{asset.symbol}</p>
                  </div>
                </div>
                <p className="font-medium">{asset.balance} {asset.symbol}</p>
              </button>
            ))}
          </div>
          
          <p className="text-center text-gray-400">Select asset</p>
        </div>
      ) : (
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold">
              Withdraw {selectedAsset?.symbol}
            </h1>
            <button onClick={() => setStep('select')}>
              <FiX size={24} />
            </button>
          </div>
          
          <div className="flex justify-center mb-6">
            <div className="text-center">
              <p className="text-4xl font-bold mb-1">{amount || '0'}</p>
              <p className="text-gray-400">You send</p>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between bg-secondary p-4 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 relative rounded-full overflow-hidden bg-gray-800 flex items-center justify-center mr-3">
                  <span className="text-xs">{selectedAsset?.symbol}</span>
                </div>
                <span className="font-medium">${selectedAsset?.symbol}</span>
              </div>
              <div className="text-right">
                <p className="font-medium">{amount || '0'}</p>
                <p className="text-sm text-gray-400">${getFiatValue()}</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Balance: {selectedAsset?.balance} {selectedAsset?.symbol}
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <button 
              onClick={() => handleQuickAmount(25)}
              className="bg-secondary text-white rounded-md py-2 text-center"
            >
              25%
            </button>
            <button 
              onClick={() => handleQuickAmount(50)}
              className="bg-secondary text-white rounded-md py-2 text-center"
            >
              50%
            </button>
            <button 
              onClick={() => handleQuickAmount(75)}
              className="bg-secondary text-white rounded-md py-2 text-center"
            >
              75%
            </button>
            <button 
              onClick={() => handleQuickAmount(100)}
              className="bg-secondary text-white rounded-md py-2 text-center col-span-3"
            >
              100%
            </button>
          </div>
          
          {/* Numeric keypad */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '<'].map((key) => (
              <button
                key={key}
                onClick={() => handleKeypadInput(key)}
                className={`${
                  key === '<' ? 'bg-secondary text-white' : 'bg-secondary text-white'
                } rounded-md py-4 text-center text-xl font-medium`}
              >
                {key === '<' ? '⌫' : key}
              </button>
            ))}
          </div>
          
          <button 
            className="btn-primary w-full py-4 text-center"
            disabled={!amount || parseFloat(amount) <= 0}
          >
            Continue
          </button>
          
          <p className="text-center text-sm text-gray-400 mt-2">
            amount to withdrawal
          </p>
        </div>
      )}
    </main>
  );
}