"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  BookOpen, 
  GitBranch, 
  Github, 
  Terminal, 
  FileText, 
  Users, 
  Settings,
  ChevronRight,
  Play,
  Code,
  Zap
} from 'lucide-react';

const documentationSections = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: Play,
    description: 'Learn the basics of Git and GitHub',
    chapters: [
      'What is Git?',
      'What is GitHub?',
      'Installing Git',
      'Setting up GitHub account',
      'First repository'
    ]
  },
  {
    id: 'git-basics',
    title: 'Git Basics',
    icon: GitBranch,
    description: 'Master fundamental Git commands',
    chapters: [
      'Git init and clone',
      'Adding and committing',
      'Viewing history',
      'Working with remotes',
      'Branching basics'
    ]
  },
  {
    id: 'github-features',
    title: 'GitHub Features',
    icon: Github,
    description: 'Explore GitHub\'s powerful features',
    chapters: [
      'Issues and Pull Requests',
      'GitHub Actions',
      'Pages and Wikis',
      'Organizations and Teams',
      'Security features'
    ]
  },
  {
    id: 'advanced-git',
    title: 'Advanced Git',
    icon: Terminal,
    description: 'Advanced Git techniques and workflows',
    chapters: [
      'Merging strategies',
      'Rebasing and squashing',
      'Git hooks',
      'Submodules',
      'Advanced branching'
    ]
  },
  {
    id: 'collaboration',
    title: 'Collaboration',
    icon: Users,
    description: 'Working effectively with teams',
    chapters: [
      'Git workflows',
      'Code reviews',
      'Conflict resolution',
      'Team practices',
      'Open source contribution'
    ]
  },
  {
    id: 'tools-config',
    title: 'Tools & Configuration',
    icon: Settings,
    description: 'Optimize your Git and GitHub setup',
    chapters: [
      'Git configuration',
      'SSH keys',
      'GitHub CLI',
      'IDE integrations',
      'Productivity tips'
    ]
  }
];

const chapterContent = {
  'getting-started': {
    'What is Git?': {
      content: `Git is a distributed version control system that tracks changes in any set of files, usually used for coordinating work among programmers collaboratively developing source code during software development.

## Key Features of Git:

**Distributed Architecture**: Every Git repository is a complete backup of the codebase, including full history.

**Branching and Merging**: Git makes it easy to create branches for features and merge them back.

**Speed**: Git is optimized for performance and can handle large projects efficiently.

**Data Integrity**: Everything in Git is checksummed before it's stored and referenced by that checksum.

## Why Use Git?

- **Track Changes**: See exactly what changed, when, and by whom
- **Collaborate**: Multiple developers can work on the same project simultaneously
- **Backup**: Distributed nature means every clone is a full backup
- **Branching**: Experiment with features without affecting main codebase
- **History**: Complete project history is always available`,
      
      commands: [
        { command: 'git --version', description: 'Check Git version' },
        { command: 'git help', description: 'Get help with Git commands' }
      ]
    },
    'What is GitHub?': {
      content: `GitHub is a web-based hosting service for Git repositories. It provides all the functionality of Git along with additional features for collaboration, project management, and software development.

## GitHub Features:

**Repository Hosting**: Store your Git repositories in the cloud with unlimited public repositories.

**Collaboration Tools**: Issues, pull requests, and project boards for team coordination.

**GitHub Actions**: Built-in CI/CD for automated testing and deployment.

**GitHub Pages**: Free web hosting for static websites directly from repositories.

**Community Features**: Follow developers, star repositories, and contribute to open source.

## GitHub vs Git:

- **Git**: The version control system (software)
- **GitHub**: A cloud service that hosts Git repositories

## Benefits of Using GitHub:

- **Remote Backup**: Your code is safely stored in the cloud
- **Collaboration**: Easy sharing and collaboration with team members
- **Portfolio**: Showcase your projects and contributions
- **Open Source**: Contribute to and learn from open source projects
- **Professional Network**: Connect with other developers worldwide`,
      
      commands: [
        { command: 'git remote -v', description: 'View configured remotes' },
        { command: 'git push origin main', description: 'Push to GitHub repository' }
      ]
    }
  },
  'git-basics': {
    'Git init and clone': {
      content: `Learn how to initialize new repositories and clone existing ones.

## Initializing a New Repository

The \`git init\` command creates a new Git repository. It can be used to initialize a new repository in an existing directory or create a new directory with a Git repository.

## Cloning Existing Repositories

The \`git clone\` command creates a copy of a remote repository on your local machine, including all files, branches, and commit history.

## When to Use Each:

- **git init**: When starting a new project from scratch
- **git clone**: When working on an existing project or contributing to open source

## Repository Structure:

After initialization, Git creates a \`.git\` directory containing:
- Object database
- Configuration files
- Branch information
- Commit history`,
      
      commands: [
        { command: 'git init', description: 'Initialize a new Git repository' },
        { command: 'git init project-name', description: 'Create new directory and initialize' },
        { command: 'git clone https://github.com/user/repo.git', description: 'Clone a remote repository' },
        { command: 'git clone https://github.com/user/repo.git my-folder', description: 'Clone to specific folder' }
      ]
    }
  }
};

export default function Documentation() {
  const [selectedSection, setSelectedSection] = useState('getting-started');
  const [selectedChapter, setSelectedChapter] = useState('What is Git?');

  const currentSection = documentationSections.find(s => s.id === selectedSection);
  const currentContent = chapterContent[selectedSection]?.[selectedChapter];

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold">
            Git & GitHub{" "}
            <span className="bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
              Documentation
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive guide to mastering Git and GitHub - from basics to advanced techniques
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Documentation</CardTitle>
                <CardDescription>Choose a section to learn</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[600px]">
                  <div className="space-y-1 p-4">
                    {documentationSections.map((section) => {
                      const Icon = section.icon;
                      const isActive = selectedSection === section.id;
                      
                      return (
                        <div key={section.id}>
                          <Button
                            variant={isActive ? "secondary" : "ghost"}
                            className="w-full justify-start text-left h-auto p-3"
                            onClick={() => {
                              setSelectedSection(section.id);
                              setSelectedChapter(section.chapters[0]);
                            }}
                          >
                            <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
                            <div className="flex-1 text-left">
                              <div className="font-medium">{section.title}</div>
                              <div className="text-xs text-muted-foreground">
                                {section.chapters.length} chapters
                              </div>
                            </div>
                          </Button>
                          
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="ml-7 mt-1 space-y-1"
                            >
                              {section.chapters.map((chapter) => (
                                <Button
                                  key={chapter}
                                  variant={selectedChapter === chapter ? "default" : "ghost"}
                                  size="sm"
                                  className="w-full justify-start text-xs"
                                  onClick={() => setSelectedChapter(chapter)}
                                >
                                  <ChevronRight className="h-3 w-3 mr-2" />
                                  {chapter}
                                </Button>
                              ))}
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <Card className="min-h-[600px]">
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  {currentSection && (
                    <>
                      <span>{currentSection.title}</span>
                      <ChevronRight className="h-4 w-4" />
                      <span>{selectedChapter}</span>
                    </>
                  )}
                </div>
                <CardTitle className="text-2xl">{selectedChapter}</CardTitle>
                {currentSection && (
                  <CardDescription className="flex items-center gap-2">
                    <currentSection.icon className="h-4 w-4" />
                    {currentSection.description}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                {currentContent ? (
                  <>
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <div 
                        dangerouslySetInnerHTML={{ 
                          __html: currentContent.content
                            .replace(/\n\n/g, '</p><p>')
                            .replace(/^/, '<p>')
                            .replace(/$/, '</p>')
                            .replace(/## (.*?)<\/p>/g, '<h2>$1</h2>')
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/`(.*?)`/g, '<code>$1</code>')
                        }}
                      />
                    </div>

                    {currentContent.commands && (
                      <>
                        <Separator />
                        <div>
                          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Terminal className="h-5 w-5" />
                            Common Commands
                          </h3>
                          <div className="space-y-3">
                            {currentContent.commands.map((cmd, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                              >
                                <div className="flex-1">
                                  <code className="text-sm font-mono bg-background px-2 py-1 rounded">
                                    {cmd.command}
                                  </code>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {cmd.description}
                                  </p>
                                </div>
                                <Button variant="ghost" size="sm">
                                  <Code className="h-4 w-4" />
                                </Button>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12 space-y-4">
                    <BookOpen className="h-16 w-16 mx-auto text-muted-foreground" />
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">Content Coming Soon</h3>
                      <p className="text-muted-foreground">
                        This chapter is being written. Check back soon for detailed content!
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Start Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto mt-12"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Quick Start Guide
              </CardTitle>
              <CardDescription>
                Essential Git commands to get you started immediately
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">First Time Setup</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <code className="bg-muted px-2 py-1 rounded">git config --global user.name "Your Name"</code>
                    </div>
                    <div className="flex justify-between items-center">
                      <code className="bg-muted px-2 py-1 rounded">git config --global user.email "you@example.com"</code>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Daily Workflow</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <code className="bg-muted px-2 py-1 rounded">git add .</code>
                    </div>
                    <div className="flex justify-between items-center">
                      <code className="bg-muted px-2 py-1 rounded">git commit -m "message"</code>
                    </div>
                    <div className="flex justify-between items-center">
                      <code className="bg-muted px-2 py-1 rounded">git push origin main</code>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}