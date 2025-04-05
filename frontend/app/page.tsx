// app/page.tsx
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col justify-center items-center p-6 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Crypto Perp <span className="text-primary">Trader</span>
        </h1>
        
        <p className="text-lg text-gray-300 mb-12 max-w-md">
          Trade perpetual futures on your favorite cryptocurrencies with leverage and low fees.
        </p>
        
        <div className="w-full max-w-xs space-y-4">
          <Link 
            href="/dashboard" 
            className="btn-primary w-full flex items-center justify-center"
          >
            Enter App <FiArrowRight className="ml-2" />
          </Link>
          
          <div className="flex space-x-4">
            <Link 
              href="/login" 
              className="btn-secondary flex-1"
            >
              Login
            </Link>
            
            <Link 
              href="/register" 
              className="btn-secondary flex-1"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
      
      <div className="p-6 text-center text-sm text-gray-400">
        <p>© 2025 Crypto Perp Trader. All rights reserved.</p>
      </div>
    </main>
  );
}