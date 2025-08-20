"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Github, 
  Users, 
  FileText, 
  GitCompare, 
  BookOpen,
  GitCompareArrows,
  Heart,
  Zap,
  Shield,
  Rocket,
  Code,
  Target,
  Medal
} from 'lucide-react';

const features = [
  {
    icon: Users,
    color: "text-blue-500",
    title: "Follower Analytics",
    description: "Real-time GitHub follower tracking with detailed insights and growth metrics."
  },
  {
    icon: FileText,
    color: "text-green-500",
    title: "README Designer",
    description: "Create stunning profile READMEs with skills, stats, and social icons."
  },
  {
    icon: GitCompare,
    color: "text-purple-500",
    title: "Profile Comparison",
    description: "Compare GitHub profiles side-by-side with improvement suggestions."
  },
  {
    icon: BookOpen,
    color: "text-pink-500",
    title: "Comprehensive Documentation",
    description: "Complete Git and GitHub learning resources with step-by-step guides."
  }
];

const values = [
  {
    icon: Code,
    color: "text-orange-500",
    title: "Developer-First",
    description: "Built by developers, for developers. We understand your workflow and needs."
  },
  {
    icon: Shield,
    color: "text-green-600",
    title: "Privacy & Security",
    description: "We respect your privacy. No data is stored, and all API calls are transparent."
  },
  {
    icon: Zap,
    color: "text-yellow-500",
    title: "Performance",
    description: "Fast, responsive, and reliable tools that don't slow down your productivity."
  },
  {
    icon: Heart,
    color: "text-red-500",
    title: "Open Source Spirit",
    description: "Supporting the open source community and collaborative development."
  }
];

const stats = [
  { icon: Users, label: "Active Users", value: "50,000+", color: "blue-500" },
  { icon: FileText, label: "READMEs Created", value: "25,000+", color: "green-500" },
  { icon: GitCompareArrows, label: "Profiles Compared", value: "100,000+", color: "purple-500" },
  { icon: Medal, label: "GitHub Stars", value: "2,500+", color: "red-500" }
];

export default function About() {
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6 mb-16"
        >
          <div className="flex justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="rounded-full bg-primary/10 p-6"
            >
              <Github className="h-16 w-16 text-primary" />
            </motion.div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold">
              About{" "}
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                GitHub Tools Pro
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Empowering developers with advanced GitHub analytics, profile tools, and comprehensive learning resources. 
              Built with passion for the developer community.
            </p>
          </div>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl flex items-center justify-center gap-2">
                <Target className="h-6 w-6" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-lg text-muted-foreground">
                We believe every developer deserves access to powerful, easy-to-use tools that help them 
                understand, optimize, and showcase their GitHub presence. Our mission is to democratize 
                GitHub analytics and make professional profile management accessible to everyone.
              </p>
              <div className="flex flex-wrap justify-center gap-2 pt-4">
                <Badge className="bg-green-700 text-[#eeeeee] hover:bg-green-600">Analytics</Badge>
                <Badge className="bg-green-700 text-[#eeeeee] hover:bg-green-600">Optimization</Badge>
                <Badge className="bg-green-700 text-[#eeeeee] hover:bg-green-600">Education</Badge>
                <Badge className="bg-green-700 text-[#eeeeee] hover:bg-green-600">Community</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Trusted by Developers Worldwide</h2>
            <p className="text-muted-foreground">Our impact on the developer community</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="text-center hover:shadow-lg transition-all duration-300">
                    <CardContent className="pt-6">
                      <div className={`w-12 h-12 rounded-full bg-${stat.color}/20 flex items-center justify-center mx-auto mb-2`}>
                        <Icon className={`h-6 w-6 text-${stat.color}`} />
                      </div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What We Offer</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools designed to enhance your GitHub experience and professional presence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-${feature.color.replace("text-", "")}/20 flex items-center justify-center`}>
                          <Icon className={`h-5 w-5 ${feature.color}`} />
                        </div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we build and every decision we make
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-${value.color.replace("text-", "")}/20 flex items-center justify-center`}>
                          <Icon className={`h-5 w-5 ${value.color}`} />
                        </div>
                        <CardTitle className="text-lg">{value.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Technology Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl flex items-center justify-center gap-2">
                <Rocket className="h-6 w-6" />
                Built with Modern Technology
              </CardTitle>
              <CardDescription>
                Powered by cutting-edge web technologies for optimal performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto">
                    <Code className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="text-sm font-medium">Next.js 13</div>
                  <div className="text-xs text-muted-foreground">React Framework</div>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto">
                    <Zap className="h-6 w-6 text-white-500" />
                  </div>
                  <div className="text-sm font-medium">TypeScript</div>
                  <div className="text-xs text-muted-foreground">Type Safety</div>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto">
                    <Shield className="h-6 w-6 text-sky-500" />
                  </div>
                  <div className="text-sm font-medium">Tailwind CSS</div>
                  <div className="text-xs text-muted-foreground">Styling</div>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mx-auto">
                    <Github className="h-6 w-6 text-orange-500" />
                  </div>
                  <div className="text-sm font-medium">GitHub API</div>
                  <div className="text-xs text-muted-foreground">Data Source</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <Card className="max-w-2xl mx-auto text-center">
            <CardHeader>
              <CardTitle className="text-2xl">Get in Touch</CardTitle>
              <CardDescription>
                Have questions, suggestions, or want to contribute? We love to hear from you!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                GitHub Tools Pro is continuously evolving based on community feedback. 
                Your input helps us build better tools for everyone.
              </p>
              <div className="flex justify-center space-x-4">
                <a href="mailto:pati.dhrubaraj@outlook.com">
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                    📧 Email
                  </Badge>
                </a>
                <a href="https://github.com/codewithdhruba01/GithubProtools/issues" target="_blank" rel="noopener noreferrer">
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                    🐙 GitHub Issues
                  </Badge>
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}