// app/(auth)/seed-phrase/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiEye, FiEyeOff, FiAlertTriangle, FiLock } from 'react-icons/fi';

export default function SeedPhrasePage() {
  const [showPhrase, setShowPhrase] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  
  // In a real app, this would be generated securely
  const mockSeedPhrase = "apple banana cat dog elephant fox grape horse igloo jungle kite lion";
  
  return (
    <main className="min-h-screen bg-background p-4 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto">
        <div className="w-10 h-10 rounded-md bg-primary/20 text-primary flex items-center justify-center mb-4">
          <FiLock size={20} />
        </div>
        
        <h1 className="text-2xl font-bold mb-2 text-center">View your Seed Phrase</h1>
        <p className="text-center text-gray-400 mb-6">
          A seed phrase is like a password that allows you to access
          and manage your crypto funds.
        </p>
        
        <div className="w-full space-y-4 mb-6">
          <div className="p-4 bg-secondary rounded-lg flex items-center space-x-2">
            <FiEye className="text-gray-400" size={20} />
            <p className="text-sm text-gray-300">
              Ensure your screen is not visible to anyone
              when viewing your recovery phrase.
            </p>
          </div>
          
          <div className="p-4 bg-secondary rounded-lg flex items-center space-x-2">
            <FiAlertTriangle className="text-gray-400" size={20} />
            <p className="text-sm text-gray-300">
              Never share your recovery phrase with
              anyone or input it to any websites.
            </p>
          </div>
          
          <div className="p-4 bg-secondary rounded-lg flex items-center space-x-2">
            <FiLock className="text-gray-400" size={20} />
            <p className="text-sm text-gray-300">
              Anyone with access to your recovery
              phrase can control your entire wallet.
            </p>
          </div>
        </div>
        
        <div className="w-full mb-6">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="w-5 h-5 bg-secondary border-gray-600 rounded"
            />
            <span className="text-sm">I understand the risks, please proceed.</span>
          </label>
        </div>
        
        <button
          className={`w-full py-3 px-4 rounded-lg text-center ${
            confirmed 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
          disabled={!confirmed}
          onClick={() => setShowPhrase(true)}
        >
          Show recovery phrase
        </button>
      </div>
      
      {showPhrase && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
          <div className="bg-background p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Your Seed Phrase</h2>
            <p className="text-sm text-gray-400 mb-4">
              Write these words down on paper and keep them in a secure location.
              Do not share this phrase with anyone.
            </p>
            
            <div className="bg-secondary p-4 rounded-lg mb-6">
              <p className="break-words font-mono">
                {mockSeedPhrase}
              </p>
            </div>
            
            <button 
              className="w-full py-3 px-4 bg-primary text-black rounded-lg text-center"
              onClick={() => setShowPhrase(false)}
            >
              I've saved my phrase
            </button>
          </div>
        </div>
      )}
    </main>
  );
}