"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center pt-24 pb-12 px-4 bg-background text-foreground min-h-[85vh]">
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
        className="w-full max-w-4xl mx-auto mt-20 relative"
      >
        {/* Placeholder for the image comparison tool shown in the design */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-border shadow-[0_0_50px_rgba(168,85,247,0.15)] dark:shadow-[0_0_50px_rgba(168,85,247,0.15)]">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/40 via-indigo-900/40 to-blue-900/40">
             {/* Note: In a real app this would be an actual image, using a placeholder for structure */}
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-80 dark:opacity-50"></div>
          </div>
        </div>
        
        <div className="flex items-center justify-center mt-6 px-4">
            <p className="text-sm text-muted-foreground">Track and compare your real-time analytics.</p>
        </div>
      </motion.div>
    </section>
  );
}
