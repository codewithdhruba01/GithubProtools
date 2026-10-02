import React from 'react';
import { HeroSection } from '@/components/hero-section';
import { ServiceSection } from '@/components/service-section';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <ServiceSection />
    </div>
  );
}