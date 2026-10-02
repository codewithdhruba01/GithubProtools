"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Github } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Follower', href: '/follower-counter' },
  { name: 'README', href: '/readme-designer' },
  { name: 'Analysis', href: '/following-analysis' },
  { name: 'Compare', href: '/profile-compare' },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full bg-background border-b border-border py-4 px-6">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Left side: Logo */}
        <div className="flex-1 flex justify-start">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-foreground text-background transition-transform group-hover:scale-105">
              <Github className="w-5 h-5" />
            </div>
            <span className="font-medium text-lg tracking-wide text-foreground">
              GitHub Pro
            </span>
          </Link>
        </div>

        {/* Center side: Links */}
        <div className="hidden md:flex flex-1 justify-center items-center space-x-8">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Right side: Actions */}
        <div className="flex-1 flex items-center justify-end space-x-6 text-muted-foreground">
          <button className="hover:text-foreground transition-colors" aria-label="Close">
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
          
          <div className="hover:text-foreground transition-colors flex items-center justify-center scale-90">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}