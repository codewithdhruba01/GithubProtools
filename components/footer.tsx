import React from 'react';
import Link from 'next/link';
import { Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-background py-12 px-6 mt-auto border-t border-border/20">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-10 md:gap-4">
        
        {/* Left side: Logo */}
        <div className="flex-1">
          <Link href="/" className="flex items-center justify-center md:justify-start space-x-3 group">
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-foreground text-background transition-transform group-hover:scale-105">
              <Github className="w-4 h-4" />
            </div>
            <span className="font-medium text-[15px] tracking-wide text-foreground">
              GitHub Pro
            </span>
          </Link>
        </div>

        {/* Center: Navigate */}
        <div className="flex-[2] flex flex-col items-center gap-4">
          <h4 className="font-medium text-sm text-foreground tracking-wide uppercase">Navigate</h4>
          <div className="flex flex-col gap-3">
            <nav className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
              <Link href="/follower-counter" className="text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">Follower</Link>
              <Link href="/readme-designer" className="text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">.md Designer</Link>
              <Link href="/following-analysis" className="text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">Analysis</Link>
              <Link href="/profile-compare" className="text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">Compare</Link>
            </nav>
            <nav className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">Home</Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">About</Link>
              <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">FAQ</Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">Contact</Link>
            </nav>
          </div>
        </div>

        {/* Right side: Credits */}
        <div className="flex-1 flex justify-center md:justify-end">
          <p className="text-sm text-muted-foreground">
            Made by <a href="https://github.com/codewithdhruba01" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors font-medium">@codewithdhruba</a>
          </p>
        </div>

      </div>
    </footer>
  );
}