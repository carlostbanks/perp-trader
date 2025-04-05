// app/dashboard/components/Balance.tsx
'use client';

import Link from 'next/link';
import { FiMenu, FiCopy, FiUser } from 'react-icons/fi';

interface BalanceProps {
  balance: string;
  change: string;
  isNegative: boolean;
}

export default function Balance({ balance, change, isNegative }: BalanceProps) {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="p-2">
          <FiMenu size={24} />
        </div>
        <div className="flex space-x-2">
          <button className="flex items-center bg-primary/10 text-primary rounded-full px-4 py-1.5">
            <FiUser className="mr-2" size={16} />
            <span>Add to Group</span>
          </button>
          <button className="flex items-center bg-primary/10 text-primary rounded-full px-4 py-1.5">
            <span>Earn</span>
          </button>
        </div>
      </div>
      
      <div className="py-6">
        <h1 className="text-4xl font-bold mb-2">${balance}</h1>
        <p className={`text-lg ${isNegative ? 'text-accent-red' : 'text-accent-green'}`}>
          {isNegative ? '-' : ''}${change}
        </p>
      </div>
      
      <div className="flex space-x-2 mb-6">
        <Link href="/trade/buy" className="btn-primary flex-1 flex justify-center items-center">
          Buy
        </Link>
        <Link href="/receive" className="btn-secondary flex-1 flex justify-center items-center">
          Receive
        </Link>
        <Link href="/send" className="btn-secondary flex-1 flex justify-center items-center">
          Send
        </Link>
      </div>
    </div>
  );
}