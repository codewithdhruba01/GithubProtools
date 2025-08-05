"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Github, 
  Users, 
  FileText, 
  GitCompare, 
  BookOpen,
  Star,
  TrendingUp,
  Zap,
  ArrowRight,
  Code,
  Activity
} from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: Users,
    title: "Follower Counter",
    description: "Track your GitHub followers in real-time with beautiful analytics and insights.",
    href: "/follower-counter",
    color: "text-blue-500"
  },
  {
    icon: FileText,
    title: "README Designer",
    description: "Create stunning GitHub profile READMEs with skills, stats, and social icons.",
    href: "/readme-designer",
    color: "text-green-500"
  },
  {
    icon: Users,
    title: "Following Analysis",
    description: "Discover who you're following that doesn't follow you back.",
    href: "/following-analysis",
    color: "text-purple-500"
  },
  {
    icon: GitCompare,
    title: "Profile Compare",
    description: "Compare GitHub profiles and get insights on areas for improvement.",
    href: "/profile-compare",
    color: "text-orange-500"
  },
  {
    icon: BookOpen,
    title: "Documentation",
    description: "Comprehensive Git and GitHub learning resources with step-by-step guides.",
    href: "/documentation",
    color: "text-red-500"
  }
];

const stats = [
  { icon: Users, label: "Active Users", value: "50K+" },
  { icon: Star, label: "GitHub Stars", value: "2.5K+" },
  { icon: TrendingUp, label: "Profiles Analyzed", value: "100K+" },
  { icon: Activity, label: "READMEs Created", value: "25K+" }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="relative container mx-auto px-4 py-24">
          <div className="text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <div className="flex justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="rounded-full bg-primary/10 p-4"
                >
                  <Github className="h-16 w-16 text-primary" />
                </motion.div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                GitHub Tools{" "}
                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Pro
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Complete suite of advanced GitHub tools for developers. Analyze followers, design stunning profiles, 
                compare statistics, and master Git with our comprehensive documentation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/follower-counter">
                <Button size="lg" className="group">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/documentation">
                <Button variant="outline" size="lg">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Learn Git/GitHub
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center space-y-2"
                >
                  <Icon className="h-8 w-8 mx-auto text-primary" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Powerful Tools for{" "}
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                GitHub
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to enhance your GitHub presence and development workflow
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="h-full"
                >
                  <Link href={feature.href}>
                    <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group border-border/50 hover:border-primary/20">
                      <CardHeader>
                        <div className={`w-12 h-12 rounded-lg bg-background border flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <Icon className={`h-6 w-6 ${feature.color}`} />
                        </div>
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">
                          {feature.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to Level Up Your GitHub?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join thousands of developers who are already using our tools to improve their GitHub presence
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/follower-counter">
                <Button size="lg" className="group">
                  <Zap className="mr-2 h-4 w-4" />
                  Start Analyzing
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/readme-designer">
                <Button variant="outline" size="lg">
                  <Code className="mr-2 h-4 w-4" />
                  Design README
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}