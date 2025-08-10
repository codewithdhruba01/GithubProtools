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
  Users, 
  Settings,
  ChevronRight,
  Play,
  Code,
  Zap
} from 'lucide-react';

type Command = {
  command: string;
  description: string;
};

type Chapter = {
  content: string;
  commands?: Command[];
};

type ChapterContent = Record<string, Record<string, Chapter>>;

const documentationSections = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: Play,
    description: 'Learn the basics of Git and GitHub',
    chapters: [
      'Introduction',
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

const chapterContent: ChapterContent = {
  'getting-started': {
    'Introduction': {
      content: `Welcome to the Ultimate Git Guide, your go-to resource for mastering Git, the industry-standard version control system. Inside, you’ll find clear explanations of Git commands 
       with detailed flags and real-world examples. Learn not just how to use commands like git add, git commit, and git rebase, but also when and why to apply them in real-world scenarios—whether you're working solo, collaborating with a team, or contributing to open-source projects. We’ve included tips and tricks for maintaining a clean 
       commit history, resolving merge conflicts, and using Git’s reset and revert features to undo mistakes and fix bugs. You’ll also explore advanced Git features that can boost your productivity and make troubleshooting easier  With practical advice and best practices, this guide will help you streamline your Git workflow and use Git like a pro. 
       Let’s get started!
      `,
      commands: [
        { command: "git --version", description: "Check installed Git version" },
        { command: "git help", description: "Get help with Git commands" },
        { command: "git init", description: "Initialize a new Git repository in the current folder" },
        { command: "git status", description: "Check which files are changed and ready to commit" },
        { command: "git add <file>", description: "Stage specific file(s) for commit" },
        { command: "git add .", description: "Stage all changes for commit" },
        { command: 'git commit -m "message"', description: "Save staged changes with a message" },
        { command: "git log", description: "View commit history" },
        { command: "git branch", description: "List all branches" },
        { command: "git checkout -b <branch-name>", description: "Create and switch to a new branch" },
        { command: "git merge <branch-name>", description: "Merge changes from another branch into the current branch" },
        { command: "git remote add origin <repo-url>", description: "Connect local repo to remote repository" },
        { command: "git push origin main", description: "Push changes to the main branch on remote" },
        { command: "git pull", description: "Fetch and merge changes from remote repository" }
      ]
    },
    'What is Git?': {
      content: `<p>Git is a <strong>distributed version control system (DVCS)</strong> used to track changes in files and coordinate work between multiple people.</p>
      <p><strong>What Git does:</strong></p>
    <ul>
       Keeps a complete history of every change made to your files Allows you to go back to previous versions at any time</li>
       Lets multiple developers work together without overwriting each other's work makes branching easy so you can experiment without breaking the main code</li>
   </ul>
    <p><strong>Why developers use Git:</strong></p>
   <ul>
    <li>• <strong>Collaboration:</strong> Teams can work on the same codebase efficiently</li>
    <li>• <strong>Backup:</strong> Your history is stored locally and can also be pushed to remote servers like GitHub</li>
    <li>• <strong>Experimentation:</strong> Try new features safely in branches</li>
    <li>• <strong>Version tracking:</strong> See exactly who changed what and when</li>
   </ul>
      `,
      commands: [
        { command: "git --version", description: "Check installed Git version" },
        { command: "git help", description: "Get help with Git commands" },
        { command: "git init", description: "Initialize a new Git repository in the current folder" },
        { command: "git status", description: "Check which files are changed and ready to commit" },
        { command: "git add <file>", description: "Stage specific file(s) for commit" },
        { command: "git add .", description: "Stage all changes for commit" },
        { command: 'git commit -m "message"', description: "Save staged changes with a message" },
        { command: "git log", description: "View commit history" },
        { command: "git branch", description: "List all branches" },
        { command: "git checkout -b <branch-name>", description: "Create and switch to a new branch" },
        { command: "git merge <branch-name>", description: "Merge changes from another branch into the current branch" },
        { command: "git remote add origin <repo-url>", description: "Connect local repo to remote repository" },
        { command: "git push origin main", description: "Push changes to the main branch on remote" },
        { command: "git pull", description: "Fetch and merge changes from remote repository" }
      ]
    },
    'What is GitHub?': {
      content: `GitHub is an online platform where developers store, share, and collaborate on code projects.
       It’s built around Git, which is a version control system that keeps track of changes in your code over time.
       <p><strong>breakdown:</strong></p>
      <ul>
          <li>• <strong>Code Hosting - </strong> You can upload your projects (repositories) so they’re stored safely online </li>
          <li>• <strong>Version Control - </strong> Every change you make is tracked, so you can roll back if something breaks. </li>
          <li>• <strong>Collaboration - </strong> Multiple people can work on the same project without overwriting each other’s work. </li>
          <li>• <strong>Pull Requests - </strong> A way to propose changes to a project, review them, and merge them in when approved.</li>
          <li>• <strong>Issues & Project Boards - </strong> Tools for reporting bugs, tracking tasks, and organizing work.</li>
          <li>• <strong>Community - </strong> You can explore open-source projects, contribute to others’ code, or showcase your own.</li>
      </ul>
       `,
      commands: [
        { command: 'git remote -v', description: 'View configured remotes' },
        { command: 'git push origin main', description: 'Push to GitHub repository' }
      ]
    },
    'Installing Git': {
      content: `
      <p>To use Git, you first need to install it on your system. Git is available for Windows, macOS, and Linux.</p>

      <h3> <strong> Installing Git on Different Platforms: </strong> </h3>

      <strong>1. Windows: </strong>
      <div class="mb-4">
      <img src="https://media.geeksforgeeks.org/wp-content/uploads/20220513224110/1.PNG" class="rounded-lg shadow-md" />
      </div>
      <ul>
        <li>• Go to the official Git website: <a href="https://git-scm.com/downloads/win" target="_blank">Link</a> Click "Downlode" and wait for the process to complete. </li>
        <li>• The download should start automatically. </li>
      </ul>
      <h3>  Double-click the <code> .exe </code> file. </h3>
      <div class="mb-4">
      <img src="https://media.geeksforgeeks.org/wp-content/uploads/20220513225003/2.png" class="rounded-lg shadow-md" />
      </div>
      <ul>
      <ul>
        <li>• Step 3: Check the GNU General Public License and click Next. </li>
        <div class="mb-4">
      <img src="https://media.geeksforgeeks.org/wp-content/uploads/20220513230934/4.PNG" class="rounded-lg shadow-md" />
      </div>
        <li>• A screen for component selection will display. Leave the settings as it is and click Next. </li>

         <div class="mb-4">
      <img src="https://media.geeksforgeeks.org/wp-content/uploads/20220513231157/5.PNG" class="rounded-lg shadow-md" />
      </div>
        </ul>
      <h3> <strong> Important choices: </strong> </h3>
      <ul>
        <li>• <strong> Editor selection: </strong> You can choose Nano (default) or VS Code if installed. </li>
        <li>• <strong> PATH environment: </strong> Choose "Git from the command line and also from 3rd-party software". </li>
        <li>• <strong> Line endings: </strong> Choose "Checkout Windows-style, commit Unix-style" (recommended). </li>
        <li>• Leave other default options unless you know you need a specific setup.</li>
      </ul>

      <h3> <strong> Finish Installation: </strong> </h3>
      <ul>
        <li>• Click Finish. </li>
        <li>• Open Command Prompt or PowerShell.</li>
      </ul>
       `,
      commands: [
        { command: "git --version", description: "Check installed Windows Git version" },
        { command: "brew install git", description: "Install Git on macOS with Homebrew" },
        { command: "sudo apt install git", description: "Install Git on Ubuntu/Debian" }
      ]
    },
    'Setting up GitHub account': {
  content: `GitHub is an online platform where developers store, share, and collaborate on code projects.
  It’s built around Git, which is a version control system that keeps track of changes in your code over time.
  
  <p><strong>Step 1 — Create a GitHub Account</strong></p>
  <ul>
      <li>• Go to <a href="https://github.com" target="_blank">https://github.com</a>.</li>
      <li>• Click <strong>Sign up</strong> (top-right corner).</li>
      <li>• Fill in your username, email address, and password.</li>
      <li>• Solve the CAPTCHA and click <strong>Create account</strong>.</li>
      <li>• Verify your email by clicking the link GitHub sends you.</li>
  </ul>

  <p><strong>Step 2 — Choose Your Plan</strong></p>
  <ul>
      <li>• Select the <strong>Free</strong> plan (perfect for beginners).</li>
      <li>• Paid plans have more features, but Free allows unlimited public and private repositories.</li>
  </ul>

  <p><strong>Step 3 — Set Up Your Profile</strong></p>
  <ul>
      <li>• Add a profile picture and short bio.</li>
      <li>• Optionally, include your website or portfolio link.</li>
  </ul>

  <p><strong>Step 4 — Install Git on Your Computer</strong></p>
  <ul>
      <li>• Windows: Download from <a href="https://git-scm.com/downloads" target="_blank">git-scm.com</a> and install.</li>
      <li>• Mac: Run <code>brew install git</code> in Terminal.</li>
      <li>• Linux (Debian/Ubuntu): Run <code>sudo apt install git</code>.</li>
  </ul>

  <p><strong>Step 5 — Configure Git</strong></p>

  <p><strong>Step 6 — Connect GitHub to Your Computer</strong></p>
  <ul>
      <li>• <strong>HTTPS Method</strong> (simple) — Use Personal Access Token as password when pushing code.</li>
      <li>• <strong>SSH Method</strong> (no password every time) — Add your SSH key in GitHub settings.</li>
  </ul>
  `,
  commands: [
    { command: 'git remote -v', description: 'View configured remotes' },
    { command: 'git push origin main', description: 'Push to GitHub repository' },
    { command: 'git config --global user.name "Your Name"', description: 'Set your Git username' },
    { command: 'git config --global user.email "youremail@example.com"', description: 'Set your Git email' }
  ]
},

'First repository': {
  content: `
  <p><strong>Step 1 — Open GitHub and Log In</strong></p>
  <ul>
      <li>• Go to <a href="https://github.com" target="_blank">https://github.com</a> and log in with your account.</li>
  </ul>
  <img src="https://community.cyberpanel.net/uploads/default/original/2X/1/127e91b046805771274ed8936250082fd5e282d9.jpeg" alt="GitHub Home Page" style="max-width: 100%; border: 1px solid #ddd; border-radius: 6px; margin: 10px 0;">

  <p><strong>Step 2 — Click the <code>+</code> Button</strong></p>
  <ul>
      <li>• On the top-right corner, click the <code>+</code> icon and select <strong>New repository</strong>.</li>
  </ul>
  <img src="https://kinsta.com/wp-content/uploads/2023/02/create-github-repository-1024x505.png" alt="New Repository Button" style="max-width: 100%; border: 1px solid #ddd; border-radius: 6px; margin: 10px 0;">

  <p><strong>Step 3 — Fill in Repository Details</strong></p>
  <ul>
      <li>• <strong>Repository name:</strong> Choose a unique name (e.g., <code>my-first-project</code>).</li>
      <li>• <strong>Description:</strong> (Optional) Write a short description of your project.</li>
      <li>• <strong>Visibility:</strong> Choose <em>Public</em> (anyone can see it) or <em>Private</em> (only you & collaborators can see it).</li>
      <li>• (Optional) Tick <strong>Initialize this repository with a README</strong> so GitHub creates a default README file.</li>
  </ul>
  <img src="https://www.w3schools.com/git/img_github_new_repo_create.png" alt="Create Repository Form" style="max-width: 100%; border: 1px solid #ddd; border-radius: 6px; margin: 10px 0;">

  <p><strong>Step 4 — Create the Repository</strong></p>
  <ul>
      <li>• Scroll down and click the green <strong>Create repository</strong> button.</li>
  </ul>

  <p><strong>Step 5 — Next Steps</strong></p>
  <ul>
      <li>• GitHub will show you instructions to upload code from your computer.</li>
      <li>• Copy the repository link for use in your terminal (HTTPS or SSH).</li>
  </ul>
  <img src="https://leading-bell-3e1c02e64d.media.strapiapp.com/Z_4jtk_b774c7fd29.png" alt="New Repository Page" style="max-width: 100%; border: 1px solid #ddd; border-radius: 6px; margin: 10px 0;">
  `,
  commands: [
    { command: 'git init', description: 'Initialize a local Git repository' },
    { command: 'git add .', description: 'Stage all changes' },
    { command: 'git commit -m "First commit"', description: 'Commit changes with a message' },
    { command: 'git branch -M main', description: 'Rename default branch to main' },
    { command: 'git remote add origin <repo-link>', description: 'Connect local repo to GitHub' },
    { command: 'git push -u origin main', description: 'Push local code to GitHub' }
  ]
}

  },
  'git-basics': {
    'Git init and clone': {
    content: `
    <p><strong>Step 1 — Initialize a New Repository (Local to GitHub)</strong></p>
    <ul>
        <li>• Navigate to your project folder in your terminal.</li>
        <li>• Run <code>git init</code> to create a new local Git repository.</li>
        <li>• Add files with <code>git add .</code>.</li>
        <li>• Commit your changes with <code>git commit -m "First commit"</code>.</li>
        <li>• Create a new repository on GitHub (without initializing with README if already have files locally).</li>
        <li>• Link your local repository to GitHub with:
            <pre><code>git remote add origin &lt;repo-link&gt;</code></pre>
        </li>
        <li>• Push your local code to GitHub:
            <pre><code>git push -u origin main</code></pre>
        </li>
    </ul>

    <p><strong>Step 2 — Clone an Existing Repository (GitHub to Local)</strong></p>
    <ul>
        <li>• Go to the repository page on GitHub.</li>
        <li>• Click the green <strong>Code</strong> button and copy the HTTPS or SSH link.</li>
        <li>• In your terminal, navigate to the folder where you want to save the project.</li>
        <li>• Run:
            <pre><code>git clone &lt;repo-link&gt;</code></pre>
        </li>
        <li>• This will create a new folder with all the repository files.</li>
        <li>• Navigate into it:
            <pre><code>cd &lt;repository-folder&gt;</code></pre>
        </li>
    </ul>

    <p><strong>Notes:</strong></p>
    <ul>
        <li>• Use <code>git status</code> to check your current changes.</li>
        <li>• Always commit changes before pushing to avoid errors.</li>
        <li>• Ensure you have permission to push if it’s a private or shared repository.</li>
    </ul>
  `,
  commands: [
    { command: 'git init', description: 'Initialize a new local repository' },
    { command: 'git add .', description: 'Stage all changes' },
    { command: 'git commit -m "message"', description: 'Commit staged changes' },
    { command: 'git remote add origin <repo-link>', description: 'Link local repository to remote' },
    { command: 'git push -u origin main', description: 'Push code to GitHub main branch' },
    { command: 'git clone <repo-link>', description: 'Clone a repository from GitHub' },
    { command: 'git status', description: 'Check status of your repository' }
  ]
     },
    }
  }

export default function Documentation() {
  const [selectedSection, setSelectedSection] = useState<string>('getting-started');
  const [selectedChapter, setSelectedChapter] = useState<string>('What is Git?');

  const currentSection = documentationSections.find(s => s.id === selectedSection);
  const currentContent = chapterContent[selectedSection]?.[selectedChapter];

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Title */}
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
                    <code className="bg-muted px-2 py-1 rounded">git config --global user.name Your Name</code>
                    <code className="bg-muted px-2 py-1 rounded">git config --global user.email you@example.com</code>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Daily Workflow</h4>
                  <div className="space-y-2 text-sm">
                    <code className="bg-muted px-2 py-1 rounded">git add .</code>
                    <code className="bg-muted px-2 py-1 rounded">git commit -m message</code>
                    <code className="bg-muted px-2 py-1 rounded">git push origin main</code>
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