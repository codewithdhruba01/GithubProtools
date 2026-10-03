

import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { MockProfileCard } from './mock-profile-card';
import { AuroraBars } from './aurora-bars';

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center pt-24 pb-12 px-4 bg-background text-foreground min-h-[85vh] overflow-hidden">
      <div 
        className="absolute inset-x-0 top-0 bottom-[15%] z-0 opacity-50 dark:opacity-100 pointer-events-none"
        style={{ 
          maskImage: 'linear-gradient(to bottom, white 50%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, white 50%, transparent 100%)'
        }}
      >
        <AuroraBars />
      </div>
      <div className="text-center space-y-6 max-w-3xl mx-auto z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl leading-tight font-medium text-foreground tracking-tight mb-6"
        >
          Level up your GitHub.<br />
          Build a stunning profile.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-base text-foreground/60 leading-relaxed mb-8 max-w-md mx-auto"
        >
          Complete suite of advanced GitHub tools for developers.<br className="hidden md:block" />
          Analyze followers, design stunning READMEs, and compare statistics.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="pt-6"
        >
          <Button variant="hero" size="hero">
            Explore Tools
          </Button>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="w-full max-w-3xl mx-auto mt-8 relative"
      >
        <MockProfileCard />
        
        <div className="flex items-center justify-center mt-6 px-4">
            <p className="text-sm text-muted-foreground">Track and compare your real-time analytics.</p>
        </div>
      </motion.div>
    </section>
  );
}
