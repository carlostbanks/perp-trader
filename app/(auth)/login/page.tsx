// app/(auth)/login/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiUser, FiLock, FiArrowRight } from 'react-icons/fi';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle authentication here
    // For now, we'll just redirect to the dashboard
    window.location.href = '/dashboard';
  };
  
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col justify-center items-center p-6">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-2 text-center">Welcome Back</h1>
          <p className="text-center text-gray-400 mb-8">
            Login to continue trading
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <Link href="/forgot-password" className="text-sm text-primary">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center"
            >
              Login <FiArrowRight className="ml-2" />
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link href="/register" className="text-primary">
                Sign up
              </Link>
            </p>
          </div>
          
          <div className="mt-8">
            <p className="text-center text-sm text-gray-400 mb-4">
              Or continue with
            </p>
            <div className="grid grid-cols-3 gap-4">
              {['Google', 'Apple', 'Twitter'].map((provider) => (
                <button
                  key={provider}
                  className="btn-secondary py-2 flex items-center justify-center"
                >
                  {provider}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}