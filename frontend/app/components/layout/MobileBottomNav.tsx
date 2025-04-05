// app/components/layout/MobileBottomNav.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiSearch, FiBarChart2, FiFolder } from 'react-icons/fi';

export default function MobileBottomNav() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path;
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-secondary border-t border-muted px-6 py-3">
      <div className="flex items-center justify-between">
        <Link href="/explore" className="flex flex-col items-center">
          <div className={`p-2 rounded-full ${isActive('/explore') ? 'text-primary' : 'text-foreground'}`}>
            <FiSearch size={24} />
          </div>
          <span className={`text-xs mt-1 ${isActive('/explore') ? 'text-primary' : 'text-foreground'}`}>Search</span>
        </Link>
        
        <Link href="/signals" className="flex flex-col items-center">
          <div className={`p-2 rounded-full ${isActive('/signals') ? 'text-primary' : 'text-foreground'}`}>
            <FiBarChart2 size={24} />
          </div>
          <span className={`text-xs mt-1 ${isActive('/signals') ? 'text-primary' : 'text-foreground'}`}>Signals</span>
        </Link>
        
        <Link href="/dashboard" className="flex flex-col items-center">
          <div className={`p-2 rounded-full ${isActive('/dashboard') ? 'text-primary' : 'text-foreground'}`}>
            <FiFolder size={24} />
          </div>
          <span className={`text-xs mt-1 ${isActive('/dashboard') ? 'text-primary' : 'text-foreground'}`}>Assets</span>
        </Link>
      </div>
    </div>
  );
}