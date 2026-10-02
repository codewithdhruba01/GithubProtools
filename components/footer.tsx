import React from 'react';
import Link from 'next/link';
import { Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-background py-8 px-6 mt-auto">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left side: Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-foreground text-background transition-transform group-hover:scale-105">
            <Github className="w-4 h-4" />
          </div>
          <span className="font-medium text-[15px] tracking-wide text-foreground">
            GitHub Pro
          </span>
        </Link>

        {/* Right side: Credits */}
        <p className="text-sm text-muted-foreground">
          Made by <a href="https://github.com/codewithdhruba01" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">@codewithdhruba</a>
        </p>
      </div>
    </footer>
  );
}